import React from 'react'
import { AiTwotoneFolderOpen } from 'react-icons/ai'
import { MdOutlineCreateNewFolder } from 'react-icons/md'
import { AiOutlineExpandAlt } from 'react-icons/ai'
import { IoSettingsOutline } from 'react-icons/io5'
import logo from '../../assets/img/32.png'

function SideBar() {
  const handleExpandWindow = () => {
    window.open('/popup.html', '_blank')
  }

  const handleOptionPage = () => {
    window.open('/option.html', '_blank')
  }

  return (
    <nav className="items-center py-1 pt-3 min-w-[2rem] fixed top-0 right-0 h-screen w-9 sm:w-10 sm:min-w-[2.5rem] lg:w-14 m-0 flex flex-col gap-1 text-primary shadow-lg overflow-visible border-l border-r rtl:border-l rtl:border-r-0">
      <img src={logo} alt="logo" className="w-5 h-5 mb-1" />
      <SideBarIcon icon={<MdOutlineCreateNewFolder size="18" />} text="Add note" />
      <SideBarIcon icon={<AiTwotoneFolderOpen size="18" />} text="Open your note archive" />
      <SideBarIcon
        onClickEvent={handleExpandWindow}
        icon={<AiOutlineExpandAlt size="18" />}
        text="Expand the window"
      />
      <SideBarIcon
        onClickEvent={handleOptionPage}
        icon={<IoSettingsOutline size="18" />}
        text="Setting"
      />
    </nav>
  )
}

const SideBarIcon = ({ icon, text, onClickEvent }) => (
  <div className="relative group mt-1 h-6 w-6 cursor-pointer">
    <button
      onClick={(e) => {
        e.preventDefault()
        if (onClickEvent) onClickEvent()
      }}
      className="flex mx-auto shadow-btnShadow hover:bg-light-secondary-20 rounded-md p-1 transition-all duration-300 ease-linear"
    >
      {icon}
    </button>
    <div className="w-auto px-2 py-1 min-w-max rounded-md shadow-md text-xs transition-all duration-300 scale-0 origin-left absolute left-14 bg-primary text-white z-10 group-hover:scale-100">
      {text}
    </div>
  </div>
)

export default SideBar
