import React, { useState, createContext, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import ProviderPropsType from '../types/ProviderPropsType';
import { handleError } from 'utils/displayError';
import { useAuthContext } from 'contexts/auth.context';
import { AddressType } from 'types/AddressType';

import { showToastSuccessMessage } from 'utils/toastMessage';

type UserInfoType = { firstName: string; lastName: string; address: AddressType[] };

export type UserContextValueType = {
      userSignInHandler: (email: string, password: string) => void;
      userInfo: UserInfoType | null;
      addNewAddress: (newAddress: AddressType) => void;
      updateAddress: (updatedAddress: AddressType) => void;
      deleteAddress: (addressId: string) => void;
      setUserInfo: React.Dispatch<React.SetStateAction<UserInfoType | null>>;
      userSignOutHandler: () => void;
      loading: boolean;
    }
  | undefined;

const UserContext = createContext<UserContextValueType>(undefined);

export const UserProvider = ({ children }: ProviderPropsType) => {
  const { useAxiosPrivate, clearPersist, signedIn, accessToken, setSignedIn, setAccessToken, clearAxiosInterceptors } =
    useAuthContext();
  const [userInfo, setUserInfo] = useState<UserInfoType | null>(null);
  const [loading, setLoading] = useState(false);
  const { axiosPrivate, requestInterceptor, responseInterceptor } = useAxiosPrivate();
  const navigate = useNavigate();

  useEffect(() => {
    return () => {
      clearAxiosInterceptors(responseInterceptor, requestInterceptor);
    };
  }, [clearAxiosInterceptors, requestInterceptor, responseInterceptor]);

  useEffect(() => {
    (async () => {
      if (accessToken && !userInfo) {
        try {
          const { data, status } = await axiosPrivate.get('user/details');
          if (status === 200) {
            setUserInfo(data.data.userInfo);
          }
        } catch (error) {
          handleError(error);
        }
      }
    })();
  }, [signedIn, accessToken, axiosPrivate, userInfo, clearPersist, navigate, setSignedIn]);

  const userSignInHandler = async (email: string, password: string) => {
    setLoading(true);
    try {
      const { data, status } = await axios({
        method: 'POST',
        url: 'user/auth',
        data: { email, password },
        withCredentials: true,
      });
      if (status === 200) {
        setSignedIn(true);
        showToastSuccessMessage(data.message);
        setAccessToken(data.data.accessToken);
        navigate('/');
      }
    } catch (error) {
      handleError(error);
    }
    setLoading(false);
  };

  const addNewAddress = async (newAddress: AddressType) => {
    try {
      const { data, status } = await axiosPrivate({
        url: 'user/address',
        method: 'POST',
        data: { ...newAddress },
      });
      if (status === 200) {
        setUserInfo((prev) =>
          prev
            ? {
                ...prev,
                address: [...data.data.address],
              }
            : prev,
        );
        showToastSuccessMessage(data.message);
      }
    } catch (error) {
      handleError(error);
    }
  };

  const updateAddress = async (updatedAddress: AddressType) => {
    try {
      const { data, status } = await axiosPrivate({
        url: 'user/address',
        method: 'PATCH',
        data: { ...updatedAddress },
      });
      if (status === 200) {
        showToastSuccessMessage(data.message);
        setUserInfo((prev) =>
          prev
            ? {
                ...prev,
                address: prev.address.map((option) => (option._id === data.data.updatedItem ? updatedAddress : option)),
              }
            : prev,
        );
      }
    } catch (error) {
      handleError(error);
    }
  };

  const deleteAddress = async (addressId: string) => {
    try {
      const { data, status } = await axiosPrivate({
        url: 'user/address',
        method: 'DELETE',
        data: { addressId },
      });
      if (status === 200) {
        showToastSuccessMessage(data.message);
        setUserInfo((prev) =>
          prev
            ? {
                ...prev,
                address: prev.address.filter((option) => option._id !== data.data.removedItem),
              }
            : prev,
        );
      }
    } catch (error) {
      handleError(error);
    }
  };

  const userSignOutHandler = async () => {
    try {
      const { data, status } = await axiosPrivate.get('logout');
      if (status === 200) {
        showToastSuccessMessage(data.message);
        clearPersist();
        setSignedIn(false);
        setUserInfo(null);
        setAccessToken(null);
        navigate('/');
      }
    } catch (error) {
      handleError(error);
    }
  };

  const value = {
    userSignInHandler,
    userInfo,
    addNewAddress,
    updateAddress,
    deleteAddress,
    setUserInfo,
    userSignOutHandler,
    loading,
  };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export function useUserContext() {
  const context = React.useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUserContext must be used within a UserProvider');
  }
  return context;
}
