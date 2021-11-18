import Errors from 'components/global/Errors';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { authRegister } from 'redux/slice/authSlice';

import { validRegister } from 'utils/valid';
import { useAppDispatch } from 'hooks';

const Registerform: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cf_password, setCf_password] = useState('');
  const dispatch = useAppDispatch();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const user = { email, name, password, cf_password };
    const result = validRegister(user);

    if (result.errLength)
      return toast.error(() => <Errors errors={result.errMsg} />);

    dispatch(authRegister(user));
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Display Name</label>
        <input
          type="text"
          name="name"
          id="name"
          className="w-full p-3 border mt-1 rounded-lg"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
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
        />
      </div>
      <div className="my-3">
        <label htmlFor="cf_password">Confirm Password</label>
        <input
          type="password"
          name="cf_password"
          id="cf_password"
          className="w-full p-3 border mt-1 rounded-lg"
          value={cf_password}
          onChange={(e) => setCf_password(e.target.value)}
        />
      </div>

      <button className="my-3 w-full p-3 font-semibold rounded-lg tracking-wider border uppercase hover:bg-gray-200">
        Register
      </button>
    </form>
  );
};

export default Registerform;
