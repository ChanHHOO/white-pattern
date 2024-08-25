import uuid
from typing import Optional

from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from openai import OpenAI
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware

origins = ["*"]

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

client = OpenAI()


class ElementUpdate(BaseModel):
    selector: str
    style: Optional[str]
    innerHTML: Optional[str]


class UpdateElements(BaseModel):
    elementsToUpdate: list[ElementUpdate]


class HTMLInput(BaseModel):
    html: str


def unique_var() -> str:
    random_uuid = uuid.uuid4()
    return str(random_uuid).replace('-', '_')


def gen_js_code(elements: UpdateElements) -> str:
    res = ""

    for query_selector in elements.deleteQuerySelectors:
        var_name = unique_var()
        res += f"const elem_{var_name} = document.querySelector(`{query_selector}`);"
        res += f"elem_{var_name}.remove();"

    res += elements.updateJSCode

    return res


SYSTEM_PROMPT = '''
You are instructed to update html element style.
Your goal is to :
- Fix dark pattern design elements in user interfaces intended to manipulate users into taking actions they may not want to take, often leading to unintended consequences or discomfort.
- Update the membership cancel button to make clear to the user.
- Update the text inside the button to make it more clear to the user.

Dark Pattern is :
1. Forced Continuity
- After a free trial period ends, a paid subscription automatically begins. Users must cancel before the trial ends, or they will be charged automatically if they forget.
2. Confusing Cancellation Process
- The process to cancel a subscription is made deliberately complex or confusing. For example, the cancellation button may be hard to find, or there may be multiple steps to confirm the cancellation, making it more difficult for users to cancel.
3. Deceptive Design
- The button to keep a subscription is made large and prominent, while the cancel button is small and hard to see, tricking users into unintentionally continuing their subscription.

To fix Dark Pattern, you have to:
1. Make cancel or confusing button to be clear to user with changing background of button and font size of button.
2. Make button for keeping a subscription should be less appealing to user.
3. Re-write button text which can be confusing to user. You MUST use Korean when rewriting text. When rewriting text, you MUST consider context of page.

Example : Let's think step by step.
Identify Dark Pattern in provided HTML. It seems Forced Continuity, Confusing Cancellation Process is included.
I have to update text in button to fix Dark Pattern. Also, I have to update color of buttons.

Write the query selectors for unnecessary elements and JS code and  that will update the HTML snippet above to the following.

Let's think step by step.
'''

USER_PROMPT = '''
HTML : {html}
'''


@app.post("/fix-dark-pattern")
async def fix_dark_pattern(input_data: HTMLInput):
    try:
        completion = client.beta.chat.completions.parse(
            model="gpt-4o-2024-08-06",
            messages=[
                {"role": "system", "content": SYSTEM_PROMPT},
                {"role": "user", "content": USER_PROMPT.format(html=input_data.html)},
            ],
            response_format=UpdateElements,
        )

        event = completion.choices[0].message.parsed
        return JSONResponse(content=event.json())
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=8000)
