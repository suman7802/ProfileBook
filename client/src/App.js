import Auth from './pages/Auth';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import { AuthProvider } from './context/auth.context';
import { ProfileProvider } from './context/profile.context';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Profile from './components/Profile';
import About from './pages/About';
import Account from './pages/Account';

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ProfileProvider>
          <div className="App">
            <Navbar />
            <div className="pt-16">
              <Routes>
                <Route path="/*" index element={<Home />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/account" element={<Account />} />
                <Route path="/auth/*" element={<Auth />} />
                <Route path="/about" element={<About />} />
              </Routes>
            </div>
          </div>
        </ProfileProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
