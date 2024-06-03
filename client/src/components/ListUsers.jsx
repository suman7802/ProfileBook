import { useContext } from 'react';

import User from './User';
import { UsersContext } from '../context/users.context';

export default function ListUsers() {
  const context = useContext(UsersContext);
  if (context === undefined)
    throw new Error('useUsers must be used within a UsersProvider');

  const { users, loading, loadMoreUsers } = context;

  return (
    <div className="mb-3 flex w-full flex-col items-center sm:px-10">
      <div className="grid w-full grid-cols-1 gap-3 px-3 md:grid-cols-2 lg:grid-cols-3">
        {users.map((user) => (
          <User key={user.id} user={user} />
        ))}
      </div>

      <button
        type="button"
        onClick={loadMoreUsers}
        className="mt-5 w-40 rounded bg-indigo-500 px-4 py-2 font-bold text-white hover:bg-indigo-700"
      >
        {loading ? 'Loading..' : 'Load more'}
      </button>
    </div>
  );
}
