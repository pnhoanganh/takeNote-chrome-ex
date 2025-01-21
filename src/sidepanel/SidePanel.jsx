import { useState, useEffect } from 'react'
import SideBar from '../components/SideBar/SideBar'
import NoteContainer from '../components/Note/NoteContainer'

export const SidePanel = () => {
  return (
    <main>
      <SideBar />
      <NoteContainer />
    </main>
  )
}

export default SidePanel
