import { Routes, Route, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import {
  onAuthStateChanged,
  sendEmailVerification,
  signOut,
} from '@firebase/auth';
import { useEffect, useState } from 'react';

import PageRender from './PageRender';
import Header from './components/header';
import { auth } from 'Firebase.init';
import 'react-toastify/dist/ReactToastify.css';
import { useAppDispatch } from 'hooks';
import { addUser } from 'redux/slice/authSlice';
import { BigLoading } from 'components/global/Loading';

function App() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        console.log('run');
        const providerId = user.providerData.some(
          (p) => p.providerId === 'password'
        );
        if (!user.emailVerified && providerId) {
          await sendEmailVerification(user);
          setLoading(false);
          await signOut(auth);
          navigate('/email_verified');
          return;
        }

        dispatch(addUser(user));
        setLoading(false);
      } else {
        dispatch(addUser(undefined));
        setLoading(false);
        //navigate('/login')
        return;
      }
    });

    return unsubscribe;
  }, [navigate, dispatch]);

  if (loading) return <BigLoading />;

  return (
    <>
      <ToastContainer />
      <Header />
      <main className="container p-4 mx-auto max-w-7xl">
        <Routes>
          <Route path="/" element={<PageRender />} />
          <Route path="/:page" element={<PageRender />} />
          <Route path="/:page/:id" element={<PageRender />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
