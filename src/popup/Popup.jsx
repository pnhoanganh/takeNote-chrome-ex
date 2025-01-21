import { useState, useEffect } from 'react'
import './Popup.css'
import SideBar from '../components/SideBar/SideBar'
import NoteContainer from '../components/Note/NoteContainer'

export const Popup = () => {
  return (
    <main className=" flex flex-row min-h-screen h-[600px] w-[600px]">
      <SideBar />
      <NoteContainer />
    </main>
  )
}

export default Popup
