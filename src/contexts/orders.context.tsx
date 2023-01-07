import { createContext, useContext, useState, useEffect } from "react";

import ProviderPropsType from "../types/ProviderPropsType";
import { useUserContext } from "./user.context";
import { useAuthContext } from "./auth.context";
import { useCartContext } from "./cart.context";
import { formatDate, formatTime } from "utils/dateTimeFormat";
import { handleError } from "utils/displayError";
import { redirect } from "react-router-dom";

type OrderContextType = {
    orders: any
    addNewOrder: (orderAmount: number) => any
    getOrders: () => any
}

const INITIAL_CONTEXT_VALUE = {
    addNewOrder: () => { return },
    orders: null,
    getOrders: () => { }
}

const OrdersContext = createContext<OrderContextType>(INITIAL_CONTEXT_VALUE)

export const OrdersProvider = ({ children }: ProviderPropsType) => {
    const [orders, setOrders] = useState()
    const { cartList } = useCartContext()
    const { userInfo } = useUserContext()
    const { useAxiosPrivate } = useAuthContext()
    const { axiosPrivate, requestInterceptor, responseInterceptor } = useAxiosPrivate()
    const formattedDate = formatDate()
    const formattedTime = formatTime()
    const deliveryAddress = userInfo?.address.find(userAddress => userAddress.isDeliveryAddress)

    useEffect(() => {
        return () => {
            axiosPrivate.interceptors.request.eject(requestInterceptor)
            axiosPrivate.interceptors.response.eject(responseInterceptor)
        }
    }, [requestInterceptor, responseInterceptor])

    const getOrders = async () => {
        try {
            const { data, status } = await axiosPrivate.get('orders')
            if (status === 200) {
                console.log("orders", data)
                // setOrders(data.data.)
            }

        } catch (error) {
        }
    }

    const addNewOrder = async (orderAmount: number) => {
        try {
            const { data, status } = await axiosPrivate.post('orders', {
                items: cartList,
                shippingAddress: { ...deliveryAddress },
                billingAddress: { ...deliveryAddress },
                amount: orderAmount,
                createdTime: formattedTime,
                createdDate: formattedDate
            })
            if (status === 201) {
                console.log(data)
            }
        } catch (error) {
            handleError(error)
            redirect('/cart')
            return null
        }
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
