import React, { createContext, useState, useContext, useEffect } from "react";

import ProviderPropsType from "../types/ProviderPropsType";
import { useAuthContext } from "./auth.context";
import { showToastSuccessMessage } from "utils/toastMessage";
import { handleError } from "utils/displayError";
import ProductType from "types/ProductType";

type CartListType = { _id: string, product: ProductType, count: number }

type CartContextValueType = {
    cartList: CartListType[] | null
    cartListCount: number | null
    addToCart: (item: any) => void,
    removeFromCart: (item: any) => void,
    increaseItemQty: (item: any) => void,
    decreaseItemQty: (item: any) => void,
    cartLoader: boolean
    getCartTotal: () => number | null
    setCartList: React.Dispatch<React.SetStateAction<CartListType[] | null>>
    getCartList: () => void
}
const INITIAL_CONTEXT_VALUE = {
    cartList: null,
    cartListCount: null,
    addToCart: () => { },
    removeFromCart: () => { },
    increaseItemQty: () => { },
    decreaseItemQty: () => { },
    cartLoader: false,
    setCartList: () => { },
    getCartTotal: () => { return null },
    getCartList: () => { },
}

export const CartContext = createContext<CartContextValueType>(INITIAL_CONTEXT_VALUE)

export const CartProvider = ({ children }: ProviderPropsType) => {
    const [cartList, setCartList] = useState<CartListType[] | null>(null)
    const cartListCount = cartList ? cartList.length : null
    const [cartLoader, setCartLoader] = useState(false)
    const { useAxiosPrivate, signedIn, accessToken } = useAuthContext()
    const { axiosPrivate, requestInterceptor, responseInterceptor } = useAxiosPrivate()

    useEffect(() => {
        return () => {
            axiosPrivate.interceptors.request.eject(requestInterceptor)
            axiosPrivate.interceptors.response.eject(responseInterceptor)
        }
    }, [responseInterceptor, requestInterceptor])

    useEffect(() => {
        if (accessToken && !cartList) {
            getCartList()
        } else if (!signedIn) {
            setCartList(null)
        }
    }, [signedIn, accessToken])


    const getCartList = () => {
        (async () => {
            try {
                const { data, status } = await axiosPrivate.get('cart')
                if (status === 200) {
                    setCartList(data.data.items)
                }
            } catch (error) {
                handleError(error)
            }
        }
        )();
    }

    const addToCart = async (item: any) => {
        try {
            const { data, status } = await axiosPrivate.post('cart', { productId: item })
            if (status === 201 || status === 200) {
                showToastSuccessMessage(data.message)
                setCartList(prev => prev ? [...prev, data.data.addedItem] : [...data.data.addedItem])
            }
        } catch (error) {
            handleError(error)
        }
    }

    const removeFromCart = async (item: any) => {
        try {
            const { data, status } = await axiosPrivate({
                method: 'delete', url: 'cart', data: { cartItemId: item }
            })
            if (status === 200) {
                showToastSuccessMessage(data.message)
                setCartList(prev => prev ? prev.filter(cartItem => cartItem._id !== data.data.removedItem) : prev)
            }
        } catch (error) {
            handleError(error)
        }
    }

    const increaseItemQty = async (item: any) => {
        setCartLoader(true)
        if (cartList) {
            const itemToUpdate = cartList.find((cartItem) => cartItem._id === item)
            try {
                if (itemToUpdate) {
                    const { data, status } = await axiosPrivate.patch('cart', {
                        ...itemToUpdate,
                        count: itemToUpdate.count + 1
                    })
                    if (status === 200) {
                        setCartList(prev => (
                            prev ?
                                prev.map(cartItem => cartItem._id === data.data.updatedItem
                                    ? { ...cartItem, count: cartItem.count + 1 }
                                    : cartItem) : prev))
                        showToastSuccessMessage(data.message)
                    }
                }
            } catch (error) {
                handleError(error);
            }

        }
        setCartLoader(false)
    }

    const decreaseItemQty = async (item: any) => {
        setCartLoader(true)
        if (cartList) {
            const itemToUpdate = cartList.find((cartItem) => cartItem._id === item)
            if (itemToUpdate && itemToUpdate.count === 1) removeFromCart(item)
            else {
                try {
                    if (itemToUpdate) {
                        const { data, status } = await axiosPrivate.patch('cart', {
                            ...itemToUpdate,
                            count: itemToUpdate.count - 1
                        })
                        if (status === 200) {
                            setCartList(prev => (
                                prev ?
                                    prev.map(cartItem => cartItem._id === data.data.updatedItem
                                        ? { ...cartItem, count: cartItem.count - 1 }
                                        : cartItem) : null))
                            showToastSuccessMessage(data.message)
                        }
                    }
                } catch (error) {
                    handleError(error);
                }
            }
        }
        setCartLoader(false)
    }

    const getCartTotal = () => {
        let cartAmount;
        if (cartList) {
            cartAmount = cartList.reduce((prevValue, currentItem) => {
                return (prevValue + currentItem.product.discountPrice * currentItem.count)
            }, 0)
            return cartAmount
        }
        return null
    }

    const value = {
        cartList,
        cartListCount,
        addToCart,
        removeFromCart,
        increaseItemQty,
        decreaseItemQty,
        cartLoader,
        getCartTotal,
        setCartList,
        getCartList,
    }

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCartContext() {
    const context = React.useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCartContext must be used within a CartProvider')
    }
    return context;
}