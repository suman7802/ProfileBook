import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gray-200 fixed w-screen px-6 py-4 shadow">
      <div className="flex flex-col mx-auto md:flex-row md:items-center md:justify-between">
        <div className="flex justify-between items-center">
          <div>
            <Link to="/" className="text-indigo-600 text-xl font-bold md:text-2xl">
              Profile Book
            </Link>
          </div>
          <div>
            <button
              type="button"
              className="block text-gray-800 hover:text-gray-600 focus:text-gray-600 focus:outline-none md:hidden"
              onClick={() => setIsOpen(!isOpen)}
            >
              <FontAwesomeIcon icon={faBars} />
            </button>
          </div>
        </div>

        <div className={`md:flex ${isOpen ? '' : 'hidden'} `}>
          <Link
            to="/"
            className="block mt-4 md:inline-block md:mt-0 md:ml-6 text-gray-600 hover:text-gray-900"
          >
            Home
          </Link>
          <Link
            to="/about"
            className="block mt-4 md:inline-block md:mt-0 md:ml-6 text-gray-600 hover:text-gray-900"
          >
            About
          </Link>
          <Link
            to="/contact"
            className="block mt-4 md:inline-block md:mt-0 md:ml-6 text-gray-600 hover:text-gray-900"
          >
            Contact
          </Link>
        </div>
      </div>
    </nav>
  );
}
