import React, { useState, createContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { ProviderPropsType } from "../types/ProviderPropsType";

import { showToastErrorMessage } from "utils/toastMessage";
import { showToastSuccessMessage } from "utils/toastMessage";

export type UserContextValueType = {
    userSignoutHandler: () => void
    userSigninHandler: (email: string, password: string) => void
    signedIn: boolean
    setSignedIn: React.Dispatch<React.SetStateAction<boolean>>
    setAccessToken: React.Dispatch<React.SetStateAction<string | null>>
    accessToken: string | null
}

const INITIAL_CONTEXT_VALUE: UserContextValueType = {
    userSignoutHandler: () => { },
    userSigninHandler: () => { },
    signedIn: false,
    setSignedIn: () => { },
    setAccessToken: () => { },
    accessToken: null
}

export const UserContext = createContext<UserContextValueType>(INITIAL_CONTEXT_VALUE);

export const UserProvider = ({ children }: ProviderPropsType) => {
    const [signedIn, setSignedIn] = useState(false)
    const [accessToken, setAccessToken] = useState<string | null>(null)

    const navigate = useNavigate()

    const userSignoutHandler = async () => {
        await axios.get('logout', { withCredentials: true })
        setSignedIn(false)
        navigate('/')
        showToastSuccessMessage(`Logged Out!, visit again to shop more`)
    }

    const userSigninHandler = async (email: string, password: string) => {
        try {
            const { data, status } = await axios.post('user/auth', {
                email, password
            }, { withCredentials: true })
            setSignedIn(true)
            showToastSuccessMessage(data.message)
            axios.defaults.headers.common['Authorization'] = `Bearer ${data.accessToken}`
            navigate('/')
        } catch (err) {
            showToastErrorMessage(`${err}`)
        }
        // const result = await response.json();
        // console.log(data)
        // if (status === (401 || 400)) {
        //     (`Something went wrong`)
        // }
        //         else if (status === 200) {

        //     setSignedIn(true)
        //     showToastSuccessMessage(data.message)
        // } else {
        //     console.log(status)
        //     showToastErrorMessage(`uh Oh! Something went wrong`)
        // }
    }

    const value = {
        userSigninHandler,
        userSignoutHandler,
        signedIn,
        setSignedIn,
        accessToken,
        setAccessToken
    }
    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}