import { useContext } from 'react';

import User from './User';
import { UsersContext } from '../context/users.context';

export default function ListUsers() {
  const context = useContext(UsersContext);
  if (context === undefined) throw new Error('useUsers must be used within a UsersProvider');

  const { users, loading, loadMoreUsers } = context;

  return (
    <div className="w-full flex flex-col items-center sm:px-10 mb-3">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 w-full px-3">
        {users.map((user) => (
          <User key={user.id} user={user} />
        ))}
      </div>

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
