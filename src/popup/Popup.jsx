import { useState, useEffect } from 'react'
import SideBar from '../components/SideBar/SideBar'
import NoteContainer from '../components/Note/NoteContainer'

export const Popup = () => {
  const [notes, setNotes] = useState([])
  const handleAddNote = () => {
    const newNote = { id: Date.now(), title: 'Sample note', body: '', lastModified: '' }
    chrome.runtime.sendMessage({ type: 'ADD_NOTE', payload: newNote }, (response) => {
      if (response?.status === 'success') {
        console.log(response.message) // Handle success message
        setNotes(response.notes)
      } else {
        console.error('Failed to add note')
      }
    })
  }

  const handleDeleteNote = (idToDelete) => {
    setNotes(notes.filter((note) => note.id !== idToDelete))
  }

  return (
    <main className="flex flex-row max-h-screen min-h-[500px] min-w-[550px]">
      <div className="flex-grow basis-0 w-[97%] overflow-hidden">
        <NoteContainer />
      </div>

      <div className="flex-shrink-0 w-[4%] min-w-[34px] max-w-[60px]">
        <SideBar notes={notes} handleAddNote={handleAddNote} handleDeleteNote={handleDeleteNote} />
      </div>
    </main>
  )
}

export default Popup
