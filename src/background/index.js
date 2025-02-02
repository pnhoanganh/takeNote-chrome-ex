let notes = []
let activeNote = null

// Initialize data from storage when the extension starts
chrome.storage.local.get(['notes', 'activeNote'], (data) => {
  notes = data.notes || []
  activeNote = data.activeNote || null
})

// Listen for messages from popup/sidepanel
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'ADD_NOTE') {
    // Add new note to the notes array
    notes.push(message.payload)
    chrome.storage.local.set({ notes }, () => {
      sendResponse({ status: 'success', message: 'Note added', notes })
    })
  } else if (message.type === 'DELETE_NOTE') {
    // Delete note by id
    notes = notes.filter((note) => note.id !== message.payload)
    chrome.storage.local.set({ notes }, () => {
      sendResponse({ status: 'success', message: 'Note deleted', notes })
    })
  } else if (message.type === 'SET_ACTIVE_NOTE') {
    // Set the active note
    activeNote = message.payload
    chrome.storage.local.set({ activeNote }, () => {
      sendResponse({ status: 'success', activeNote })
    })
  } else if (message.type === 'GET_ACTIVE_NOTE') {
    // Get the active note
    sendResponse({ status: 'success', activeNote })
  } else if (message.type === 'UPDATE_NOTE') {
    // Update an existing note
    const updatedNote = message.payload
    notes = notes.map((note) => (note.id === updatedNote.id ? updatedNote : note))
    chrome.storage.local.set({ notes }, () => {
      sendResponse({ status: 'success', message: 'Note updated', notes })
    })
  }

  return true // Keep the channel open for async response
})
