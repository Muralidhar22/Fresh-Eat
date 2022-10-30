import { LOGOUT_API } from "constants/urls";
import React, { useState, createContext } from "react";
import { useNavigate } from "react-router-dom";
import { showToastSuccessMessage } from "utils/toastMessage";
import usePersist from "../hooks/usePersist";
import { ProviderPropsType } from "../types/ProviderPropsType";

export type UserContextValueType = {
    accessToken: string | null
    setAccessToken: React.Dispatch<React.SetStateAction<any>>
    userSignoutHandler: () => void
    userSigninHandler: (newAccessToken: string) => void
}

const INITIAL_CONTEXT_VALUE = {
    accessToken: null,
    setAccessToken: () => { },
    userSignoutHandler: () => { },
    userSigninHandler: () => { }
}

export const UserContext = createContext<UserContextValueType>(INITIAL_CONTEXT_VALUE);

export const UserProvider = ({ children }: ProviderPropsType) => {
    const [accessToken, setAccessToken, clearToken] = usePersist()
    const navigate = useNavigate()

    const userSignoutHandler = () => {
        setAccessToken(null)
        clearToken()
        fetch(LOGOUT_API, {
            method: 'GET',
            credentials: 'include'
        })
        navigate('/')
        showToastSuccessMessage(`Logged Out!, visit again to shop more`)
    }

    const userSigninHandler = (newAccessToken: string) => {
        setAccessToken(newAccessToken)
    }

    const value = {
        accessToken,
        setAccessToken,
        userSigninHandler,
        userSignoutHandler
    }
    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}