import { Routes, Route, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { onAuthStateChanged, sendEmailVerification, signOut } from '@firebase/auth';
import { useEffect, useState } from 'react';

import { auth } from 'Firebase.init';

import { useAppDispatch, useAppSelector } from 'hooks';
import { addUser } from 'redux/slice/authSlice';
import { profileFetchData } from 'redux/slice/profileSlice';

import { BigLoading } from 'components/global/Loading';
import PageRender from './PageRender';
import Header from './components/header';

import 'react-toastify/dist/ReactToastify.css';

function App() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector((state) => state.auth.currentUser);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const providerId = user.providerData.some((p) => p.providerId === 'password');
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

  useEffect(() => {
    if (currentUser?.uid) dispatch(profileFetchData(currentUser.uid));
  }, [currentUser, dispatch]);

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
