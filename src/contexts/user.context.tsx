import React, { useState, createContext, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { ProviderPropsType } from "../types/ProviderPropsType";

import { showToastErrorMessage } from "utils/toastMessage";
import { showToastSuccessMessage } from "utils/toastMessage";
import useAxiosPrivate from "hooks/useAxiosPrivate";

export type UserContextValueType = {
    userSignOutHandler: () => void
    userSignInHandler: (email: string, password: string) => void
    signedIn: boolean
    accessTokenRef: React.MutableRefObject<string | null>
    setSignedIn: React.Dispatch<React.SetStateAction<boolean>>
}

const INITIAL_CONTEXT_VALUE: UserContextValueType = {
    userSignOutHandler: () => { },
    userSignInHandler: () => { },
    signedIn: false,
    accessTokenRef: { current: null },
    setSignedIn: () => { }
}

export const UserContext = createContext<UserContextValueType>(INITIAL_CONTEXT_VALUE);

export const UserProvider = ({ children }: ProviderPropsType) => {
    const [signedIn, setSignedIn] = useState(false)
    const accessTokenRef = useRef<string | null>(null)
    const axiosPrivate = useAxiosPrivate()

    const navigate = useNavigate()

    const userSignOutHandler = async () => {
        await axiosPrivate.get('logout')
        setSignedIn(false)
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
            setSignedIn(true)
            showToastSuccessMessage(data.message)
            accessTokenRef.current = data.accessToken
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
        userSignInHandler,
        userSignOutHandler,
        signedIn,
        setSignedIn,
        accessTokenRef
    }
    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}