import React, { useState, createContext, useRef, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import ProviderPropsType from "../types/ProviderPropsType";
import usePersist from "hooks/usePersist";
import { handleError } from "utils/displayError";

import { showToastSuccessMessage } from "utils/toastMessage";

type AddressType =
    {
        name: string
        country: string
        line1: string
        city: string
        state: string
        postalCode: string
        addressType: string
        isDeliveryAddress: boolean
    }[]

export type UserContextValueType = {
    userSignOutHandler: () => void
    userSignInHandler: (email: string, password: string) => void
    signedIn: boolean
    accessToken: string | null
    setSignedIn: React.Dispatch<React.SetStateAction<boolean>>
    userInfo: { firstName: string, lastName: string, address: AddressType } | null
    setAccessToken: React.Dispatch<React.SetStateAction<string | null>>
}

const INITIAL_CONTEXT_VALUE: UserContextValueType = {
    userSignOutHandler: () => { },
    userSignInHandler: () => { },
    signedIn: false,
    accessToken: null,
    setSignedIn: () => { },
    userInfo: null,
    setAccessToken: () => { },
}

export const UserContext = createContext<UserContextValueType>(INITIAL_CONTEXT_VALUE);

export const UserProvider = ({ children }: ProviderPropsType) => {
    const [signedIn, setSignedIn, clearPersist] = usePersist()
    const [userInfo, setUserInfo] = useState(null)
    const [accessToken, setAccessToken] = useState<string | null>(null)
    const navigate = useNavigate()

    useEffect(() => {
        (async () => {
            if (accessToken && !userInfo) {
                try {
                    const { data, status } = await axios({
                        method: 'get',
                        url: 'user/details',
                        headers: { 'Authorization': `Bearer ${accessToken}` }
                    })
                    if (status === 200) {
                        setUserInfo(data.data.userInfo)
                    }
                } catch (error) {
                    handleError(error)
                }
            }
        }
        )();
    }, [accessToken])

    const userSignOutHandler = async () => {
        await axios.get('logout')
        clearPersist()
        setSignedIn(false)
        setUserInfo(null)
        setAccessToken(null)
        navigate('/')
        showToastSuccessMessage(`Logged Out!, visit again to shop more`)
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

    const value = {
        userSignInHandler,
        userSignOutHandler,
        signedIn,
        setSignedIn,
        accessToken,
        setAccessToken,
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
