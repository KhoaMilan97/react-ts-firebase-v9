import { useAppSelector } from 'hooks';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
  const { currentUser } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) return navigate('/login', { replace: true });
  }, [navigate, currentUser]);

  return <div className="text-red-500">Hello</div>;
};

export default Home;
