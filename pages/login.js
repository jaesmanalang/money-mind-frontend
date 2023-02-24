import { useState, useEffect, useRef } from 'react';
import useAuth from '@/hooks/useAuth';
import Link from 'next/link';

export default function Login() {
  const { state, dispatch, loginUser } = useAuth();
  const { loading, error } = state;
  const userRef = useRef();
  const errRef = useRef();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    const user = {
      username,
      password,
    };

    loginUser(user);
  }

  const clearError = () => {
    dispatch({ type: 'CLEAR_ERROR' });
  };

  useEffect(() => {
    clearError();
  }, [username, password]);

  return (
    <>
      <div className="container min-h-screen flex flex-col items-center justify-center relative">
        {error && (
          <div
            className="alert alert-error p-2 shadow-lg max-w-sm mb-4 absolute top-4 left-1/2 -translate-x-1/2"
            ref={errRef}
          >
            <div>
              <button onClick={clearError}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="stroke-current flex-shrink-0 h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </button>
              <span>{error}</span>
            </div>
          </div>
        )}
        <div className="max-w-sm mx-auto">
          <h1 className="font-extrabold text-4xl mb-5">Login your account</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-2">
              <label htmlFor="username">Username</label>
              <input
                id="username"
                ref={userRef}
                className="input input-sm input-bordered input-primary w-full"
                type="text"
                value={username}
                required
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <input
                className="input input-sm input-bordered input-primary w-full"
                id="password"
                type="password"
                value={password}
                required
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              disabled={loading}
              className="btn btn-primary btn-sm w-full mt-4"
              type="submit"
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>
          <div className="mt-4">
            Don't have an account?{' '}
            <Link className="text-primary hover:underline" href="/register">
              Signup
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
