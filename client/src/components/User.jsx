import { useState } from 'react';
import PropTypes from 'prop-types';
import { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan, faLock } from '@fortawesome/free-solid-svg-icons';

import ConfirmDialog from './ConfirmDialog';
import { UsersContext } from '../context/users.context';

export default function User({ user }) {
  const context = useContext(UsersContext);
  if (context === undefined) throw new Error('useUsers must be used within a UsersProvider');

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
      <div className="user flex flex-col items-center  bg-[#ececece0] my-1 px-5 py-3 rounded-md w-full">
        <div className="flex flex-row justify-between items-center w-full">
          <img
            src={user.profile}
            alt={user.fullName}
            className="w-16 h-16 object-cover rounded-full border-2 border-indigo-500"
          />

          <div className="textInfo flex flex-row justify-between w-[calc(100%-8rem)]">
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
          </div>

          {user.role === 'USER' ? (
            <button type="button" onClick={handleDelete} className="text-red-500">
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
