import React, { useState } from 'react'
import { AiTwotoneFolderOpen } from 'react-icons/ai'
import { MdOutlineCreateNewFolder } from 'react-icons/md'
import { AiOutlineExpandAlt } from 'react-icons/ai'
import { IoSettingsOutline } from 'react-icons/io5'
import { GoArchive } from 'react-icons/go'
import { RiDeleteBin5Line } from 'react-icons/ri'
import Modal from '../Modal/Modal'
import logo from '../../assets/img/32.png'

function SideBar({ notes, handleAddNote, handleDeleteNote }) {
  const [isArchiveOpen, setIsArchiveOpen] = useState(false)

  const handleExpandWindow = () => {
    window.open('/popup.html', '_blank')
  }

  const handleOptionPage = () => {
    window.open('/option.html', '_blank')
  }

  const handleOpenNoteArchive = () => {
    setIsArchiveOpen(true)
  }

  const handleCloseNoteArchive = () => {
    setIsArchiveOpen(false)
  }

  return (
    <>
      <nav className="items-center py-1 pt-3 min-w-[2rem] fixed top-0 right-0 h-screen w-9 sm:w-10 sm:min-w-[2.5rem] lg:w-14 m-0 flex flex-col gap-1 text-primary shadow-lg overflow-visible border-l border-r rtl:border-l rtl:border-r-0">
        <img src={logo} alt="logo" className="w-5 h-5 mb-1" />
        <SideBarIcon
          icon={<MdOutlineCreateNewFolder size="18" />}
          text="Add note"
          onClickEvent={handleAddNote}
        />
        <SideBarIcon
          icon={<AiTwotoneFolderOpen size="18" />}
          text="Open your note archive"
          onClickEvent={handleOpenNoteArchive}
        />
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

      {/* Modal for Note Archive */}
      <Modal open={isArchiveOpen} onClose={handleCloseNoteArchive}>
        <div className="mt-2  max-[450px]:min-w-[250px] max-[450px]:min-h-[300px] max-[560px]:min-w-[400px] max-[560px]:min-h-[350px]  min-[565px]:min-w-[500px] min-[565px]:min-h-[500px]">
          <h3 className=" text-xl text-center text-secondary font-semibold mb-4 flex justify-center items-center gap-2">
            <GoArchive size="30px" />
            Your Notes Archive
          </h3>
          <div className="mt-6">
            {notes && notes.length > 0 ? (
              notes.map((note) => (
                <div
                  key={note.id}
                  className="app-note-archive mt-3 flex justify-between items-center"
                >
                  <div className="note-list flex justify-start flex-col">
                    <div className="note-title">
                      <strong>{note.title}</strong>
                    </div>
                    <p>{note.body ? note.body.substr(0, 100) + '...' : ''}</p>
                    <small className="note-meta">
                      Last modified{' '}
                      {new Date(note.lastModified).toLocaleDateString('en-GB', {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </small>
                  </div>
                  <button
                    onClick={() => handleDeleteNote(note.id)}
                    className="hover:bg-light-secondary-20 rounded-md p-1 transition-all duration-300 ease-linear"
                  >
                    <RiDeleteBin5Line size="16px" />
                  </button>
                </div>
              ))
            ) : (
              <p className="no-note text-center">No notes available</p>
            )}
          </div>
        </div>
      </Modal>
    </>
  )
}

const SideBarIcon = ({ icon, text, onClickEvent = () => {} }) => (
  <div className="relative group mt-1 h-6 w-6 cursor-pointer">
    <button
      onClick={(e) => {
        e.preventDefault()
        onClickEvent()
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
