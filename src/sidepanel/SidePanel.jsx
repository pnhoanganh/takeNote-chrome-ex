import { useState, useEffect } from 'react'
import SideBar from '../components/SideBar/SideBar'
import NoteContainer from '../components/Note/NoteContainer'

export const SidePanel = () => {
  const [notes, setNotes] = useState([])
  const [activeNote, setActiveNote] = useState(false)

  // Fetch notes when the component mounts
  useEffect(() => {
    chrome.storage.local.get('notes', (data) => {
      if (data.notes) {
        setNotes(data.notes)
      }
    })
  }, [])

  const handleAddNote = () => {
    const newNote = {
      id: Date.now(),
      title: 'Sample note',
      body: '',
      lastModified: new Date().toISOString(),
    }

    chrome.runtime.sendMessage({ type: 'ADD_NOTE', payload: newNote }, (response) => {
      if (response?.status === 'success') {
        setNotes(response.notes)
      } else {
        console.error('Failed to add note')
      }
    })
  }

  const handleDeleteNote = (idToDelete) => {
    chrome.runtime.sendMessage({ type: 'DELETE_NOTE', payload: idToDelete }, (response) => {
      if (response?.status === 'success') {
        setNotes(response.notes)
      } else {
        console.error('Failed to delete note')
      }
    })
  }

  const handleSetActiveNote = (noteId) => {
    chrome.runtime.sendMessage({ type: 'SET_ACTIVE_NOTE', payload: noteId }, (response) => {
      if (response?.status === 'success') {
        setActiveNote(response.activeNote) // Cập nhật trạng thái local
      }
    })
  }

  // Fetch `activeNote` khi SidePanel được render
  useEffect(() => {
    chrome.runtime.sendMessage({ type: 'GET_ACTIVE_NOTE' }, (response) => {
      if (response?.status === 'success') {
        setActiveNote(response.activeNote)
      }
    })
  }, [])

  return (
    <main className="flex flex-row max-h-screen min-w-[360px]">
      <div className="flex-grow basis-0 w-[97%] overflow-hidden">
        <NoteContainer />
      </div>

      <div className="flex-shrink-0 w-[4%] min-w-[34px] max-w-[60px]">
        <SideBar
          notes={notes}
          handleAddNote={handleAddNote}
          handleDeleteNote={handleDeleteNote}
          activeNote={activeNote}
          setActiveNote={handleSetActiveNote}
        />
      </div>
    </main>
  )
}

export default SidePanel
