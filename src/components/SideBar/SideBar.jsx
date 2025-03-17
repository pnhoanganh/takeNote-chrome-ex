import React, { useState } from 'react'
import { AiTwotoneFolderOpen } from 'react-icons/ai'
import { MdOutlineCreateNewFolder } from 'react-icons/md'
import { AiOutlineExpandAlt } from 'react-icons/ai'
import { IoSettingsOutline } from 'react-icons/io5'
import { MdOutlineImportExport } from 'react-icons/md'
import logo from '../../assets/img/32.png'
import NoteArchiveModal from './NoteArchiveModal'
import ImportExportModal from './ImportExport/ImportExportModal'

function SideBar({ notes, handleAddNote, handleDeleteNote, activeNote, setActiveNote }) {
  const [isArchiveOpen, setIsArchiveOpen] = useState(false)
  const [isImportExportOpen, setIsImportExportOpen] = useState(false)

  const handleExpandWindow = () => {
    window.open('/popup.html', '_blank')
  }

  const handleOptionPage = () => {
    window.open('/option.html', '_blank')
  }

  const handleOpenImportExport = () => {
    setIsImportExportOpen(true)
  }

  const handleCloseImportExport = () => {
    setIsImportExportOpen(false)
  }

  const handleOpenNoteArchive = () => {
    setIsArchiveOpen(true)
  }

  const handleCloseNoteArchive = () => {
    setIsArchiveOpen(false)
  }

  const handleSetActiveNote = (noteId) => {
    setActiveNote(noteId)
    handleCloseNoteArchive()
  }

  return (
    <>
      <nav className="items-center py-1 pt-3 min-w-[2rem] fixed top-0 right-0 h-screen w-9 sm:w-10 sm:min-w-[2.5rem] lg:w-14 m-0 flex flex-col gap-1 text-primary shadow-lg overflow-visible border-l border-r rtl:border-l rtl:border-r-0">
        <img src={logo} alt="logo" className="w-5 h-5 mb-1" />
        {/* ADD NOTE */}
        <SideBarIcon
          onClickEvent={handleAddNote}
          icon={<MdOutlineCreateNewFolder size="18" />}
          text="Add note"
          className="left-[-95px]"
        />
        {/* OPEN ARCHIVE NOTE */}
        <SideBarIcon
          onClickEvent={handleOpenNoteArchive}
          icon={<AiTwotoneFolderOpen size="18" />}
          text="Open your note archive"
          className="left-[-175px]"
        />
        {/* OPEN IMPORT EXPORT MODAL */}
        <SideBarIcon
          onClickEvent={handleOpenImportExport}
          icon={<MdOutlineImportExport size="18" />}
          text="Import and Export data"
          className="left-[-175px]"
        />
        {/* EXPAND WINDOW */}
        <SideBarIcon
          onClickEvent={handleExpandWindow}
          icon={<AiOutlineExpandAlt size="18" />}
          text="Expand the window"
          className="left-[-155px]"
        />
        {/* OPEN OPTION WINDOW */}
        <SideBarIcon
          onClickEvent={handleOptionPage}
          icon={<IoSettingsOutline size="18" />}
          text="Setting"
          className="left-[-85px]"
        />
      </nav>

      {/* Modal for Archive Note */}
      {isArchiveOpen && (
        <NoteArchiveModal
          handleDeleteNote={handleDeleteNote}
          isArchiveOpen={isArchiveOpen}
          handleSetActiveNote={handleSetActiveNote}
          handleCloseNoteArchive={handleCloseNoteArchive}
          notes={notes}
          activeNote={activeNote}
        />
      )}

      {/* Modal for Export and Import */}
      {isImportExportOpen && (
        <ImportExportModal
          isImportExportOpen={isImportExportOpen}
          handleCloseImportExport={handleCloseImportExport}
        />
      )}
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
