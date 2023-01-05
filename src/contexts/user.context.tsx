import React, { useState, createContext, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import ProviderPropsType from "../types/ProviderPropsType";
import { handleError } from "utils/displayError";
import { useAuthContext } from "contexts/auth.context"
import { AddressType } from "types/AddressType";

import { showToastSuccessMessage } from "utils/toastMessage";

export type UserContextValueType = {
    userSignOutHandler: () => void
    userSignInHandler: (email: string, password: string) => void
    userInfo: { firstName: string, lastName: string, address: AddressType[] } | null
    addNewAddress: (newAddress: AddressType) => void
    updateAddress: (updatedAddress: AddressType) => void
    deleteAddress: (addressId: string) => void
}

const INITIAL_CONTEXT_VALUE: UserContextValueType = {
    userSignOutHandler: () => { },
    userSignInHandler: () => { },
    userInfo: null,
    addNewAddress: () => { },
    updateAddress: () => { },
    deleteAddress: () => { }
}

export const UserContext = createContext<UserContextValueType>(INITIAL_CONTEXT_VALUE);

export const UserProvider = ({ children }: ProviderPropsType) => {
    const { useAxiosPrivate, clearPersist, signedIn, accessToken, setSignedIn, setAccessToken } = useAuthContext()
    const [userInfo, setUserInfo] = useState(null)
    const navigate = useNavigate()
    const { axiosPrivate } = useAxiosPrivate()

    useEffect(() => {
        if (accessToken && !userInfo) {
            (async () => {
                try {
                    const { data, status } = await axiosPrivate.get('user/details')
                    if (status === 200) {
                        setUserInfo(data.data.userInfo)
                    }
                } catch (error) {
                    handleError(error)
                }
            }
            )();
        } else if (!signedIn) {
            userSignOutHandler()
        }
    }, [signedIn, accessToken])

    const userSignOutHandler = async () => {
        try {
            const { data, status } = await axiosPrivate.get('logout')
            if (status === 200) {
                showToastSuccessMessage(data.message)
            }
        } catch (error) {
            handleError(error)
        }
        clearPersist()
        setSignedIn(false)
        setUserInfo(null)
        navigate('/')
    }

    const userSignInHandler = async (email: string, password: string) => {
        try {
            const { data, status } = await axios({
                method: 'POST',
                url: 'user/auth',
                data: { email, password },
                withCredentials: true
            })
            if (status === 200) {
                setSignedIn(true)
                showToastSuccessMessage(data.message)
                setAccessToken(data.data.accessToken)
                navigate('/')
            }
        } catch (error) {
            handleError(error)
        }
    }

    const addNewAddress = async (newAddress: AddressType) => {
        try {
            const { data, status } = await axiosPrivate({
                url: 'user/address',
                method: 'POST',
                data: { ...newAddress }
            })

        } catch (error) {
            handleError(error)
        }
    }

    const updateAddress = async (updatedAddress: AddressType) => {
        try {
            const { data, status } = await axiosPrivate({
                url: 'user/address',
                method: 'PATCH',
                data: { ...updatedAddress }
            })
        } catch (error) {
            handleError(error)
        }
    }

    const deleteAddress = async (addressId: string) => {
        try {
            const { data, status } = await axiosPrivate({
                url: 'user/address',
                method: 'DELETE',
                data: { addressId }
            })
        } catch (error) {
            handleError(error)
        }
    }

    const value = {
        userSignInHandler,
        userSignOutHandler,
        userInfo,
        addNewAddress,
        updateAddress,
        deleteAddress
    }
    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

export function useUserContext() {
    const context = React.useContext(UserContext);
    if (context === undefined) {
        throw new Error('useUserContext must be used within a UserProvider')
    }
    return context;
}
