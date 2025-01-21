import { useState, useEffect } from 'react'
import SideBar from '../components/SideBar/SideBar'
import NoteContainer from '../components/Note/NoteContainer'

export const Popup = () => {
  return (
    <main className="flex min-h-screen h-[500px] w-[550px]">
      <div className=" flex-grow">
        <NoteContainer />
      </div>
      <div className="w-9">
        <SideBar />
      </div>
    </main>
  )
}

export default Popup
