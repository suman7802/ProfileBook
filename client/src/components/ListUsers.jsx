import { useContext } from 'react';

import User from './User';
import { UsersContext } from '../context/users.context';

export default function ListUsers() {
  const context = useContext(UsersContext);
  if (context === undefined) throw new Error('useUsers must be used within a UsersProvider');

  const { users, loading, loadMoreUsers } = context;

  console.log(users);
  return (
    <div className="w-screen flex flex-col items-center px-10">
      <hr className="border w-full" />

      {users.map((user) => (
        <User key={user.id} user={user} />
      ))}

      {loading && <p>Loading...</p>}

      {!loading && (
        <button
          type="button"
          onClick={loadMoreUsers}
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded mt-5"
        >
          Load more
        </button>
      )}
    </div>
  );
}
