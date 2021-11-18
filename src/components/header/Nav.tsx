import { Link } from 'react-router-dom';

const Nav: React.FC = () => {
  return (
    <div>
      <Link to="/login">
        <button className="px-5 py-2 hover:text-green-500">Login</button>
      </Link>

      <Link to="/register">
        <button className="px-5 py-2 text-white bg-gray-400 rounded-lg hover:bg-green-500">
          Register
        </button>
      </Link>
    </div>
  );
};

export default Nav;
