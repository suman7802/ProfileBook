import PropTypes from 'prop-types';
import { useContext, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan, faLock } from '@fortawesome/free-solid-svg-icons';

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

function User({ user }) {
  const [show, setShow] = useState(false);
  return (
    <div className="user flex flex-col items-center  bg-[#ececece0] my-1 px-5 py-3 rounded-md">
      <div className="flex flex-row gap-7 items-center">
        <img
          src={user.profile}
          alt={user.fullName}
          className="w-16 h-16 object-cover rounded-full border-2 border-indigo-500"
        />

        <div className="info">
          <h2>{user.fullName}</h2>
          <p className="text-sm">{user.email}</p>
          <div className="status flex flex-row">
            {user.verified && <p className="text-sm text-green-500">verified</p>}
            <p className="text-sm text-green-500 lowercase">&nbsp;{user.role}&nbsp;&nbsp;</p>
            <p
              onClick={() => setShow(!show)}
              className="text-sm text-blue-500 hover:cursor-pointer hover:underline"
            >
              more
            </p>
          </div>
        </div>

        {user.role === 'USER' ? (
          <button type="button" className="text-red-500">
            <FontAwesomeIcon icon={faTrashCan} />
          </button>
        ) : (
          <span type="button" className="text-red-500">
            <FontAwesomeIcon icon={faLock} />
          </span>
        )}
      </div>
      {show && (
        <div className="bio">
          <p>{user.bio}</p>
        </div>
      )}
    </div>
  );
}

User.propTypes = {
  user: PropTypes.object.isRequired,
};
