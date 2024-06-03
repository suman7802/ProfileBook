import { useState } from 'react';
import PropTypes from 'prop-types';
import { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan, faLock } from '@fortawesome/free-solid-svg-icons';

import ConfirmDialog from './ConfirmDialog';
import { UsersContext } from '../context/users.context';

export default function User({ user }) {
  const context = useContext(UsersContext);
  if (context === undefined)
    throw new Error('useUsers must be used within a UsersProvider');

  const { deleteUser } = context;

  const [show, setShow] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [confirmAction, setConfirmAction] = useState(null);

  const handleDelete = () => {
    setConfirmAction(() => () => deleteUser(user.id));
    setShowConfirm(true);
  };

  const handleConfirm = () => {
    confirmAction();
    setShowConfirm(false);
  };

  return (
    <>
      {showConfirm && (
        <ConfirmDialog
          message="Are you sure?"
          confirmColor="red"
          onConfirm={handleConfirm}
          onCancel={() => setShowConfirm(false)}
        />
      )}

      <div className="user my-1 flex w-full min-w-72 flex-col items-center rounded-md bg-[#ececece0] px-2 py-3 sm:px-5">
        <div className="flex w-full flex-row items-center justify-between">
          <img
            src={user.profile}
            alt={user.fullName}
            className="h-16 w-16 rounded-full border-2 border-indigo-500 object-cover"
          />

          <div className="textInfo flex w-[calc(100%-6rem)] flex-row justify-between">
            <div className="info">
              <h2>{user.fullName}</h2>
              <p className="text-sm">{user.email}</p>
              <div className="status flex flex-row">
                {user.verified && (
                  <p className="text-sm text-green-500">verified</p>
                )}
                <p className="text-sm lowercase text-green-500">
                  &nbsp;{user.role}&nbsp;&nbsp;
                </p>
                <p
                  onClick={() => setShow(!show)}
                  className="text-sm text-indigo-500 hover:cursor-pointer hover:underline"
                >
                  {show ? 'less' : 'more'}
                </p>
              </div>
            </div>
          </div>

          {user.role === 'USER' ? (
            <button
              type="button"
              onClick={handleDelete}
              className="text-red-500"
            >
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
    </>
  );
}

User.propTypes = {
  user: PropTypes.object.isRequired,
};
