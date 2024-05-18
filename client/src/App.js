import Auth from './pages/Auth';
import { AuthProvider } from './context/auth.context';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <div className="App">
          <Navbar />
          <Routes>
            <Route path="/auth/*" element={<Auth />} />
          </Routes>
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}
