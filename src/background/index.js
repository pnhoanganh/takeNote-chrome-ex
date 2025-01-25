console.log('background is running')
// background.js

let notes = [] // Initialize the notes array

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'ADD_NOTE') {
    console.log('Add')
    const newNote = message.payload
    notes.push(newNote) // Add the note to the array
    sendResponse({ status: 'success', message: 'Note added successfully!', notes }) // Send the updated notes back
  }
})
