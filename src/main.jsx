
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ToastContainer } from 'react-toastify';
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import store, { persistor } from './redux/store.js';
import { PersistGate } from 'redux-persist/integration/react';

createRoot(document.getElementById('root')).render(
  <Provider store={store}>  
  <PersistGate persistor={persistor}>
  <BrowserRouter>
    <App />
    <ToastContainer />
  </BrowserRouter>
  </PersistGate>
  </Provider>
)
