console.log('background is running')
// background.js

let notes = []

// Listen for messages from popup/sidepanel
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'ADD_NOTE') {
    const newNote = message.payload
    notes.push(newNote)
    chrome.storage.local.set({ notes }, () => {
      sendResponse({ status: 'success', message: 'Note added', notes })
    })
    return true // Keep the message channel open for sendResponse
  } else if (message.type === 'DELETE_NOTE') {
    const idToDelete = message.payload
    notes = notes.filter((note) => note.id !== idToDelete)
    chrome.storage.local.set({ notes }, () => {
      sendResponse({ status: 'success', message: 'Note deleted', notes })
    })
    return true
  }
})

// Initialize notes from storage when the background script starts
chrome.storage.local.get('notes', (data) => {
  if (data.notes) {
    notes = data.notes
  }
})
