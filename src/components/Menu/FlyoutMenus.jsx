import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react'
import { FaCaretDown } from 'react-icons/fa'

export default function FlyoutMenus({ menuData, editor }) {
  if (!menuData || !menuData.list || !editor) return null

  return (
    <Popover className="relative m-0">
      <PopoverButton className="flex gap-x-[3px] !mr-[7px]">
        <menuData.titleMenu className=" w-4" />
        <FaCaretDown className="w-4" />
      </PopoverButton>

      <PopoverPanel className="absolute left-1/2 z-10 mt-3 flex w-screen max-w-max -translate-x-[10%] transition-opacity">
        <div className=" max-w-md flex-auto overflow-hidden rounded-xl bg-white text-sm shadow-lg ring-1 ring-gray-900/5">
          <div className="p-3 gap-2 flex flex-col">
            {menuData.list.map((item, index) => (
              <div
                key={index}
                onClick={() => {
                  if (item.action.startsWith('toggle')) {
                    editor.chain().focus()[item.action]().run()
                  } else {
                    editor.chain().focus().setTextAlign(item.action).run()
                  }
                }}
                className={`p-1 w-md group flex items-center gap-2 rounded-lg hover:bg-gray-100 cursor-pointer ${
                  item.action.startsWith('toggle')
                    ? editor.isActive(item.action.replace('toggle', '').toLowerCase().trim())
                      ? 'bg-gray-200'
                      : ''
                    : editor.isActive({ textAlign: item.action })
                      ? 'bg-gray-200'
                      : ''
                }`}
              >
                <div className="size-5 flex items-center justify-center rounded-md bg-gray-50 group-hover:bg-white">
                  <item.icon className="w-5 text-gray-600 group-hover:text-secondary" />
                </div>
                <span className="text-gray-900">{item.name}</span>
              </div>
            ))}
          </div>
        </div>
      </PopoverPanel>
    </Popover>
  )
}
