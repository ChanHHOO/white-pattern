import "./style.css"

import { useStorage } from "@plasmohq/storage/hook"

function IndexPopup() {
  const [openPanel, setOpenPanel] = useStorage("openPanel", false)

  return (
    <div className="flex p-4 w-48 items-center justify-center bg-[#353535]">
      <div className="px-2 rounded-lg">
        <label className="relative flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={openPanel}
            onChange={() => setOpenPanel(!openPanel)}
            className="sr-only peer"
          />
          <div className="w-9 h-5 bg-gray-200 hover:bg-gray-300 peer-focus:outline-none rounded-full peer transition-all ease-in-out duration-500 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-indigo-600 hover:peer-checked:bg-indigo-700 "></div>
          <span
            className={`ml-3 text-sm font-medium ${openPanel ? "text-white" : "text-gray-400"}`}>
            Open Panel
          </span>
        </label>
      </div>
    </div>
  )
}

export default IndexPopup
