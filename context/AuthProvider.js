import { createContext, useReducer, useEffect } from 'react';
import axios, { axiosPrivate } from '@/helpers/axios';
import { useRouter } from 'next/router';

const LOGIN_URL = '/auth/login';

const initialState = {
  user: null,
  error: null,
  authenticated: false,
  loading: false,
  successMessage: '',
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'INIT_AUTH':
      return {
        ...state,
        user: action.payload,
      };
    case 'LOGOUT_REQUEST':
    case 'LOGIN_REQUEST':
      return {
        ...state,
        loading: true,
      };
    case 'LOGIN_SUCCESS':
      window.localStorage.setItem('user', JSON.stringify(action.payload));
      return {
        ...state,
        user: action.payload,
        loading: false,
      };
    case 'LOGIN_FAILURE':
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case 'LOGOUT':
      return {
        ...state,
        user: null,
        loading: false,
        successMessage: action.payload,
      };
    case 'CLEAR_ERROR':
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const router = useRouter();

  useEffect(() => {
    const currentUser = JSON.parse(window.localStorage.getItem('user'));
    if (currentUser || currentUser !== null) {
      dispatch({ type: 'INIT_AUTH', payload: currentUser });
    }
  }, []);

  const loginUser = async (user) => {
    dispatch({
      type: 'LOGIN_REQUEST',
    });

    try {
      const response = await axios.post(LOGIN_URL, user, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });
      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: response.data.user,
      });
      router.push('/');
    } catch (error) {
      dispatch({
        type: 'LOGIN_FAILURE',
        payload: error.response?.data.message,
      });
    }
  };

  const logout = async () => {
    dispatch({ type: 'LOGOUT_REQUEST' });
    try {
      const response = await axios.get('/auth/logout', {
        withCredentials: true,
      });
      dispatch({ type: 'LOGOUT', payload: response.data.message });
      window.localStorage.removeItem('user');
      router.push('/login');
    } catch (error) {
      console.log(error.response.data);
    }
  };

  axiosPrivate.interceptors.response.use(
    function (response) {
      return response;
    },

    function (error) {
      let res = error.response;

      if (res.status === 401 && res.config && !res.config.__isRetryRequest) {
        return new Promise((resolve, reject) => {
          axios
            .get('/auth/logout', { withCredentials: true })
            .then((data) => {
              dispatch({ type: 'LOGOUT' });
              window.localStorage.removeItem('user');
              window.location.href = '/login';
            })
            .catch((err) => {
              console.log('AXIOS INTERCEPTOR ERR', err);
              reject(error);
            });
        });
      }
      return Promise.reject(error);
    }
  );

  return (
    <AuthContext.Provider value={{ state, dispatch, loginUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
