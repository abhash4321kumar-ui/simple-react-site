import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import 'remixicon/fonts/remixicon.css'
import { BrowserRouter } from "react-router-dom";
import Maincontext from './context/Maincontext.jsx'


createRoot(document.getElementById('root')).render(
  <Maincontext>
    <BrowserRouter basename="/simple-react-site">
    <App />
  </BrowserRouter>
  </Maincontext>
)
