import React from 'react';
import { useAppDispatch } from 'hooks';
import { facebookLogin, googleLogin } from 'redux/slice/authSlice';

const LoginSocial = () => {
  const dispatch = useAppDispatch();

  return (
    <div>
      <button
        className="w-full p-3 my-2 rounded-lg font-semibold text-white bg-red-500 hover:bg-red-600"
        onClick={() => dispatch(googleLogin())}
      >
        Google
      </button>

      <button
        className="w-full p-3 my-2 rounded-lg font-semibold text-white bg-blue-500 hover:bg-blue-600"
        onClick={() => dispatch(facebookLogin())}
      >
        Facebook
      </button>
    </div>
  );
};

export default LoginSocial;
