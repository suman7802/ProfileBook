import axios from 'axios';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { createContext, useReducer, useEffect } from 'react';

import { url } from '../config';

const StatusContext = createContext();

const api = axios.create({
  baseURL: `${url}/status`,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});

const initialState = { isConnected: false, loading: false };

function reducer(state, action) {
  switch (action.type) {
    case 'SET_STATUS':
      return {
        ...state,
        isConnected: action.payload,
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

function StatusProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    async function getProfile() {
      dispatch({ type: 'SET_LOADING', payload: true });
      try {
        const response = await api.get('/');

        if (response?.status === 200) {
          dispatch({ type: 'SET_STATUS', payload: response.data });
        }
      } catch (error) {
        console.error(error);
        toast.error(error.response?.data.message || 'No response from Server');
      } finally {
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    }

    getProfile();
  }, []);

  return (
    <StatusContext.Provider value={{ ...state }}>
      {children}
    </StatusContext.Provider>
  );
}

StatusProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { StatusProvider, StatusContext };
