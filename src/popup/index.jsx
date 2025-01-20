import React from 'react'
import ReactDOM from 'react-dom/client'
import { Popup } from './Popup'
import '../tailwind.dist.css'
import './index.css'

ReactDOM.createRoot(document.getElementById('app')).render(
  <React.StrictMode>
    <Popup />
  </React.StrictMode>,
)
