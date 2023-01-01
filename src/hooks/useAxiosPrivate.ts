import { useContext, useState, useEffect } from "react";

import { UserContext } from "contexts/user.context";
import useRefreshToken from "hooks/useRefreshToken";
import { axiosPrivate } from "api/axios";
import axios from "axios";
import { useUserContext } from "contexts/user.context";

const useAxiosPrivate = (accessToken: string | null, refresh: any) => {
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

    useEffect(() => {
        return () => {
            axiosPrivate.interceptors.request.eject(requestInterceptor)
            axiosPrivate.interceptors.response.eject(responseInterceptor)
        }
    }, [])
    return axiosPrivate;
}
export default useAxiosPrivate;
