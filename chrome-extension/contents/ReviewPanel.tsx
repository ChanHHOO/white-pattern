import { useDrag } from "@use-gesture/react"
import cssText from "data-text:~style.css"
import { marked } from "marked"
import type { PlasmoCSConfig } from "plasmo"
import { animated, useSpring } from "react-spring"

import { useStorage } from "@plasmohq/storage/hook"

export const config: PlasmoCSConfig = {
  matches: ["https://www.coupang.com/vp/products/*"]
}

export const getStyle = () => {
  const style = document.createElement("style")
  style.textContent = cssText
  return style
}

const text = `
## 김치에 대한 리뷰 분석 결과입니다.\n\n**좋은 리뷰**\n\n- 아삭하고 시원한 맛이 일품이며, 익으면 익은 대로 맛있게 즐길 수 있다는 평이 많습니다.\n- 500g 용량이 1인 가구 또는 김치를 많이 먹지 않는 가정에서 부담 없이 즐기기에 적합하며, 용기 또한 재활용이 가능해 편리하다는 의견이 많습니다.\n- 비비고라는 브랜드에 대한 신뢰도가 높으며, 국산 재료 사용과 깔끔한 포장으로 안심하고 먹을 수 있다는 점이 장점으로 꼽힙니다. \n\n**나쁜 리뷰**\n\n- 가격이 다소 비싸다는 의견이 있으며, 용량 대비 가격이 부담스럽다는 평이 있습니다.\n- 김치가 완전히 익은 상태가 아닌 경우가 있어, 익은 김치를 선호하는 사람들에게는 아쉬울 수 있다는 의견이 있습니다.\n-  개인의 입맛에 따라 맛이 싱겁거나, 깊은 맛이 부족하다고 느끼는 경우도 있습니다. \n
`

function ReviewPanel() {
  const [review, setReview] = useStorage("review", false)
  const [loading, setLoading] = useStorage("review-loading", true)

  const [content, setContent] = useStorage("review-content", "")

  const [{ x, y }, api] = useSpring(() => ({ x: 325, y: 0 }))

  const bind = useDrag(
    ({ down, offset: [ox, oy] }) =>
      api.start({ x: ox, y: oy, immediate: down }),
    {
      bounds: { left: 0, right: 800, top: 0, bottom: 700 }
    }
  )

  if (!review) {
    return <></>
  }

  return (
    <animated.div
      {...bind()}
      style={{
        x,
        y
      }}
      className="w-80 m-[1px] flex flex-col gap-y-1.5">
      <div
        style={{
          backgroundColor: "rgb(53, 53, 53)",
          color: "rgb(217, 217, 217)"
        }}
        className="flex items-center justify-between p-4 rounded-lg">
        <div className="flex items-center justify-center gap-x-4">
          <svg
            width="7"
            height="13"
            viewBox="0 0 7 13"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="cursor-grab">
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M1.06067 1.9697C1.64646 1.9697 2.12134 1.52877 2.12134 0.984848C2.12134 0.440932 1.64646 0 1.06067 0C0.474878 0 0 0.440932 0 0.984848C0 1.52877 0.474878 1.9697 1.06067 1.9697ZM5.93933 1.9697C6.52512 1.9697 7 1.52877 7 0.984848C7 0.440932 6.52512 0 5.93933 0C5.35354 0 4.87866 0.440932 4.87866 0.984848C4.87866 1.52877 5.35354 1.9697 5.93933 1.9697ZM5.93933 7.48483C6.52512 7.48483 7 7.0439 7 6.49999C7 5.95607 6.52512 5.51514 5.93933 5.51514C5.35354 5.51514 4.87866 5.95607 4.87866 6.49999C4.87866 7.0439 5.35354 7.48483 5.93933 7.48483ZM7 12.0151C7 12.559 6.52512 13 5.93933 13C5.35354 13 4.87866 12.559 4.87866 12.0151C4.87866 11.4712 5.35354 11.0303 5.93933 11.0303C6.52512 11.0303 7 11.4712 7 12.0151ZM2.12134 6.5001C2.12134 7.04401 1.64646 7.48494 1.06067 7.48494C0.474878 7.48494 0 7.04401 0 6.5001C0 5.95618 0.474878 5.51525 1.06067 5.51525C1.64646 5.51525 2.12134 5.95618 2.12134 6.5001ZM1.06067 13C1.64646 13 2.12134 12.559 2.12134 12.0151C2.12134 11.4712 1.64646 11.0303 1.06067 11.0303C0.474878 11.0303 0 11.4712 0 12.0151C0 12.559 0.474878 13 1.06067 13Z"
              fill="currentColor"></path>
          </svg>

          <span className={`font-medium text-sm text-white`}>
            Review Recommendation
          </span>
        </div>

        <div
          onClick={() => {
            setReview(false)
          }}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-6 hover:text-white cursor-pointer hover:stroke-2">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M6 18 18 6M6 6l12 12"
            />
          </svg>
        </div>
      </div>

      {/* <span className="relative flex h-3 w-3">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-3 w-3 bg-sky-500"></span>
      </span> */}

      <div
        style={{
          backgroundColor: "rgb(53, 53, 53)",
          color: "rgb(217, 217, 217)"
        }}
        className="rounded-lg p-4 flex flex-col">
        {loading ? (
          <div className="flex flex-col gap-y-2 items-center justify-center p-4">
            <svg
              className="animate-spin h-5 w-5 text-indigo-600"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24">
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="4"></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>

            <span className="text-xs">리뷰를 수집중입니다.</span>
          </div>
        ) : (
          <div
            className="flex flex-col prose-sm text-white"
            dangerouslySetInnerHTML={{
              __html: marked.parse(content)
            }}
          />
        )}

        <div className="flex items-center justify-center">
          <hr
            style={{
              background: "rgba(255, 255, 255, 0.1)",
              height: 1,
              border: "none"
            }}
            className="my-2 w-full"
          />
        </div>
        <div className="px-2 pt-2 text-xs">
          Your 💵 is protected by WhitePattern
        </div>
      </div>
    </animated.div>
  )
}

export default ReviewPanel
