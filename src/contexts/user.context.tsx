import React, { useState, createContext } from "react";
import usePersist from "../hooks/usePersist";

type UserProviderPropsType = {
    children: React.ReactNode
}

type UserContextValueType = {
    accessToken: string | null
    signedIn: boolean
    setAccessToken: React.Dispatch<React.SetStateAction<string | null>>
    setSignedIn: React.Dispatch<React.SetStateAction<boolean>>
    userSignoutHandler: () => void
    userSigninHandler: (newAccessToken: string) => void
}

export const UserContext = createContext({} as UserContextValueType);

export const UserProvider = ({ children }: UserProviderPropsType) => {
    const [signedIn, setSignedIn] = useState(false)
    const [accessToken, setAccessToken, clearToken] = usePersist()

    const userSignoutHandler = () => {
        setSignedIn(false)
        clearToken()
    }
    const userSigninHandler = (newAccessToken: string) => {
        console.log("sign in handler:", newAccessToken)
        setSignedIn(true)
        setAccessToken(newAccessToken)
    }

    const value = {
        accessToken,
        setAccessToken,
        signedIn,
        setSignedIn,
        userSigninHandler,
        userSignoutHandler
    }
    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}