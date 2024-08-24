import { useDrag } from "@use-gesture/react"
import cssText from "data-text:~style.css"
import type { PlasmoCSConfig } from "plasmo"
import { animated, useSpring } from "react-spring"

import { useStorage } from "@plasmohq/storage/hook"

export const config: PlasmoCSConfig = {
  matches: ["https://*.coupang.com/*"]
}

export const getStyle = () => {
  const style = document.createElement("style")
  style.textContent = cssText
  return style
}

function Panel() {
  const [openPanel, setOpenPanel] = useStorage("openPanel", false)

  const [focus, setFocus] = useStorage("focus", false)
  const [review, setReview] = useStorage("review", false)
  const [anti, setAnti] = useStorage("anti", false)

  const [{ x, y }, api] = useSpring(() => ({ x: 0, y: 0 }))

  const bind = useDrag(
    ({ down, offset: [ox, oy] }) =>
      api.start({ x: ox, y: oy, immediate: down }),
    {
      bounds: { left: 0, right: 800, top: 0, bottom: 700 }
    }
  )

  if (!openPanel) {
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

          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-5 hover:text-white cursor-pointer hover:stroke-2">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
            />
          </svg>

          <span
            className={`font-medium text-sm hover:text-white ${focus && review && anti && "text-white"}`}>
            White Pattern
          </span>
        </div>

        <div
          onClick={() => {
            setOpenPanel(false)
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
        <div className="px-2 rounded-lg hover:bg-[#121212]">
          <label className="relative flex items-center my-2 cursor-pointer">
            <input
              type="checkbox"
              checked={focus}
              onChange={() => setFocus(!focus)}
              className="sr-only peer"
            />
            <div className="w-9 h-5 bg-gray-200 hover:bg-gray-300 peer-focus:outline-none rounded-full peer transition-all ease-in-out duration-500 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-indigo-600 hover:peer-checked:bg-indigo-700 "></div>
            <span
              className={`ml-3 text-sm font-medium  ${focus ? "text-white" : "text-gray-400"}`}>
              Focus Mode
            </span>
          </label>
        </div>
        <div className="px-2 rounded-lg hover:bg-[#121212]">
          <label className="relative flex items-center my-2 cursor-pointer">
            <input
              type="checkbox"
              checked={review}
              onChange={() => setReview(!review)}
              className="sr-only peer"
            />
            <div className="w-9 h-5 bg-gray-200 hover:bg-gray-300 peer-focus:outline-none rounded-full peer transition-all ease-in-out duration-500 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-indigo-600 hover:peer-checked:bg-indigo-700 "></div>
            <span
              className={`ml-3 text-sm font-medium  ${review ? "text-white" : "text-gray-400"}`}>
              Review Recommendation
            </span>
          </label>
        </div>
        <div className="px-2 rounded-lg hover:bg-[#121212]">
          <label className="relative flex items-center my-2 cursor-pointer">
            <input
              type="checkbox"
              checked={anti}
              onChange={() => setAnti(!anti)}
              className="sr-only peer"
            />
            <div className="w-9 h-5 bg-gray-200 hover:bg-gray-300 peer-focus:outline-none rounded-full peer transition-all ease-in-out duration-500 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-indigo-600 hover:peer-checked:bg-indigo-700 "></div>
            <span
              className={`ml-3 text-sm font-medium ${anti ? "text-white" : "text-gray-400"}`}>
              Anti Dark Pattern
            </span>
          </label>
        </div>
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

export default Panel
