import { useState, useEffect } from 'react'
import SideBar from '../components/SideBar/SideBar'
import NoteContainer from '../components/Note/NoteContainer'

export const Popup = () => {
  const [notes, setNotes] = useState([])
  const handleAddNote = () => {
    chrome.runtime.sendMessage({ type: 'ADD_NOTE' }, (response) => {
      if (response?.status === 'success') {
        console.log(response.message) // Handle success message
      } else {
        console.error('Failed to add note')
      }
    })
  }
  return (
    <main className="flex flex-row max-h-screen min-h-[500px] min-w-[550px]">
      <div className="flex-grow basis-0 w-[97%] overflow-hidden">
        <NoteContainer />
      </div>

      <div className="flex-shrink-0 w-[4%] min-w-[34px] max-w-[60px]">
        <SideBar notes={notes} handleAddNote={handleAddNote} />
      </div>
    </main>
  )
}

export default Popup
