import React from 'react'
import Modal from '../Modal/Modal'
import parser from 'html-react-parser'
import { GoArchive } from 'react-icons/go'
import { RiDeleteBin5Line } from 'react-icons/ri'

export default function NoteArchiveModal({
  isArchiveOpen,
  handleCloseNoteArchive,
  handleDeleteNote,
  handleSetActiveNote,
  notes,
  activeNote,
}) {
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
                  className={`mt-3 p-2 rounded flex justify-between items-center cursor-pointer  ${
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
                    <div>
                      {parser(
                        note.body && note.body.length > 40
                          ? note.body.substr(0, 40) + '...'
                          : note.body || '',
                      )}
                    </div>
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
