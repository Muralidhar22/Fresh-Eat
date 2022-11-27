import { useContext, useEffect } from "react";
import { axiosPrivate } from "api/axios";

import { UserContext } from "contexts/user.context";
import { WishlistContext } from "contexts/wishlist.context";
import { CartContext } from "contexts/cart.context";
import useRefreshToken from "hooks/useRefreshToken";
import axios from "axios";

const useAxiosPrivate = () => {
    const refresh = useRefreshToken()
    const { accessToken } = useContext(UserContext)

    useEffect(() => {
        const requestIntercept = axiosPrivate.interceptors.request.use(
            config => {
                console.log(config, !config?.headers?.['Authorization'])
                if (!config?.headers?.['Authorization']) {
                    if (accessToken && config.headers) config.headers['Authorization']! = `Bearer ${accessToken}`;
                }
                return config;
            }, (error) => Promise.reject(error)
        );

        const responseIntercept = axiosPrivate.interceptors.response.use(
            response => response,
            async (error) => {
                const prevRequest = error?.config;
                if (error?.response?.status === 403 && !prevRequest?.sent) {
                    prevRequest.sent = true;
                    const newAccessToken: string = await refresh()

                    console.log("response in use axios", newAccessToken, `Bearer ${newAccessToken}`)

                    // axiosPrivate.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`
                    // console.log(axiosPrivate.defaults.headers)
                    // prevRequest.headers = { 'Authorization': `Bearer ${response?.data.accessToken}` }
                    // prevRequest.headers = JSON.parse(JSON.stringify(config.headers || {}))
                    prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                    return axiosPrivate(prevRequest);
                }
                console.log("Asdsad", error, error.config)
                return Promise.reject(error);
            }
        );

        return () => {
            axiosPrivate.interceptors.response.eject(responseIntercept);
            axiosPrivate.interceptors.request.eject(requestIntercept)
        }
    }, [])

    return axiosPrivate;
}

export default useAxiosPrivate;
