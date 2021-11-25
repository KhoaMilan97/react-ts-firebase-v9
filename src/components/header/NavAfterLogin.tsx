import { Link, useNavigate } from 'react-router-dom';
import { UserCircleIcon } from '@heroicons/react/solid';

import { authLogout } from 'redux/slice/authSlice';
import { useAppDispatch, useAppSelector } from 'hooks';

const NavAfterLogin: React.FC = () => {
  const { currentUser } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  //const navigate = useNavigate();

  return (
    <div className="flex items-center">
      <Link to="/profile" replace className="flex items-center">
        <div className="w-10 h-10 overflow-hidden rounded-full">
          {currentUser?.photoURL ? (
            <img src={currentUser?.photoURL} alt="avatar" className="object-cover w-full h-full" />
          ) : (
            <UserCircleIcon className="w-full h-full" />
          )}
        </div>
        <span className="mr-4 font-semibold capitalize">{currentUser?.displayName}</span>
      </Link>
      <button
        onClick={() => {
          dispatch(authLogout());
          //navigate('/login');
        }}
        className="px-5 py-2 hover:text-green-500"
      >
        Logout
      </button>
    </div>
  );
};

export default NavAfterLogin;
