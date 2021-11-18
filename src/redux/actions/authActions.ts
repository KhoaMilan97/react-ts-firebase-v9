import { toast } from 'react-toastify';
import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
  setPersistence,
  browserSessionPersistence,
  browserLocalPersistence,
  signInWithPopup,
  sendPasswordResetEmail,
} from 'firebase/auth';

import { IRegister, ILogin } from './../../types/index';
import { auth, providerFacebook, providerGoogle } from 'Firebase.init';

export const registerApi = async (user: IRegister) => {
  try {
    const res = await createUserWithEmailAndPassword(
      auth,
      user.email,
      user.password
    );

    await updateProfile(res.user, {
      displayName: user.name,
    });

    return res.user;
  } catch (err: any) {
    return toast.error(err.message);
  }
};
export const loginApi = async (user: ILogin) => {
  try {
    const { remember, email, password } = user;

    await setPersistence(
      auth,
      remember ? browserLocalPersistence : browserSessionPersistence
    );

    const res = await signInWithEmailAndPassword(auth, email, password);

    return res.user;
  } catch (err: any) {
    return toast.error(err.message);
  }
};

export const googleApi = async () => {
  try {
    const res = await signInWithPopup(auth, providerGoogle);

    return res.user;
  } catch (err: any) {
    return toast.error(err.message);
  }
};

export const facebookApi = async () => {
  try {
    const res = await signInWithPopup(auth, providerFacebook);

    return res.user;
  } catch (err: any) {
    return toast.error(err.message);
  }
};

export const forgotPasswordApi = async (email: string) => {
  try {
    await sendPasswordResetEmail(auth, email);

    return toast.success('Success! Please check your email');
  } catch (err: any) {
    return toast.error(err.message);
  }
};
