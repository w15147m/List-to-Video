import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './assets/style/App.scss'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer } from 'react-toastify';
import { AdminAuthContext } from './context/AuthContext.jsx';
import 'react-confirm-alert/src/react-confirm-alert.css';

createRoot(document.getElementById('root')).render(
    <>
     <AdminAuthContext>

      <App />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
     </AdminAuthContext>
    </>
)
