import React from 'react'
// import { GoPlus } from 'react-icons/go'
import { TiDocumentAdd } from 'react-icons/ti'
import { TiDocumentDelete } from 'react-icons/ti'

function NoteHeader() {
  return (
    <header className="min-h-[2rem] items-center  w-full flex h-8 mb-0.5 border-b-[1px] border-light-secondary-40">
      <div className="flex flex-1 pl-2 mb-1 gap-2">
        <div className=" pt-1 min-w-16 h-7 flex justify-center items-center hover:bg-light-secondary-20 rounded-md transition-all duration-300 ease-linear">
          {/* <GoPlus size="18px" /> */}
          <button className="flex flex-row gap-1">
            <TiDocumentAdd size="18px" /> Save
          </button>
        </div>
        <div className=" pt-1 min-w-16 h-7 flex justify-center items-center hover:bg-light-secondary-20 rounded-md transition-all duration-300 ease-linear">
          {/* <GoPlus size="18px" /> */}

          <button className="flex flex-row gap-1">
            <TiDocumentDelete size="18px" /> Delete
          </button>
        </div>
      </div>
    </header>
  )
}

export default NoteHeader
