import { useContext, useEffect } from "react";
import axios from "axios";

import { UserContext } from "contexts/user.context";
import { WishlistContext } from "contexts/wishlist.context";
import { CartContext } from "contexts/cart.context";
import useRefreshToken from "hooks/useRefreshToken";
import { axiosPrivate } from "api/axios";

const useAxiosPrivate = () => {
    const refresh = useRefreshToken()
    const { accessTokenRef } = useContext(UserContext)

    axiosPrivate.interceptors.request.use(
        config => {
            if (config.headers) config.headers['Authorization'] = `Bearer ${accessTokenRef.current}`;
            return config;
        }, (error) => Promise.reject(error)
    );

    axiosPrivate.interceptors.response.use(
        response => response,
        async (error) => {
            const prevRequest = error?.config;
            if (error?.response?.status === 403 && !prevRequest?.sent) {
                prevRequest.sent = true;
                await refresh();
                return axiosPrivate(prevRequest);
            }
            return Promise.reject(error);
        }
    );

    return axiosPrivate;
}
export default useAxiosPrivate;
