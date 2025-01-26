import React from 'react'
import NoteHeader from './NoteHeader'
import TakeNote from './TakeNote'

function NoteContainer({ activeNote }) {
  return (
    <div className="flex flex-col h-screen w-full p-4 pt-8 bg-white text-black">
      <div className="mb-4">
        <NoteHeader />
      </div>
      <div className=" flex-grow border rounded-lg p-4">
        <TakeNote />
      </div>
    </div>
  )
}

export default NoteContainer
