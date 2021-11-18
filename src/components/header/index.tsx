import { Link } from 'react-router-dom';

import Nav from './Nav';
import NavAfterLogin from './NavAfterLogin';
import { useAppSelector } from 'hooks';

const Header: React.FC = () => {
  const { currentUser } = useAppSelector((state) => state.auth);

  return (
    <header className="sticky top-0 z-10 py-4 min-h-16 bg-gray-50">
      <div className="flex flex-wrap items-center justify-between max-w-6xl px-4 mx-auto">
        <Link to="/" className="text-2xl font-semibold">
          Firebase
        </Link>

        {currentUser ? <NavAfterLogin /> : <Nav />}
      </div>
    </header>
  );
};

export default Header;
