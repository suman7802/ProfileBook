import { Link } from 'react-router-dom';
import { useState, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { ProfileContext } from '../context/profile.context';

export default function Navbar() {
  const location = useLocation();
  const context = useContext(ProfileContext);
  const [isOpen, setIsOpen] = useState(false);

  if (context === undefined)
    throw new Error('useProfile must be used within a ProfileProvider');

  const { isAuthenticated, loading } = context;

  return (
    <nav className="fixed z-50 w-screen bg-gray-200 px-6 py-4 shadow">
      <div className="mx-auto flex flex-col md:flex-row md:items-center md:justify-between">
        <div className="flex items-center justify-between">
          <div>
            <Link
              to="/"
              className="text-xl font-bold text-indigo-600 md:text-2xl"
            >
              Profile Book
            </Link>
          </div>
          <div>
            <button
              type="button"
              className="block font-semibold text-gray-800 hover:text-indigo-700 focus:text-gray-600 focus:outline-none md:hidden"
              onClick={() => setIsOpen(!isOpen)}
            >
              <FontAwesomeIcon icon={faBars} />
            </button>
          </div>
        </div>

        <div className={`md:flex ${isOpen ? '' : 'hidden'} `}>
          {!loading && isAuthenticated && (
            <Link
              to="/profile"
              className={`mt-4 block font-semibold text-gray-600 hover:text-indigo-700 md:ml-6 md:mt-0 md:inline-block ${
                location.pathname === '/profile' && 'text-indigo-500'
              }`}
            >
              Profile
            </Link>
          )}

          {!loading && isAuthenticated && (
            <Link
              to="/account"
              className={`mt-4 block font-semibold text-gray-600 hover:text-indigo-700 md:ml-6 md:mt-0 md:inline-block ${
                location.pathname === '/account' && 'text-indigo-500'
              }`}
            >
              Account
            </Link>
          )}

          <Link
            to="/about"
            className={`mt-4 block font-semibold text-gray-600 hover:text-indigo-700 md:ml-6 md:mt-0 md:inline-block ${
              location.pathname === '/about' && 'text-indigo-500'
            }`}
          >
            About
          </Link>
        </div>
      </div>
    </nav>
  );
}

// ${location.pathname === '/profile' && 'text-indigo-500'}
