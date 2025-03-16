import React from 'react'
import { MdSimCardDownload } from 'react-icons/md'

export default function Export() {
  const handleExportData = () => {
    chrome.runtime.sendMessage({ type: 'DOWNLOAD_JSON_FILE' })
    console.log('download data')
  }

  return (
    <div className="flex justify-center flex-col gap-4">
      <h2 className="text-center text-[18px] font-bold">Download your notes</h2>
      <button
        className={`flex flex-row justify-center items-center gap-1 rounded-full px-[30px] py-[5px] text-sm font-medium hover:text-secondary`}
        onClick={() => handleExportData()}
      >
        <MdSimCardDownload size="14" />
        Download JSON file
      </button>
    </div>
  )
}
