import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

import { BigLoading } from 'components/global/Loading';
import { useAppSelector } from 'hooks';
import Registerform from 'components/auth/Registerform';

const Register: React.FC = () => {
  const loading = useAppSelector((state) => state.auth.loading);
  const currentUser = useAppSelector((state) => state.auth.currentUser);
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) return navigate('/', { replace: true });
  }, [navigate, currentUser]);

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-6rem)] ">
      <div className="container max-w-md p-5 shadow-sm border mt-10">
        <h2 className="my-3 text-xl2 font-semibold tracking-widset text-center uppercase">
          Register
        </h2>
        <Registerform />
        <div>
          You already have an account?{' '}
          <Link to="/login" className="text-red-500 hover:underline">
            Login
          </Link>
        </div>
      </div>
      {loading && <BigLoading />}
    </div>
  );
};

export default Register;
