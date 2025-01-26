import React from 'react'

function NoteHeader() {
  return (
    <header className="min-h-[2rem] items-center  w-full flex pb-3 border-b-[1px] border-light-secondary-40">
      <div className="relative w-full">
        <label
          htmlFor="name"
          className="absolute -top-2 left-2 inline-block rounded-lg bg-white px-1 text-xs font-medium text-gray-900"
        >
          Note Title
        </label>
        <input
          id="name"
          name="name"
          type="text"
          placeholder="Enter title of your note..."
          className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-secondary sm:text-sm/6"
        />
      </div>
    </header>
  )
}

export default NoteHeader
