import React, { useState } from 'react'
import { AiTwotoneFolderOpen } from 'react-icons/ai'
import { MdOutlineCreateNewFolder } from 'react-icons/md'
import { AiOutlineExpandAlt } from 'react-icons/ai'
import { IoSettingsOutline } from 'react-icons/io5'
import { GoArchive } from 'react-icons/go'
import { RiDeleteBin5Line } from 'react-icons/ri'
import Modal from '../Modal/Modal'
import logo from '../../assets/img/32.png'

function SideBar({ notes, handleAddNote, handleDeleteNote, activeNote, setActiveNote }) {
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

  const handleSetActiveNote = (noteId) => {
    setActiveNote(noteId) // Set active note
    handleCloseNoteArchive() // Close the modal automatically after selecting the note
  }

  const getTimeAgo = (dateString) => {
    const now = new Date()
    const past = new Date(dateString)
    const diffInSeconds = Math.floor((now - past) / 1000)

    if (diffInSeconds < 60) return `${diffInSeconds} seconds ago`
    const diffInMinutes = Math.floor(diffInSeconds / 60)
    if (diffInMinutes < 60) return `${diffInMinutes} minutes ago`
    const diffInHours = Math.floor(diffInMinutes / 60)
    if (diffInHours < 24) return `${diffInHours} hours ago`
    const diffInDays = Math.floor(diffInHours / 24)
    return `${diffInDays} days ago`
  }

  return (
    <>
      <nav className="items-center py-1 pt-3 min-w-[2rem] fixed top-0 right-0 h-screen w-9 sm:w-10 sm:min-w-[2.5rem] lg:w-14 m-0 flex flex-col gap-1 text-primary shadow-lg overflow-visible border-l border-r rtl:border-l rtl:border-r-0">
        <img src={logo} alt="logo" className="w-5 h-5 mb-1" />
        <SideBarIcon
          icon={<MdOutlineCreateNewFolder size="18" />}
          text="Add note"
          onClickEvent={handleAddNote}
          className="left-[-100px]"
        />
        <SideBarIcon
          icon={<AiTwotoneFolderOpen size="18" />}
          text="Open your note archive"
          onClickEvent={handleOpenNoteArchive}
          className="left-[-180px]"
        />
        <SideBarIcon
          onClickEvent={handleExpandWindow}
          icon={<AiOutlineExpandAlt size="18" />}
          text="Expand the window"
          className="left-[-160px]"
        />
        <SideBarIcon
          onClickEvent={handleOptionPage}
          icon={<IoSettingsOutline size="18" />}
          text="Setting"
          className="left-[-90px]"
        />
      </nav>

      {/* Modal for Note Archive */}
      <Modal open={isArchiveOpen} onClose={handleCloseNoteArchive}>
        <div className="mt-2 max-[450px]:min-w-[250px] max-[450px]:min-h-[300px] max-[560px]:min-w-[400px] max-[560px]:min-h-[350px] min-[565px]:min-w-[500px] min-[565px]:min-h-[500px] overflow-hidden">
          <h3 className="text-xl text-center text-secondary font-semibold mb-4 flex justify-center items-center gap-2">
            <GoArchive size="30px" />
            Your Notes Archive
          </h3>
          <hr />
          <div className="mt-6 max-[450px]:max-h-[300px] min-[460px]:max-h-[300px] min-[560px]:max-h-[420px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
            {notes && notes.length > 0 ? (
              notes.map((note) => (
                <div
                  key={note.id}
                  className={`mt-3 p-2 rounded flex justify-between items-center cursor-pointer ${
                    note.id === activeNote ? 'bg-light-secondary-20' : 'hover:bg-gray-100'
                  }`}
                  onClick={(e) => handleSetActiveNote(note.id)} // Set active note and close modal
                >
                  <div className="flex justify-start flex-col">
                    <div className="text-secondary text-[16px]">
                      <strong>
                        {note.title && note.title.length > 30
                          ? note.title.substr(0, 30) + '...'
                          : note.title || 'Untitled note'}
                      </strong>
                    </div>
                    <p>
                      {note.body && note.body.length > 40
                        ? note.body.substr(0, 40) + '...'
                        : note.body || ''}
                    </p>
                    <small className="text-light-primary-50">
                      Last modified{' '}
                      {isNaN(new Date(note.lastModified).getTime())
                        ? 'Date not available'
                        : `${new Date(note.lastModified).toLocaleString('en-GB', {
                            hour: '2-digit',
                            minute: '2-digit',
                          })}, ${new Date(note.lastModified).toLocaleString('en-GB', {
                            day: '2-digit',
                            month: '2-digit',
                            year: 'numeric',
                          })} (${getTimeAgo(note.lastModified)})`}
                    </small>
                  </div>
                  <button
                    onClick={(e) => handleDeleteNote(e, note.id)}
                    className="hover:text-secondary rounded-md p-1 transition-all duration-300 ease-linear"
                  >
                    <RiDeleteBin5Line size="16px" />
                  </button>
                </div>
              ))
            ) : (
              <p className="text-xs text-center">No notes available</p>
            )}
          </div>
        </div>
      </Modal>
    </>
  )
}

const SideBarIcon = ({ icon, text, onClickEvent = () => {}, className = '' }) => (
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
    {/* Tooltip */}
    <div
      className={`absolute top-1/2 -translate-y-1/2 ml-2 px-2 py-1 rounded-md shadow-md text-xs transition-all duration-200 bg-primary text-white opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 z-50 whitespace-nowrap ${className}`}
    >
      {text}
    </div>
  </div>
)

export default SideBar
