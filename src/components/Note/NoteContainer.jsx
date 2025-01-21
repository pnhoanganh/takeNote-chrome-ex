import React from 'react'
import NoteHeader from './NoteHeader'
import TakeNote from './TakeNote'

function NoteContainer() {
  return (
    <div className="flex flex-col text-black">
      <NoteHeader />
      <TakeNote />
    </div>
  )
}

export default NoteContainer
