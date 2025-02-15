import React, { useState, useEffect } from 'react'

function TextInput({ value, onChange }) {
  const [currentValue, setCurrentValue] = useState(value)

  useEffect(() => {
    setCurrentValue(value)
  }, [value])

  return (
    <input
      type="text"
      value={currentValue}
      className="block w-full rounded-md bg-white px-3 py-2.5 text-lg text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 placeholder:text-[16px] focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-secondary"
      onChange={(e) => {
        const newValue = e.target.value
        setCurrentValue(newValue)
        onChange(newValue)
      }}
    />
  )
}

function NoteHeader({ activeNote, onEditField }) {
  return (
    <header className="min-h-[2rem] items-center w-full flex pb-4 border-b-[1px] border-light-secondary-40">
      <div className="relative w-full">
        <label
          htmlFor="title"
          className="absolute -top-4 left-2 inline-block rounded-lg bg-white px-1 text-[16px] font-medium text-secondary"
        >
          Note Title
        </label>
        <TextInput
          value={activeNote?.title || ''}
          onChange={(newValue) => {
            onEditField('title', newValue)
          }}
        />
      </div>
    </header>
  )
}

export default NoteHeader
