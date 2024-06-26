import axios from 'axios';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { createContext, useReducer } from 'react';

import { url, cookieName } from '../config';

const AuthContext = createContext();

const api = axios.create({
  baseURL: `${url}/auth`,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});

const initialState = {
  email: '',
  loading: false,
};

function reducer(state, action) {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_EMAIL':
      return { ...state, email: action.payload };
    default:
      return state;
  }
}

function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const navigate = useNavigate();

  const signUp = async (email, password, fullName, role, adminPassword) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    dispatch({ type: 'SET_EMAIL', payload: email });

    try {
      const requestBody = {
        role,
        email,
        password,
        fullName,
      };

      if (role === 'ADMIN') requestBody.adminPassword = adminPassword;

      const response = await api.post('/signup', requestBody);

      if (response.status === 201) {
        toast.success(response.data.message);
        navigate('/auth/verify');
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response.data.message);
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const verify = async (otp, email = state.email) => {
    dispatch({ type: 'SET_LOADING', payload: true });

    try {
      const response = await api.put('/verify', { otp, email });

      if (response.status === 200) {
        toast.success(response.data.message);
        navigate('/auth/login');
      }
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const logIn = async (email, password) => {
    dispatch({ type: 'SET_LOADING', payload: true });

    try {
      const response = await api.post('/login', {
        email,
        password,
      });

      if (response.status === 200) {
        navigate('/');
        window.location.reload();
      }
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const logout = () => {
    document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:01 UTC; path=/`;
    navigate('/');
    window.location.reload();
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        signUp,
        verify,
        logIn,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { AuthProvider, AuthContext };
