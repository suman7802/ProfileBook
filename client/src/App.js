import Auth from './pages/Auth';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import { AuthProvider } from './context/auth.context';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <div className="App">
          <Navbar />
          <div className="pt-20">
            <Routes>
              <Route path="/*" index element={<Home />} />
              <Route path="/auth/*" element={<Auth />} />
            </Routes>
          </div>
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}
