import { useContext } from 'react';

import User from './User';
import { UsersContext } from '../context/users.context';

export default function ListUsers() {
  const context = useContext(UsersContext);
  if (context === undefined) throw new Error('useUsers must be used within a UsersProvider');

  const { users, loading, loadMoreUsers } = context;

  return (
    <div className="w-screen flex flex-col items-center sm:px-10">
      <hr className="border w-full md:w-[60vw] lg:w-[40vw] xl:w-[29vw] 2xl:w-[18vw]" />

      {users.map((user) => (
        <User key={user.id} user={user} />
      ))}

      <button
        type="button"
        onClick={loadMoreUsers}
        className="bg-indigo-500 text-white font-bold py-2 px-4 rounded mt-5 w-40 hover:bg-indigo-700"
      >
        {loading ? 'Loading..' : 'Load more'}
      </button>
    </div>
  );
}
