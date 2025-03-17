import React from 'react'
import { FaFileImport } from 'react-icons/fa'

export default function Import() {
  const handleImportData = (file) => {
    const reader = new FileReader()
    reader.onload = (event) => {
      try {
        const importedNotes = JSON.parse(event.target.result)

        chrome.runtime.sendMessage(
          { type: 'IMPORT_JSON_FILE', payload: importedNotes },
          (response) => {
            if (chrome.runtime.lastError) {
              alert('Failed to send message to background')
              return
            }

            if (response?.status == 'success') {
              alert('Notes imported successfully')
            } else {
              alert(response?.message || 'Import failed')
            }
          },
        )
      } catch (error) {
        alert('Invalid JSON file')
      }
    }
    reader.readAsText(file)
  }

  const triggerFileInput = () => {
    document.getElementById('fileInput').click()
  }
  return (
    <div className="flex justify-center items-center flex-col gap-4">
      <h2 className="text-center text-[18px] font-bold">Import your notes</h2>
      <input
        type="file"
        id="fileInput"
        accept=".json"
        onChange={(e) => handleImportData(e.target.files[0])}
        className="hidden"
      />
      <button
        onClick={triggerFileInput}
        className="flex flex-row justify-center items-center text-sm font-medium gap-2 max-w-[150px] bg-secondary border border-secondary text-white py-[5px] px-[20px] rounded-md hover:bg-white hover:text-secondary transition"
      >
        <FaFileImport size={14} />
        Choose File
      </button>
    </div>
  )
}
