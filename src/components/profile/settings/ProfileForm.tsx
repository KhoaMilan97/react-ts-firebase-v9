import React, { FormEvent, useEffect, useState } from 'react';

import { ChangeInput, IProfile } from 'types';
import { useAppDispatch, useAppSelector } from 'hooks';

import { profileUpdate } from 'redux/slice/profileSlice';

const ProfileForm = () => {
  const init = {
    fullName: '',
    emailContact: '',
    address: '',
    phone: '',
    website: '',
    about: '',
  };

  const [data, setData] = useState<IProfile>(init);
  const { fullName, emailContact, address, phone, website, about } = data;
  const auth = useAppSelector((state) => state.auth);
  const profile = useAppSelector((state) => state.profile.profile);
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();

  const handleChange = (e: ChangeInput) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  useEffect(() => {
    if (profile) {
      setData(profile);
    }
  }, [profile]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!auth.currentUser) return;
    setLoading(true);
    await dispatch(profileUpdate({ user: auth.currentUser, data }));
    setLoading(false);
  };

  return (
    <div>
      <div>
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1">
            <div className="px-4 sm:px-0">
              <h3 className="text-lg font-medium leading-6 text-gray-900">Profile</h3>
              <p className="mt-1 text-sm text-gray-600">
                This information will be displayed publicly so be careful what you share.
              </p>
            </div>
          </div>

          {/* Form */}
          <div className="mt-5 md:mt-0 md:col-span-2">
            <form>
              <div className="shadow sm:rounded-md sm:overflow-hidden">
                <div className="px-4 py-5 space-y-6 bg-white sm:p-6">
                  {/* Full Name */}
                  <div>
                    <label htmlFor="fullname" className="block text-sm font-medium text-gray-700">
                      Full Name
                    </label>
                    <div className="flex mt-1 rounded-md shadow-sm">
                      <input
                        type="text"
                        value={fullName}
                        onChange={handleChange}
                        name="fullName"
                        id="fullname"
                        className="flex-1 p-2 block w-full text-blue-600 border-gray-300 rounded-none focus:ring-indigo-500 rounded-r-md sm:text-sm"
                      />
                    </div>
                  </div>
                  {/* Email Contact */}
                  <div>
                    <label
                      htmlFor="emailContact"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Email Contact
                    </label>
                    <div className="flex mt-1 rounded-md shadow-sm">
                      <input
                        type="email"
                        name="emailContact"
                        value={emailContact}
                        onChange={handleChange}
                        id="emailContact"
                        className="flex-1 block w-full p-2 text-blue-600 border-gray-300 rounded-none focus:ring-indigo-500 rounded-r-md sm:text-sm"
                      />
                    </div>
                  </div>
                  {/* Address */}
                  <div>
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                      Address
                    </label>
                    <div className="flex mt-1 rounded-md shadow-sm">
                      <input
                        type="text"
                        name="address"
                        value={address}
                        onChange={handleChange}
                        id="address"
                        className="flex-1  p-2 block w-full text-blue-600 border-gray-300 rounded-none focus:ring-indigo-500 rounded-r-md sm:text-sm"
                      />
                    </div>
                  </div>
                  {/* Phone number */}
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                      Phone Number
                    </label>
                    <div className="flex mt-1 rounded-md shadow-sm">
                      <input
                        type="text"
                        name="phone"
                        value={phone}
                        onChange={handleChange}
                        id="phone"
                        className="flex-1  p-2 block w-full text-blue-600 border-gray-300 rounded-none focus:ring-indigo-500 rounded-r-md sm:text-sm"
                      />
                    </div>
                  </div>
                  {/* website */}
                  <div>
                    <label htmlFor="website" className="block text-sm font-medium text-gray-700">
                      Website
                    </label>
                    <div className="flex mt-1 rounded-md shadow-sm">
                      <input
                        type="text"
                        name="website"
                        value={website}
                        onChange={handleChange}
                        id="website"
                        className="flex-1 p-2 block w-full text-blue-600 border-gray-300 rounded-none focus:ring-indigo-500 focus:border-indigo-500 rounded-r-md sm:text-sm"
                        placeholder="www.example.com"
                      />
                    </div>
                  </div>
                  {/* About */}
                  <div>
                    <label htmlFor="about" className="block text-sm font-medium text-gray-700">
                      About
                    </label>
                    <div className="mt-1">
                      <textarea
                        id="about"
                        name="about"
                        value={about}
                        onChange={handleChange}
                        rows={5}
                        className="block w-full p-2 mt-1 text-blue-600 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        placeholder="Brief description for your profile."
                      />
                    </div>
                  </div>
                </div>

                {/* Button */}
                <div className="px-4 py-3 text-right bg-gray-50 sm:px-6">
                  <button
                    type="submit"
                    onClick={handleSubmit}
                    disabled={loading}
                    className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    {loading ? 'Loading...' : 'Save'}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="hidden sm:block" aria-hidden="true">
        <div className="py-5">
          <div className="border-t border-gray-200" />
        </div>
      </div>
    </div>
  );
};

export default ProfileForm;
