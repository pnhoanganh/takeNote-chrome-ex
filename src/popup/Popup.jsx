import { useState, useEffect } from 'react'
import './Popup.css'
import SideBar from '../components/SideBar/SideBar'

export const Popup = () => {
  return (
    <main>
      <h3 className="text-3xl font-bold underline text-red-500">Popup Page</h3>
      <SideBar />
    </main>
  )
}

export default Popup
