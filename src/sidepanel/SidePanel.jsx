import { useState, useEffect } from 'react'
import SideBar from '../components/SideBar/SideBar'
import NoteContainer from '../components/Note/NoteContainer'

export const SidePanel = () => {
  return (
    <main className="flex flex-row max-h-screen min-h-[400px] min-w-[350px]">
      <div className="flex-grow">
        <NoteContainer />
      </div>
      <div className="w-[3%] min-w-[34px] max-w-[50px]">
        <SideBar />
      </div>
    </main>
  )
}

export default SidePanel
