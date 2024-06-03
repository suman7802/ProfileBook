import axios from 'axios';
import PropTypes from 'prop-types';
import { useContext, useState } from 'react';
import { toast } from 'react-toastify';
import { createContext, useReducer, useEffect } from 'react';
import { ProfileContext } from '../context/profile.context';

import { url } from '../config';

const UsersContext = createContext();

const api = axios.create({
  baseURL: `${url}`,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});

const initialState = {
  users: [],
  isLoading: false,
};

function reducer(state, action) {
  switch (action.type) {
    case 'SET_USERS':
      return {
        ...state,
        users: [...state.users, ...action.payload],
      };
    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload,
      };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

function UsersProvider({ children }) {
  const [index, setIndex] = useState(0);
  const [state, dispatch] = useReducer(reducer, initialState);

  const context = useContext(ProfileContext);

  if (context === undefined)
    throw new Error('useProfile must be used within a ProfileProvider');
  const { role } = context;

  useEffect(() => {
    if (role === 'ADMIN') {
      const getUsers = async () => {
        dispatch({ type: 'SET_LOADING', payload: true });
        try {
          const response = await api.get(`/profiles/${index}`);

          if (response?.status === 200) {
            dispatch({ type: 'SET_USERS', payload: response.data.users });
          }
        } catch (error) {
          console.error(error);
          toast.error(error.response?.data.message);
        } finally {
          dispatch({ type: 'SET_LOADING', payload: false });
        }
      };
      getUsers();
    }
  }, [role, index]);

  const deleteUser = async (id) => {
    try {
      const response = await api.delete(`/profile/delete/${id}`);

      if (response?.status === 204) {
        toast.success(response.data.message);
        window.location.reload();
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data.message);
    }
  };

  const loadMoreUsers = () => setIndex((prevIndex) => prevIndex + 5);

  return (
    <UsersContext.Provider value={{ ...state, deleteUser, loadMoreUsers }}>
      {children}
    </UsersContext.Provider>
  );
}

UsersProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { UsersProvider, UsersContext };
