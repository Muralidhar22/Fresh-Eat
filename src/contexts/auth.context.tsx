import { createContext, useContext, useState, useEffect, useRef } from "react";
import axios from "axios";
import { AxiosInstance } from "axios";

import ProviderPropsType from "types/ProviderPropsType";
import { axiosPrivate } from "api/axios";
import usePersist from "hooks/usePersist";

import { showToastErrorMessage, showToastInfoMessage } from "utils/toastMessage";
import { handleError } from "utils/displayError";

type AuthContextType = {
    useAxiosPrivate: () => {
        axiosPrivate: AxiosInstance;
        responseInterceptor: number;
        requestInterceptor: number;
    }
    signedIn: boolean
    setSignedIn: React.Dispatch<React.SetStateAction<boolean>>
    accessToken: string | null
    setAccessToken: React.Dispatch<React.SetStateAction<string | null>>
    clearPersist: any
} | undefined

const AuthContext = createContext<AuthContextType>(undefined);

export const AuthProvider = ({ children }: ProviderPropsType) => {
    const [signedIn, setSignedIn, clearPersist] = usePersist()
    const [accessToken, setAccessToken] = useState<string | null>(null)
    const onMountRef = useRef(false)

    useEffect(() => {
        if (signedIn && !onMountRef.current) {
            (async function getInitialAccessToken() {
                try {
                    refresh()
                } catch (error) {
                    handleError(error);
                }
            })();
        }
        return () => {
            onMountRef.current = true
        }
    }, [])

    const refresh = async () => {
        try {
            const { data } = await axios.get('refresh', {
                withCredentials: true
            })
            setAccessToken(data.data.accessToken)
            return data.data.accessToken;
        } catch (err) {
            showToastInfoMessage("SignIn again to continue.")
            showToastErrorMessage("Seems like your session expired!")
            setSignedIn(false)
        }
    }

    const useAxiosPrivate = () => {
        const requestInterceptor = axiosPrivate.interceptors.request.use(
            config => {
                if (config.headers && !config.headers['Authorization']) {
                    config.headers['Authorization'] = `Bearer ${accessToken}`;
                }
                return config;
            }, (error) => Promise.reject(error)
        );

        const responseInterceptor = axiosPrivate.interceptors.response.use(
            response => response,
            async (error) => {
                const prevRequest = error?.config;
                if (error?.response?.status === 403 && !prevRequest?.sent) {
                    let newAccessToken;
                    prevRequest.sent = true;
                    newAccessToken = await refresh()
                    prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`
                    return axiosPrivate(prevRequest);
                }
                return Promise.reject(error);
            }
        );

        return { axiosPrivate, responseInterceptor, requestInterceptor };
    }

    const value = {
        useAxiosPrivate,
        accessToken,
        setAccessToken,
        signedIn,
        setSignedIn,
        clearPersist
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuthContext() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuthContext must be used within a useAuthContext')
    }
    return context;
}