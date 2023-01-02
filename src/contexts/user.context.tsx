import React, { useState, createContext, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import ProviderPropsType from "../types/ProviderPropsType";
import { axiosPrivate } from "api/axios";
import { handleError } from "utils/displayError";
import { useAuthContext } from "contexts/auth.context"

import { showToastSuccessMessage } from "utils/toastMessage";

export type AddressType =
    {
        name: string
        country: string
        line1: string
        city: string
        state: string
        postalCode: string
        addressType: string
        isDeliveryAddress: boolean
    }

export type UserContextValueType = {
    userSignOutHandler: () => void
    userSignInHandler: (email: string, password: string) => void
    userInfo: { firstName: string, lastName: string, address: AddressType[] } | null
}

const INITIAL_CONTEXT_VALUE: UserContextValueType = {
    userSignOutHandler: () => { },
    userSignInHandler: () => { },
    userInfo: null,
}

export const UserContext = createContext<UserContextValueType>(INITIAL_CONTEXT_VALUE);

export const UserProvider = ({ children }: ProviderPropsType) => {
    const { useAxiosPrivate, clearPersist, signedIn, setSignedIn, setAccessToken } = useAuthContext()
    const [userInfo, setUserInfo] = useState(null)
    const navigate = useNavigate()
    const { axiosPrivate } = useAxiosPrivate()

    useEffect(() => {
        if (signedIn && !userInfo) {
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
    }, [signedIn])

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

    const addNewAddress = () => {

    }

    const updateAddress = () => {

    }

    const value = {
        userSignInHandler,
        userSignOutHandler,
        userInfo,
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
