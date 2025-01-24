import React from 'react'
import NoteHeader from './NoteHeader'
import TakeNote from './TakeNote'
import EmptyState from './EmptyState'

function NoteContainer() {
  return (
    <div className="flex flex-col h-screen w-full p-4 bg-white text-black">
      <div className="mb-4">
        <NoteHeader />
      </div>
      <div className=" flex-grow border rounded-lg p-4">
        <div className=" mt-20">
          <EmptyState />
        </div>
        {/* <TakeNote /> */}
      </div>
    </div>
  )
}

export default NoteContainer
