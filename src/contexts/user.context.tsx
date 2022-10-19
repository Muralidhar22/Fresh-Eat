import React, { useState, createContext } from "react";
import usePersist from "../hooks/usePersist";
import { ProviderPropsType } from "../types/ProviderPropsType";

export type UserContextValueType = {
    accessToken: string | null
    setAccessToken: React.Dispatch<React.SetStateAction<string | null>>
    userSignoutHandler: () => void
    userSigninHandler: (newAccessToken: string) => void
}

export const UserContext = createContext<UserContextValueType | null>(null);

export const UserProvider = ({ children }: ProviderPropsType) => {
    const [accessToken, setAccessToken, clearToken] = usePersist()

    const userSignoutHandler = () => {
        clearToken()
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