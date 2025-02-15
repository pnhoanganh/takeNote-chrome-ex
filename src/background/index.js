let notes = []
let activeNote = null

// Initialize data from storage when the extension starts
chrome.storage.local.get(['notes', 'activeNote'], (data) => {
  notes = data.notes || []
  activeNote = data.activeNote || null
})

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
  }

  return isAsync
})
