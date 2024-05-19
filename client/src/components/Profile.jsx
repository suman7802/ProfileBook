import { useState, useContext } from 'react';

import Avatar from '../assets/avatar.svg';
import UpdateProfile from './UpdateProfile';
import { ProfileContext } from '../context/profile.context';

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const context = useContext(ProfileContext);

  if (context === undefined) throw new Error('useProfile must be used within a ProfileProvider');

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
      <div className="flex flex-col w-screen items-center py-10 gap-4">
        <div className="relative">
          <img
            src={profile ? profile : Avatar}
            alt="profile"
            className="w-64 h-64 object-cover rounded-full border-4 border-indigo-500"
          />

          <span
            onClick={togglePOPUP}
            className="absolute hover:cursor-pointer text-sm text-white top-11 right-3 bg-blue-500 hover:bg-blue-700 px-2 rounded-[5vh]"
          >
            edit
          </span>
        </div>

        {loading && (
          <div className="absolute top-96 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            Loading..
          </div>
        )}

        <div className="flex flex-col gap-3 items-center text-center md:w-[50%] lg:w-[30%]">
          {role === 'ADMIN' && (
            <span className="text-sm text-white bottom-20 right-3 bg-blue-500 px-2 rounded-[5vh]">
              Admin
            </span>
          )}

          <span className="text-sm font-semibold text-gray-500">{email && email}</span>
          <span className="text-3xl font-semibold text-gray-500">
            {fullName ? fullName : 'Guest'}
          </span>
          <span className="text-xl font-semibold text-gray-500">{bio !== 'null' ? bio : ''}</span>
        </div>
      </div>
    </div>
  );
}
