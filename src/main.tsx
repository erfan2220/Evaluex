//@ts-nocheck
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import React from "react";
import {AuthProvider} from "./components/Auth/AuthContext.tsx";
import './index.css'



ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <AuthProvider>
        <App  />
      </AuthProvider>
  </React.StrictMode>,
)
