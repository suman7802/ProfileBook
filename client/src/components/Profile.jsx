import { useState, useContext } from 'react';

import Avatar from '../assets/avatar.svg';
import UpdateProfile from './UpdateProfile';
import { ProfileContext } from '../context/profile.context';

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const context = useContext(ProfileContext);

  if (context === undefined)
    throw new Error('useProfile must be used within a ProfileProvider');

  const { bio, role, email, profile, fullName, loading } = context;
  const togglePOPUP = () => {
    setIsEditing((isEditing) => !isEditing);
  };

  return (
    <div className="relative">
      {isEditing && (
        <UpdateProfile
          fullName={fullName !== 'null' ? fullName : ''}
          bio={bio !== 'null' ? bio : ''}
          togglePOPUP={togglePOPUP}
        />
      )}
      <div className="flex w-screen flex-col items-center gap-4 py-10">
        <div className="relative">
          <img
            src={profile ? profile : Avatar}
            alt="profile"
            className="h-64 w-64 rounded-full border-4 border-indigo-500 object-cover"
          />

          <span
            onClick={togglePOPUP}
            className="absolute bottom-11 right-2 rounded-[5vh] bg-indigo-500 px-2 text-sm text-white hover:cursor-pointer hover:bg-indigo-700"
          >
            edit
          </span>
        </div>

        {loading && (
          <div className="absolute left-1/2 top-96 -translate-x-1/2 -translate-y-1/2 transform">
            Loading..
          </div>
        )}

        <div className="flex flex-col items-center gap-3 text-center md:w-[50%] lg:w-[30%]">
          {role === 'ADMIN' && (
            <span className="bottom-20 right-3 rounded-[5vh] bg-indigo-500 px-2 text-sm text-white">
              Admin
            </span>
          )}

          <span className="text-sm font-semibold text-gray-700">
            {email && email}
          </span>
          <span className="text-3xl font-semibold text-gray-700">
            {fullName ? fullName : 'Guest'}
          </span>
          <span className="text-xl font-semibold text-gray-700">
            {bio !== 'null' ? bio : ''}
          </span>
        </div>
      </div>
    </div>
  );
}
