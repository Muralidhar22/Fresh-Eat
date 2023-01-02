import { createContext, useContext } from "react";
import axios from "axios";
import { AxiosInstance } from "axios";

import ProviderPropsType from "types/ProviderPropsType";
import { axiosPrivate } from "api/axios";

import { showToastErrorMessage, showToastInfoMessage } from "utils/toastMessage";

type AxiosPrivateContextType = {
    useAxiosPrivate: (accessToken: string | null, setAccessToken: React.Dispatch<React.SetStateAction<string | null>>, setSignedIn: React.Dispatch<React.SetStateAction<boolean>>) => {
        axiosPrivate: AxiosInstance;
        responseInterceptor: number;
        requestInterceptor: number;
    }
} | undefined

const AxiosPrivateContext = createContext<AxiosPrivateContextType>(undefined);

export const AxiosPrivateProvider = ({ children }: ProviderPropsType) => {
    const useAxiosPrivate = (
        accessToken: string | null,
        setAccessToken: React.Dispatch<React.SetStateAction<string | null>>,
        setSignedIn: React.Dispatch<React.SetStateAction<boolean>>) => {
        console.log("accessToken", accessToken)

        const refresh = async () => {
            try {
                const { data } = await axios.get('refresh', {
                    withCredentials: true
                })
                if (setAccessToken) {
                    setAccessToken(data.data.accessToken)
                }
                return data.data.accessToken;
            } catch (err) {
                setSignedIn(false)
                showToastErrorMessage("Seems like your session expired!")
                showToastInfoMessage("SignIn again to continue.")
            }
        }

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
    const value = { useAxiosPrivate }

    return < AxiosPrivateContext.Provider value={value} > {children}</AxiosPrivateContext.Provider>
}

export function useAxiosPrivateContext() {
    const context = useContext(AxiosPrivateContext);
    if (context === undefined) {
        throw new Error('useAxiosPrivateContext must be used within a useAxiosPrivateContext')
    }
    return context;
}