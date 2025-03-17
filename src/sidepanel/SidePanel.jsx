import { useState, useEffect } from 'react'
import SideBar from '../components/SideBar/SideBar'
import NoteContainer from '../components/Note/NoteContainer'

export const SidePanel = () => {
  const [notes, setNotes] = useState([])
  const [activeNote, setActiveNote] = useState(false)

  // Fetch notes and active note on component mount
  useEffect(() => {
    chrome.storage.local.get(['notes', 'activeNote'], (data) => {
      if (data.notes) {
        setNotes(data.notes)
      }
      if (data.activeNote) {
        setActiveNote(data.activeNote)
      }
    })
  }, [])

  useEffect(() => {
    const handleStorageChange = (changes, area) => {
      if (area === 'local' && changes.notes) {
        setNotes(changes.notes.newValue || [])
      }
    }

    chrome.storage.onChanged.addListener(handleStorageChange)
    return () => chrome.storage.onChanged.removeListener(handleStorageChange)
  }, [])

  // ADD NOTE
  const handleAddNote = () => {
    const newNote = {
      id: Date.now(),
      title: 'Untitled Note',
      body: '',
      lastModified: new Date().toISOString(),
    }

    chrome.runtime.sendMessage({ type: 'ADD_NOTE', payload: newNote }, (response) => {
      if (response?.status === 'success') {
        setNotes(response.notes)
        setActiveNote(newNote.id)
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
        setActiveNote(response.activeNote) // Update active note state
      }
    })
  }

  // Fetch activeNote when SidePanel is rendered
  useEffect(() => {
    chrome.runtime.sendMessage({ type: 'GET_ACTIVE_NOTE' }, (response) => {
      if (response?.status === 'success') {
        setActiveNote(response.activeNote)
      }
    })
  }, [])

  const getActiveNote = () => notes.find((note) => note.id === activeNote)

  const onUpdateNote = (updatedNote) => {
    chrome.runtime.sendMessage({ type: 'UPDATE_NOTE', payload: updatedNote }, (response) => {
      if (response?.status === 'success') {
        setNotes(response.notes)
      } else {
        console.error('Failed to update note')
      }
    })
  }

  return (
    <main className="flex flex-row max-h-screen min-w-[360px]">
      <div className="flex-grow basis-0 w-[97%] overflow-hidden">
        <NoteContainer notes={notes} activeNote={getActiveNote()} onUpdateNote={onUpdateNote} />
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
