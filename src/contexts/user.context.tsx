// import { LOGOUT_API, SIGNIN_API } from "constants/urls";
import React, { useState, createContext, useEffect, SetStateAction } from "react";
import { useNavigate } from "react-router-dom";
import { showToastSuccessMessage } from "utils/toastMessage";
import usePersist from "../hooks/usePersist";
import { ProviderPropsType } from "../types/ProviderPropsType";
import { showToastErrorMessage } from "utils/toastMessage";
import axios from "axios";
import { axiosPrivate } from "api/axios";

type UserInfoType = {
    firstname: string
    lastname: string
    address: []
}

export type UserContextValueType = {
    userSignoutHandler: () => void
    userSigninHandler: (email: string, password: string) => void
    username: string | null
    customerName: string | null
    userInfo: UserInfoType | null;
    signedIn: boolean
    setSignedIn: React.Dispatch<React.SetStateAction<boolean>>
    setAccessToken: React.Dispatch<React.SetStateAction<string>>
    accessToken: string | null
}

const INITIAL_CONTEXT_VALUE = {
    userSignoutHandler: () => { },
    userSigninHandler: () => { },
    username: null,
    customerName: null,
    userInfo: null,
    signedIn: false,
    setSignedIn: () => { },
    setAccessToken: () => { },
    accessToken: null
}

export const UserContext = createContext<UserContextValueType>(INITIAL_CONTEXT_VALUE);

export const UserProvider = ({ children }: ProviderPropsType) => {
    const [username, setUsername] = useState<string | null>(null)
    const [customerName, setCustomerName] = useState<string | null>(null)
    const [userInfo, setUserInfo] = useState<UserInfoType | null>(null)
    const [signedIn, setSignedIn] = useState(false)
    const [accessToken, setAccessToken] = useState("")

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
            axiosPrivate.defaults.headers.common['Authorization'] = `Bearer ${data.accessToken}`
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
        username,
        customerName,
        userInfo,
        signedIn,
        setSignedIn,
        accessToken,
        setAccessToken
    }
    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}