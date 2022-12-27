import React, { useState, createContext, useRef, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { ProviderPropsType } from "../types/ProviderPropsType";
import usePersist from "hooks/usePersist";
import useAxiosPrivate from "hooks/useAxiosPrivate";

import { showToastErrorMessage } from "utils/toastMessage";
import { showToastSuccessMessage } from "utils/toastMessage";
import { handleError } from "utils/displayError";

export type UserContextValueType = {
    userSignOutHandler: () => void
    userSignInHandler: (email: string, password: string) => void
    signedIn: boolean
    accessToken: string | null
    setSignedIn: React.Dispatch<React.SetStateAction<boolean>>
    userInfo: { firstName: string, lastName: string, address: any } | null
    setAccessToken: React.Dispatch<React.SetStateAction<string | null>>
}

const INITIAL_CONTEXT_VALUE: UserContextValueType = {
    userSignOutHandler: () => { },
    userSignInHandler: () => { },
    signedIn: false,
    accessToken: null,
    setSignedIn: () => { },
    userInfo: null,
    setAccessToken: () => { }
}

export const UserContext = createContext<UserContextValueType>(INITIAL_CONTEXT_VALUE);

export const UserProvider = ({ children }: ProviderPropsType) => {
    const [signedIn, setSignedIn, clearPersist] = usePersist()
    const [accessToken, setAccessToken] = useState<string | null>(null)
    const [userInfo, setUserInfo] = useState(null)
    const navigate = useNavigate()
    const axiosPrivate = useAxiosPrivate()
    console.log("outside", accessToken)
    useEffect(() => {
        (async () => {
            console.log(userInfo, accessToken, "useEffect ran")
            if (accessToken && !userInfo) {
                try {
                    const { data, status } = await axiosPrivate.get('user/details')
                    if (status === 200) {
                        console.log("userinfo", userInfo)
                        setUserInfo(data.userInfo)
                    }
                } catch (error) {
                    handleError(error)
                }
            }
        }
        )();
        console.log("Access token useEffect ran", accessToken)
    }, [accessToken])

    const userSignOutHandler = async () => {
        await axios.get('logout')
        clearPersist()
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
            setAccessToken(data.accessToken)
            navigate('/')
        } catch (err) {
            showToastErrorMessage(`${err}`)
        }
    }

    const value = {
        userSignInHandler,
        userSignOutHandler,
        signedIn,
        setSignedIn,
        accessToken,
        setAccessToken,
        userInfo
    }
    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}