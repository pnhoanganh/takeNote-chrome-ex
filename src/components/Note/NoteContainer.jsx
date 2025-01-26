import React from 'react'
import NoteHeader from './NoteHeader'
import TakeNote from './TakeNote'

function NoteContainer({ activeNote }) {
  return (
    <div className="flex flex-col h-screen w-full p-6 pt-9 bg-white text-black">
      <div className="mb-4">
        <NoteHeader />
      </div>
      <div className=" pt-2">
        <TakeNote />
      </div>
    </div>
  )
}

export default NoteContainer
