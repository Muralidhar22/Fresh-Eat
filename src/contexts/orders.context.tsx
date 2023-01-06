import { createContext, useContext, useState, useEffect } from "react";

import ProviderPropsType from "../types/ProviderPropsType";
import { useUserContext } from "./user.context";
import { useAuthContext } from "./auth.context";

type OrderContextType = {
    addNewOrder: () => any
    orders: any
    getOrders: () => any
}

const INITIAL_CONTEXT_VALUE = {
    addNewOrder: () => { },
    orders: null,
    getOrders: () => { }
}

const OrdersContext = createContext<OrderContextType>(INITIAL_CONTEXT_VALUE)

export const OrdersProvider = ({ children }: ProviderPropsType) => {
    const [orders, setOrders] = useState()
    const { userInfo } = useUserContext()
    const { useAxiosPrivate } = useAuthContext()
    const { axiosPrivate, requestInterceptor, responseInterceptor } = useAxiosPrivate()
    const deliveryAddress = userInfo?.address.find(userAddress => userAddress.isDeliveryAddress)

    useEffect(() => {
        return () => {
            axiosPrivate.interceptors.request.eject(requestInterceptor)
            axiosPrivate.interceptors.response.eject(responseInterceptor)
        }
    }, [requestInterceptor, responseInterceptor])

    const getOrders = () => {

    }

    const addNewOrder = () => {

    }

    const value = {
        orders,
        getOrders,
        addNewOrder
    }
    return <OrdersContext.Provider value={value}>{children}</OrdersContext.Provider>
}

export function useOrdersContext() {
    const context = useContext(OrdersContext);
    if (context === undefined) {
        throw new Error('useOrdersContext must be used within a OrdersProvider')
    }
    return context;
}
