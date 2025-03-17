import { useState, useEffect } from 'react'
import SideBar from '../components/SideBar/SideBar'
import NoteContainer from '../components/Note/NoteContainer'

export const Popup = () => {
  const [notes, setNotes] = useState([]) // Default to an empty array
  const [activeNote, setActiveNote] = useState(false)

  // Fetch notes from chrome.storage.local on mount
  useEffect(() => {
    chrome.storage.local.get('notes', (data) => {
      if (data.notes) {
        setNotes(data.notes)
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

  // Sync notes to chrome.storage.local when the notes state changes
  useEffect(() => {
    if (notes.length > 0) {
      chrome.storage.local.set({ notes })
    }
  }, [notes])

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
        // Update state immediately without waiting for side panel to be opened
        setNotes(response.notes) // This updates the notes list
        setActiveNote(newNote.id) // Optionally set the new note as active
      } else {
        console.error('Failed to add note')
      }
    })
  }

  // DELETE NOTE
  const handleDeleteNote = (e, idToDelete) => {
    e.stopPropagation()
    chrome.runtime.sendMessage({ type: 'DELETE_NOTE', payload: idToDelete }, (response) => {
      if (response?.status === 'success') {
        setNotes(response.notes)
      } else {
        console.error('Failed to delete note')
      }
    })
  }

  // ACTIVE NOTE
  const handleSetActiveNote = (noteId) => {
    chrome.runtime.sendMessage({ type: 'SET_ACTIVE_NOTE', payload: noteId }, (response) => {
      if (response?.status === 'success') {
        setActiveNote(response.activeNote) // Update local state
      }
    })
  }

  useEffect(() => {
    chrome.runtime.sendMessage({ type: 'GET_ACTIVE_NOTE' }, (response) => {
      if (response?.status === 'success') {
        setActiveNote(response.activeNote)
      }
    })
  }, [])

  const getActiveNote = () => notes.find((note) => note.id === activeNote)

  // UPDATE NOTE
  const onUpdateNote = (updatedNote) => {
    chrome.runtime.sendMessage({ type: 'UPDATE_NOTE', payload: updatedNote }, (response) => {
      if (response?.status === 'success') {
        setNotes(response.notes) // Update the state with new notes
      } else {
        console.error('Failed to update note')
      }
    })
  }

  return (
    <main className="flex flex-row max-h-screen min-h-[500px] min-w-[550px]">
      <div className="flex-grow basis-0 w-[97%] overflow-hidden">
        <NoteContainer
          notes={notes}
          activeNote={getActiveNote()}
          onUpdateNote={onUpdateNote}
          handleAddNote={handleAddNote}
        />
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

export default Popup
