import { useContext, useEffect } from "react";

import { UserContext } from "contexts/user.context";
import useRefreshToken from "hooks/useRefreshToken";
import { axiosPrivate } from "api/axios";

const useAxiosPrivate = () => {
    const refresh = useRefreshToken()
    const { accessToken } = useContext(UserContext)

    useEffect(() => {
        const requestInterceptor = axiosPrivate.interceptors.request.use(
            config => {
                console.log(config.headers && config.headers['Authorization'], "Access", accessToken)
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
                    prevRequest.sent = true;
                    const newAccessToken = await refresh();
                    prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`
                    return axiosPrivate(prevRequest);
                }
                return Promise.reject(error);
            }
        );


        return () => {
            axiosPrivate.interceptors.request.eject(requestInterceptor)
            axiosPrivate.interceptors.response.eject(responseInterceptor)
        }
    }, [accessToken])
    return axiosPrivate;
}
export default useAxiosPrivate;
