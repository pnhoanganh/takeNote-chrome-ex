console.log('background is running')
// background.js

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'ADD_NOTE') {
    console.log('Add')
    // Perform any logic you want in the background
    // Example: Save a note or trigger something
    sendResponse({ status: 'success', message: 'Note added successfully!' })
  }
})
