import useAxiosPrivate from "hooks/useAxiosPrivate";
import { useState, createContext, useContext } from "react";
import ProviderPropsType from "types/ProviderPropsType";
import { useUserContext } from "./user.context";
import { AxiosInstance } from "axios";
import useRefreshToken from "hooks/useRefreshToken";

type AxiosPrivateContextProps = {
    axiosPrivate: AxiosInstance
} | undefined

const AxiosPrivateContext = createContext<AxiosPrivateContextProps>(undefined)

export const AxiosPrivateProvider = ({ children }: ProviderPropsType) => {
    const { accessToken, setAccessToken } = useUserContext()
    const refresh = useRefreshToken(setAccessToken)
    const axiosPrivate = useAxiosPrivate(accessToken, refresh)
    const value = { axiosPrivate }

    console.log(accessToken, setAccessToken)

    return <AxiosPrivateContext.Provider value={value}>{children}</AxiosPrivateContext.Provider>
}

export const useAxiosPrivateContext = () => {
    const context = useContext(AxiosPrivateContext);
    if (context === undefined) {
        throw new Error('useAxiosPrivateContext must be used within a AxiosPrivateProvider')
    }
    return context;
}