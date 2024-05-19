import Auth from './pages/Auth';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import { AuthProvider } from './context/auth.context';
import { ProfileProvider } from './context/profile.context';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import About from './pages/About';
import Account from './pages/Account';
import Status from './components/Status';
import UserProfile from './pages/UserProfile';
import { UsersProvider } from './context/users.context';

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ProfileProvider>
          <UsersProvider>
            <div className="App">
              <Navbar />
              <Status />
              <div className="pt-16">
                <Routes>
                  <Route path="/*" index element={<Home />} />
                  <Route path="/profile" element={<UserProfile />} />
                  <Route path="/account" element={<Account />} />
                  <Route path="/auth/*" element={<Auth />} />
                  <Route path="/about" element={<About />} />
                </Routes>
              </div>
            </div>
          </UsersProvider>
        </ProfileProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
