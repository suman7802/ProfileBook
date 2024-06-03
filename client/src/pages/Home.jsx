import { useContext } from 'react';
import { Link } from 'react-router-dom';

import HeroAnimation from '../assets/hero.svg';
import { ProfileContext } from '../context/profile.context';

export default function Blog() {
  const context = useContext(ProfileContext);

  if (context === undefined)
    throw new Error('useProfile must be used within a ProfileProvider');

  const { isAuthenticated, loading } = context;

  return (
    <div className="flex flex-col items-center py-7">
      <img src={HeroAnimation} alt="hero" className="h-[50vh]" />
      <h1 className="mt-5 text-center text-4xl font-semibold leading-relaxed">
        <span className="block md:inline">SYNC with&nbsp;</span>
        <span className="block text-indigo-600 md:inline">Profile Book</span>
      </h1>
      <p className="p-5 text-center">Let's get started with Profile Book</p>

      {!loading && isAuthenticated ? (
        <Link to="/profile">
          <button className="rounded-md bg-indigo-600 px-8 py-3 text-white hover:bg-indigo-700">
            Profile
          </button>
        </Link>
      ) : (
        <Link to="/auth/login">
          <button className="rounded-md bg-indigo-600 px-8 py-3 text-white hover:bg-indigo-700">
            Login
          </button>
        </Link>
      )}
    </div>
  );
}
