import React from 'react'

function NoteHeader({ activeNote, onEditField }) {
  return (
    <header className="min-h-[2rem] items-center w-full flex pb-4 border-b-[1px] border-light-secondary-40">
      <div className="relative w-full">
        <label
          htmlFor="name"
          className="absolute -top-4 left-2 inline-block rounded-lg bg-white px-1 text-[16px] font-medium text-secondary"
        >
          Note Title
        </label>
        <input
          id="title"
          type="text"
          placeholder="Enter title of your note..."
          value={activeNote?.title || ''}
          autoFocus
          onChange={(e) => onEditField('title', e.target.value)}
          className="block w-full rounded-md bg-white px-3 py-2.5 text-lg text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 placeholder:text-[16px] focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-secondary "
        />
      </div>
    </header>
  )
}

export default NoteHeader
