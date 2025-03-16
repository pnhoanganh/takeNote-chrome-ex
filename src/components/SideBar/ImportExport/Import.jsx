import React from 'react'
import { FaFileImport } from 'react-icons/fa'

export default function Import() {
  const handleImportData = (file) => {
    const reader = new FileReader()
    reader.onload = (event) => {
      try {
        const importedNotes = JSON.parse(event.target.result)

        // Lấy danh sách ghi chú hiện tại từ storage
        chrome.storage.local.get(['notes'], (data) => {
          const existingNotes = data.notes || []
          const existingIds = new Set(existingNotes.map((note) => note.id))

          // Lọc ra những ghi chú có ID chưa tồn tại
          const uniqueNotes = importedNotes.filter((note) => !existingIds.has(note.id))

          if (uniqueNotes.length === 0) {
            alert('No new notes to import')
            return
          }

          // Cập nhật danh sách ghi chú
          const updatedNotes = [...existingNotes, ...uniqueNotes]
          chrome.storage.local.set({ notes: updatedNotes }, () => {
            alert('Notes imported successfully')
          })
        })
      } catch (error) {
        alert('Invalid JSON file')
      }
    }
    reader.readAsText(file)
  }
  return (
    <div className="flex justify-center flex-col gap-4">
      <h2 className="text-center text-[18px] font-bold">Import your notes</h2>
    </div>
  )
}
