# 🚀 Project Name

**Elevator Pitch:** Focus on information only you want. And save your spending.

---

## 🌟 Inspiration

Users often visit e-commerce sites intending to purchase a specific product but frequently end up buying additional items they hadn’t planned for.
We designed this service to provide users with only the necessary information, helping them focus solely on their intended purchases.

---

## 🛠️ Features

- **Track the unsubscribtion button and improving UI/UX for users** : Track the unsubscribtion button on related path, and handle css for saving your money 💵

- **Focus Mode (Remove Ads)** : Remove all of the Ads.

- **Focus Mode (Remove upselling products)** : Remove all of the upselling products.

- **Summarize reviews** : Get reviews and serve summary to user.

---

## 🎯 How It Works
- Static content blocking based on element selectors
- Dynamic element update with GPT-4o
- Steps for Analysis:
  1.  Extract content element.
  2.  Preprocess the extracted content. Removes unnecessary data attributes.
  3.  Instruct LLM to detect Dark Patterns and generate selectors and styles to fix Dark Patterns.
---

## 🛠️ Tech Stack

**Fast API**  
**ChatGPT 4.o**  
**Plasmo**  
**React**
**Cheer io**
**Playwright**

---

## 🚀 Getting Started

### Prerequisites

```bash
cd chrome-extension
npm install
```

```bash
cd server
pip install -r requirements.txt
```

## Test Instruction

**Step 1** - Run chrome extension
```bash
cd chrome-extension
npm dev
```

**Step 2** - Run python server
```bash
cd server
python main.py
```

**Step 3** - Install chrome extension
1. Open Chrome
2. Go to `chrome://extensions/`
3. Enable `Developer mode`
4. Click `Load unpacked`
5. Select `chrome-extension/build/chrome-mv3-dev` folder

**Step 4** - Open `https://www.coupang.com/` and click the extension icon
