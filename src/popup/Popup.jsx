import { useState, useEffect } from 'react'
import SideBar from '../components/SideBar/SideBar'
import NoteContainer from '../components/Note/NoteContainer'

export const Popup = () => {
  return (
    <main className="flex flex-row max-h-screen min-h-[500px] min-w-[550px]">
      {/* NoteContainer chiếm tỉ lệ linh hoạt */}
      <div className="flex-grow">
        <NoteContainer />
      </div>
      {/* SideBar chiếm một tỉ lệ nhỏ, thay đổi theo kích thước màn hình */}
      <div className="w-[3%] min-w-[34px] max-w-[50px]">
        <SideBar />
      </div>
    </main>
  )
}

export default Popup
