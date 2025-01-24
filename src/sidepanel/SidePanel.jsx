import { useState, useEffect } from 'react'
import SideBar from '../components/SideBar/SideBar'
import NoteContainer from '../components/Note/NoteContainer'

export const SidePanel = () => {
  return (
    <main className="flex flex-row max-h-screen min-w-[360px]">
      <div className="flex-grow basis-0 w-[97%] overflow-hidden">
        <NoteContainer />
      </div>

      <div className="flex-shrink-0 w-[4%] min-w-[34px] max-w-[60px]">
        <SideBar />
      </div>
    </main>
  )
}

export default SidePanel
