import { useContext } from 'react';
import { Link } from 'react-router-dom';

import HeroAnimation from '../assets/hero.svg';
import { ProfileContext } from '../context/profile.context';

export default function Blog() {
  const context = useContext(ProfileContext);

  if (context === undefined) throw new Error('useProfile must be used within a ProfileProvider');

  const { isAuthenticated, loading } = context;

  return (
    <div className="flex flex-col py-7 items-center">
      <img src={HeroAnimation} alt="hero" className="h-[50vh]" />
      <h1 className="text-4xl mt-5 font-semibold text-center leading-relaxed">
        <span className="md:inline block">SYNC with&nbsp;</span>
        <span className="text-indigo-600 md:inline block">Profile Book</span>
      </h1>
      <p className="text-center p-5">Don't Forget To Store Your Profile</p>

      <button className="bg-indigo-600 hover:bg-indigo-700 px-8 py-3 text-white rounded-md">
        {!loading && isAuthenticated ? (
          <Link to="/profile">Profile</Link>
        ) : (
          <Link to="/auth/login">Login</Link>
        )}
      </button>
    </div>
  );
}
