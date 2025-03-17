import React from 'react'
import { MdSimCardDownload } from 'react-icons/md'

export default function Export() {
  const handleExportData = () => {
    chrome.runtime.sendMessage({ type: 'DOWNLOAD_JSON_FILE' })
    console.log('download data')
  }

  return (
    <div className="flex justify-center items-center flex-col gap-4">
      <h2 className="text-center text-[18px] font-bold">Download your notes</h2>
      <button
        className={`flex flex-row justify-center items-center gap-1 max-w-[220px] px-[30px] py-[5px] text-sm font-medium bg-secondary border border-secondary text-white p-2 rounded-md hover:bg-white hover:text-secondary transition`}
        onClick={() => handleExportData()}
      >
        <MdSimCardDownload size="14" />
        Download JSON file
      </button>
    </div>
  )
}
