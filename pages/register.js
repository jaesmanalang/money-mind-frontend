import { useState } from 'react';
import Link from 'next/link';
import axios from '@/helpers/axios';
import { useRouter } from 'next/router';

export default function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState('');
  const router = useRouter();

  const clearInputs = () => {
    setUsername('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const { data } = await axios.post('/auth/register', {
        username,
        email,
        password,
        confirmPassword,
      });

      setData(data.message);
      clearInputs();
      setTimeout(() => {
        router.push('/login');
      }, [1000]);
    } catch (err) {
      setError(err.response?.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="min-h-screen flex flex-col items-center justify-center relative container">
        {data && (
          <div className="alert alert-success p-2 shadow-lg max-w-sm mb-4 absolute top-4 left-1/2 -translate-x-1/2">
            <div>
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
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>{data}</span> Redirecting to login page
            </div>
          </div>
        )}
        {error && (
          <div className="alert alert-error p-2 shadow-lg max-w-sm mb-4 absolute top-4 left-1/2 -translate-x-1/2">
            <div>
              <button>
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
          <h1 className="font-extrabold text-4xl mb-5">Register an account</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-2">
              <label htmlFor="username">Username</label>
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                id="username"
                className="input input-sm input-bordered input-primary w-full"
                type="text"
                required
              />
            </div>
            <div className="mb-2">
              <label htmlFor="email">Email</label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                id="email"
                className="input input-sm input-bordered input-primary w-full"
                type="email"
                required
              />
            </div>
            <div className="mb-2">
              <label htmlFor="password">Password</label>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input input-sm input-bordered input-primary w-full"
                id="password"
                type="password"
                required
              />
            </div>
            <div>
              <label htmlFor="password">Confirm Password</label>
              <input
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="input input-sm input-bordered input-primary w-full"
                id="confirmPassword"
                type="password"
                required
              />
            </div>
            <button
              disabled={loading}
              className="btn btn-primary btn-sm w-full mt-4"
              type="submit"
            >
              {loading ? 'Loading...' : 'Sign up'}
            </button>
          </form>
          <div className="mt-4">
            Already have an account?{' '}
            <Link className="text-primary hover:underline" href="/login">
              Login
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
