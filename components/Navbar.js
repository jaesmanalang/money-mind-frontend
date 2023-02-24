import Link from 'next/link';
import useAuth from '@/hooks/useAuth';
import {
  ChevronDownIcon,
  ArrowLeftOnRectangleIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';

export default function Navbar() {
  const { state, logout } = useAuth();
  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="flex-1">
        <Link href="/" className="normal-case text-xl font-extrabold">
          MoneyMind
        </Link>
      </div>
      <div className="flex-none">
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost p-2">
            <div className="flex items-center normal-case">
              {state.user?.username}{' '}
              <ChevronDownIcon className="w-4 h-4 ml-1" />
            </div>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <Link
                href="/profile"
                className="flex items-center gap-1"
                onClick={logout}
              >
                <UserCircleIcon className="w-4 h-4" />
                <span>Profile</span>
              </Link>
            </li>
            <li>
              <button className="flex items-center gap-1" onClick={logout}>
                <ArrowLeftOnRectangleIcon className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
