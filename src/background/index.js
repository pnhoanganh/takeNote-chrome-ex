let notes = []
let activeNote = null

// Initialize data from storage when the extension starts
chrome.storage.local.get(['notes', 'activeNote'], (data) => {
  notes = data.notes || []
  activeNote = data.activeNote || null
})

// const convertArrayOfObjectsToCSV = (args) => {
//   const data = args.data
//   if (!data || !data.length) {
//     return
//   }

//   const columnDelimiter = args.columnDelimiter || ','
//   const lineDelimiter = args.lineDelimiter || '\n'

//   const keys = Object.keys(data[0])

//   let result = '';
//   result +=
// }

// Listen for messages from popup/sidepanel
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  let isAsync = false

  if (message.type === 'ADD_NOTE') {
    notes.push(message.payload)
    isAsync = true
    chrome.storage.local.set({ notes }, () => {
      sendResponse({ status: 'success', message: 'Note added', notes })
    })
  } else if (message.type === 'DELETE_NOTE') {
    const deletedNoteId = message.payload
    notes = notes.filter((note) => note.id !== deletedNoteId)

    // Update activeNote if deleted
    if (activeNote === deletedNoteId) {
      activeNote = notes.length > 0 ? notes[0].id : null
    }

    isAsync = true
    chrome.storage.local.set({ notes, activeNote }, () => {
      sendResponse({ status: 'success', message: 'Note deleted', notes, activeNote })
    })
  } else if (message.type === 'SET_ACTIVE_NOTE') {
    activeNote = message.payload
    isAsync = true
    chrome.storage.local.set({ activeNote }, () => {
      sendResponse({ status: 'success', activeNote })
    })
  } else if (message.type === 'GET_ACTIVE_NOTE') {
    sendResponse({ status: 'success', activeNote })
  } else if (message.type === 'UPDATE_NOTE') {
    const updatedNote = message.payload
    notes = notes.map((note) => (note.id === updatedNote.id ? updatedNote : note))

    // Ensure activeNote is still valid
    if (activeNote === updatedNote.id) {
      activeNote = updatedNote.id
    }

    isAsync = true
    chrome.storage.local.set({ notes, activeNote }, () => {
      sendResponse({ status: 'success', message: 'Note updated', notes, activeNote })
    })
  } else if (message.type === 'DOWNLOAD_JSON_FILE') {
    chrome.storage.local.get('notes', (data) => {
      const notes = data.notes || []
      const json = JSON.stringify(notes, null, 2)

      const blob = new Blob([json], { type: 'application/json' })
      const fileReader = new FileReader()

      fileReader.onloadend = function () {
        const url = fileReader.result // Dữ liệu dạng data URL

        chrome.downloads.download(
          {
            url: url,
            filename: 'notes.json',
            saveAs: true,
          },
          (downloadId) => {
            if (chrome.runtime.lastError) {
              console.error('Download error:', chrome.runtime.lastError)
            } else {
              sendResponse({ status: 'success', downloadId })
            }
          },
        )
      }

      fileReader.readAsDataURL(blob)
      return true
    })
  } else if (message.type === 'IMPORT_JSON_FILE') {
    const newNotes = message.payload

    // Kiểm tra dữ liệu hợp lệ
    if (!Array.isArray(newNotes)) {
      sendResponse({ status: 'error', message: 'Invalid data format' })
      return false
    }

    // Lọc ra những ghi chú có id chưa tồn tại
    const existingIds = new Set(notes.map((note) => note.id))
    const uniqueNotes = newNotes.filter((note) => !existingIds.has(note.id))

    if (uniqueNotes.length === 0) {
      sendResponse({ status: 'error', message: 'No new notes to import' })
      return false
    }

    // Cập nhật danh sách ghi chú
    notes = [...notes, ...uniqueNotes]
    chrome.storage.local.set({ notes }, () => {
      sendResponse({ status: 'success', message: 'Notes imported', notes })
    })

    return true
  }

  return isAsync
})
