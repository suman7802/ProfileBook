import './index.css';
import App from './App';
import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { StatusProvider } from './context/status.context';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <StrictMode>
    <StatusProvider>
      <App />
      <ToastContainer position="bottom-right" />
    </StatusProvider>
  </StrictMode>
);
