import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import "./styles/index.scss"
import "./styles/_forms.scss";
import "./styles/Tables.scss";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
    <App/>
    <ToastContainer />
    </BrowserRouter>
  </StrictMode>,
)
