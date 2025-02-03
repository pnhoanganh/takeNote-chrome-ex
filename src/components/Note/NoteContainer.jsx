import React from 'react'
import NoteHeader from './NoteHeader'
import TakeNote from './TakeNote'
import EmptyState from './EmptyState'

function NoteContainer({ activeNote, onUpdateNote, handleAddNote }) {
  const onEditField = (key, value) => {
    onUpdateNote({
      ...activeNote,
      [key]: value,
      lastModified: Date.now(),
    })
  }

  if (!activeNote) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <EmptyState handleAddNote={handleAddNote} />
      </div>
    )
  }

  return (
    <div className="flex flex-col h-screen w-full p-6 pt-9 bg-white text-black">
      <div className="mb-4">
        <NoteHeader activeNote={activeNote} onEditField={onEditField} />
      </div>
      <div className=" pt-2">
        <TakeNote activeNote={activeNote} onEditField={onEditField} />
      </div>
    </div>
  )
}

export default NoteContainer
