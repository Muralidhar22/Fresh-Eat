import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import ProviderPropsType from "../types/ProviderPropsType";
import { OrderType } from "types/OrderType";
import { useUserContext } from "./user.context";
import { useAuthContext } from "./auth.context";
import { useCartContext } from "./cart.context";
import { formatDate, formatTime } from "utils/dateTimeFormat";
import { handleError } from "utils/displayError";

type OrderContextType = {
    orders: OrderType[] | null
    addNewOrder: (orderAmount: number) => any
    getOrders: () => any
    updateOrderStatus: (orderStatus: string, orderId: string) => any
    setOrders: React.Dispatch<React.SetStateAction<any>>
}

const INITIAL_CONTEXT_VALUE = {
    addNewOrder: () => { return },
    orders: null,
    getOrders: () => { },
    updateOrderStatus: () => { },
    setOrders: () => { }
}

const OrdersContext = createContext<OrderContextType>(INITIAL_CONTEXT_VALUE)

export const OrdersProvider = ({ children }: ProviderPropsType) => {
    const [orders, setOrders] = useState<OrderType[] | null>(null)
    const { cartList, clearCartList } = useCartContext()
    const { userInfo } = useUserContext()
    const { useAxiosPrivate } = useAuthContext()
    const { axiosPrivate, requestInterceptor, responseInterceptor } = useAxiosPrivate()
    const formattedDate = formatDate()
    const formattedTime = formatTime()
    const navigate = useNavigate()
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
                setOrders(data.data.orders)
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
            if (status === 200) {
                console.log("new order", data)
                await clearCartList()
                return data.data.addedItem
            }
        } catch (error) {
            navigate('/cart');
            handleError(error)
        }
    }

    const updateOrderStatus = async (orderStatus: string, orderId: string) => {
        try {
            await axiosPrivate({
                url: 'orders',
                method: 'PATCH',
                params: { status: orderStatus },
                data: { orderId }
            })
        } catch (error) {
            handleError(error);
        }

    }

    const value = {
        orders,
        setOrders,
        getOrders,
        addNewOrder,
        updateOrderStatus
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
