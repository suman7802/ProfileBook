import { useContext } from 'react';

import Profile from '../components/Profile';
import ListUsers from '../components/ListUsers';
import { ProfileContext } from '../context/profile.context';

export default function UserProfile() {
  const context = useContext(ProfileContext);

  if (context === undefined)
    throw new Error('useProfile must be used within a ProfileProvider');
  const { role } = context;

  return (
    <>
      <div className="flex min-h-screen flex-col items-center">
        <Profile />
        {role === 'ADMIN' && <ListUsers />}
      </div>
    </>
  );
}
