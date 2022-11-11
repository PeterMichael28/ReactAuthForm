import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { BrowserRouter as Router} from "react-router-dom";
import { AuthContextProvider } from './context/Auth';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <AuthContextProvider>
      <App />
      </AuthContextProvider>
    </Router> 
  </React.StrictMode>
)
