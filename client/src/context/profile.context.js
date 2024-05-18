import axios from 'axios';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { createContext, useReducer, useEffect } from 'react';

import { url } from '../config';

const ProfileContext = createContext();

const api = axios.create({
  baseURL: `${url}/profile`,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});

const initialState = {
  bio: '',
  role: '',
  email: '',
  profile: '',
  fullName: '',
  loading: false,
  isAuthenticated: false,
};

function reducer(state, action) {
  switch (action.type) {
    case 'SET_PROFILE':
      return {
        ...state,
        isAuthenticated: true,
        bio: action.payload.bio,
        role: action.payload.role,
        email: action.payload.email,
        profile: action.payload.profile,
        fullName: action.payload.fullName,
      };

    case 'DELETE_PROFILE':
      return initialState;

    case 'SET_LOADING':
      return { ...state, loading: action.payload };

    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

function ProfileProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    async function getProfile() {
      dispatch({ type: 'SET_LOADING', payload: true });

      try {
        const response = await api.get('/');

        if (response.status === 200) {
          dispatch({ type: 'SET_PROFILE', payload: response.data });
        }
      } catch (error) {
        console.error(error);
      } finally {
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    }

    getProfile();
  }, []);

  const updateProfile = async (data) => {
    dispatch({ type: 'SET_LOADING', payload: true });

    try {
      const response = await api.put('/update', data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (response.status === 202) {
        window.location.reload();
        toast.success(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response.data.message);
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const deleteProfile = async () => {
    dispatch({ type: 'SET_LOADING', payload: true });

    try {
      const response = await api.delete('/delete');

      if (response.status === 204) {
        dispatch({ type: 'DELETE_PROFILE' });
        toast.success(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response.data.message);
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  return (
    <ProfileContext.Provider value={{ ...state, updateProfile, deleteProfile }}>
      {children}
    </ProfileContext.Provider>
  );
}

ProfileProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { ProfileProvider, ProfileContext };
