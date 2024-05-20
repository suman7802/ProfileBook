import { useState, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightFromBracket, faTrashCan } from '@fortawesome/free-solid-svg-icons';

import { AuthContext } from '../context/auth.context';
import ConfirmDialog from '../components/ConfirmDialog';
import { ProfileContext } from '../context/profile.context';

export default function Account() {
  const authContext = useContext(AuthContext);
  const profileContext = useContext(ProfileContext);

  if (authContext === undefined) throw new Error('useAuth must be used within a AuthProvider');
  if (profileContext === undefined)
    throw new Error('useProfile must be used within a ProfileProvider');

  const { logout } = authContext;
  const { deleteProfile, loading } = profileContext;

  const [showConfirm, setShowConfirm] = useState(false);
  const [confirmAction, setConfirmAction] = useState(null);

  const handleLogout = () => {
    setConfirmAction(() => logout);
    setShowConfirm(true);
  };

  const handleDelete = () => {
    setConfirmAction(() => deleteProfile);
    setShowConfirm(true);
  };

  const handleConfirm = () => {
    confirmAction();
    setShowConfirm(false);
  };

  return (
    <div className="min-h-screen w-screen flex flex-col gap-5 items-center p-20 ">
      <button
        className="bg-indigo-600 min-w-48 hover:bg-indigo-700 px-8 py-3 text-white rounded-md"
        onClick={handleLogout}
      >
        Log out&nbsp;
        <FontAwesomeIcon icon={faArrowRightFromBracket} />
      </button>

      <button
        className="bg-red-500 min-w-48 hover:bg-red-600 px-8 py-3 text-white rounded-md"
        onClick={handleDelete}
      >
        Account Delete{loading && 'ing..'}&nbsp;
        <FontAwesomeIcon icon={faTrashCan} />
      </button>

      {showConfirm && (
        <ConfirmDialog
          message="Are you sure?"
          confirmColor="red"
          onConfirm={handleConfirm}
          onCancel={() => setShowConfirm(false)}
        />
      )}
    </div>
  );
}
