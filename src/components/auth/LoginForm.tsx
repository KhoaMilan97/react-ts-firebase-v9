import { useState } from 'react';
import { authLogin } from 'redux/slice/authSlice';

import { useAppDispatch } from 'hooks';
import { Link } from 'react-router-dom';

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const disaptch = useAppDispatch();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const user = { email, password, remember };

    disaptch(authLogin(user));
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mt-3">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          className="w-full p-3 border mt-1 rounded-lg"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="mt-3">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          className="w-full p-3 border mt-1 rounded-lg"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      <div className="flex items-center justify-between my-3">
        <div className="flex items-center">
          <input
            type="checkbox"
            id="rb-me"
            className="w-4 h-4"
            checked={remember}
            onChange={() => setRemember(!remember)}
          />
          <label
            className="block ml-2 text-sm  cursor-pointer hover:underline"
            htmlFor="rb-me"
          >
            Remember me
          </label>
        </div>
        <Link
          to="/forgot_password"
          className="block ml-2 text-sm text-blue-500 cursor-pointer hover:underline"
        >
          Forgot your password?
        </Link>
      </div>

      <button className="my-3 w-full p-3 font-semibold rounded-lg tracking-wider border uppercase hover:bg-gray-200">
        Login
      </button>
    </form>
  );
};

export default LoginForm;
