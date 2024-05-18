import PropTypes from 'prop-types';
import { useState, useContext } from 'react';
import { ProfileContext } from '../context/profile.context';

export default function UpdateProfile({ fullName, bio, togglePOPUP }) {
  const context = useContext(ProfileContext);

  if (context === undefined) throw new Error('useProfile must be used within a ProfileProvider');

  const { loading, updateProfile } = context;
  const [updatedBio, setUpdatedBio] = useState(bio);
  const [updatedProfile, setUpdatedProfile] = useState(null);
  const [updatedFullName, setUpdatedFullName] = useState(fullName);

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = new FormData();
    data.append('bio', updatedBio);
    data.append('fullName', updatedFullName);
    data.append('profile', updatedProfile);

    updateProfile(data);
  };

  return (
    <div className="absolute w-80 top-80 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 bg-[#e4e7ebe4] border border-gray-300 rounded-md">
      <form
        encType="multipart/form-data"
        onSubmit={handleSubmit}
        className="m-10 flex flex-col gap-4"
      >
        {/* fullName field */}
        <input
          value={updatedFullName}
          placeholder="Full Name"
          onChange={(event) => setUpdatedFullName(event.target.value)}
          className="bg-transparent border border-gray-400 rounded-md px-2 outline-none"
        />

        {/* bio field */}
        <textarea
          rows="4"
          cols="50"
          placeholder="Bio"
          value={updatedBio}
          onChange={(event) => setUpdatedBio(event.target.value)}
          className="bg-transparent border border-gray-400 rounded-md px-2 outline-none"
        />

        {/* profile field */}
        <input
          type="file"
          id="profile"
          name="profile"
          accept="image/*"
          capture="camera"
          onChange={(event) => setUpdatedProfile(event.target.files[0])}
          className="bg-transparent rounded-md px-1 outline-none"
        />

        {/* action buttons */}
        <div className="flex flex-col gap-3">
          <button
            type="submit"
            disabled={updatedFullName === fullName && updatedBio === bio && !updatedProfile}
            className={`rounded-md text-white py-1 hover:bg-indigo-600 ${
              updatedFullName === fullName && updatedBio === bio && !updatedProfile
                ? 'bg-indigo-300'
                : 'bg-indigo-500'
            }`}
          >
            Update{loading && 'ing...'}
          </button>

          <button
            type="button"
            className="bg-indigo-500 rounded-md text-white py-1 hover:bg-indigo-600"
            onClick={togglePOPUP}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

UpdateProfile.propTypes = {
  fullName: PropTypes.string.isRequired,
  bio: PropTypes.string.isRequired,
  togglePOPUP: PropTypes.func.isRequired,
};
