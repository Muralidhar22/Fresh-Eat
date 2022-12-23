import React, { createContext, useState, useContext } from "react";

import { ProviderPropsType } from "../types/ProviderPropsType";
import useAxiosPrivate from "hooks/useAxiosPrivate";
import { showToastSuccessMessage } from "utils/toastMessage";
import { handleError } from "utils/displayError";
import { ProductContext } from "./products.context";

type CartListType =
    {
        productId: string
        count: number
    }

type CartContextValueType = {
    cartList: CartListType[] | null
    cartListCount: number | null
    addToCart: (item: any) => void,
    removeFromCart: (item: any) => void,
    increaseItemQty: (item: any) => void,
    decreaseItemQty: (item: any) => void,
    cartInitialState: () => void,
    cartLoader: boolean
    getCartTotal: () => number | null
    setCartList: React.Dispatch<React.SetStateAction<CartListType[] | null>>
}
const INITIAL_CONTEXT_VALUE = {
    cartList: null,
    cartListCount: null,
    addToCart: () => { },
    removeFromCart: () => { },
    increaseItemQty: () => { },
    decreaseItemQty: () => { },
    cartInitialState: () => { },
    cartLoader: false,
    setCartList: () => { },
    getCartTotal: () => { return null }
}

export const CartContext = createContext<CartContextValueType>(INITIAL_CONTEXT_VALUE)

export const CartProvider = ({ children }: ProviderPropsType) => {
    const [cartList, setCartList] = useState<CartListType[] | null>(null)
    const [cartListCount, setCartListCount] = useState<number | null>(null)
    const [cartLoader, setCartLoader] = useState(false)
    const { products } = useContext(ProductContext)
    const axiosPrivate = useAxiosPrivate()

    const addToCart = async (item: any) => {
        try {
            const { data, status } = await axiosPrivate.post('cart', { productId: item })
            if (status === 201) {
                showToastSuccessMessage(`Added to Cart!`)
                setCartList(data.items)
            }
        } catch (error) {
            handleError(error)
        }
    }

    const removeFromCart = async (item: any) => {
        try {
            const { data, status } = await axiosPrivate({
                method: 'delete', url: 'cart', data: { productId: item }
            })
            if (status === 200) {
                console.log(data, status)
                showToastSuccessMessage(`Removed from Cart!`)
                setCartList(data.items)
            }
        } catch (error) {
            handleError(error)
        }
    }

    const increaseItemQty = async (item: any) => {
        setCartLoader(true)
        if (cartList) {
            const itemToUpdate = cartList.find((cartItem) => cartItem.productId === item)
            try {
                if (itemToUpdate) {
                    const { data, status } = await axiosPrivate.patch('cart', {
                        ...itemToUpdate,
                        count: itemToUpdate.count + 1
                    })
                    console.log(data, status)
                    if (status === 200) {
                        setCartList(data.items)
                        showToastSuccessMessage(`Item quantity increased`)
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
            const itemToUpdate = cartList.find((cartItem: {
                productId: string
                count: number
            }) => cartItem.productId === item)
            if (itemToUpdate && itemToUpdate.count === 1) removeFromCart(item)
            else {
                try {
                    if (itemToUpdate) {
                        const { data, status } = await axiosPrivate.patch('cart', {
                            ...itemToUpdate,
                            count: itemToUpdate.count - 1
                        })
                        console.log(data, status)
                        if (status === 200) {
                            setCartList(data.items)
                            showToastSuccessMessage(`Item quantity increased`)
                        }
                    }
                } catch (error) {
                    handleError(error);
                }
            }
        }
        setCartLoader(false)
    }

    const cartInitialState = () => {
        setCartList(null)
    }

    const getCartTotal = () => {
        let cartAmount;
        if (cartList && products) {
            cartAmount = cartList?.reduce((prevValue, currentItem) => {
                const itemDetails = products?.find(product => product._id === currentItem.productId)
                if (itemDetails?.discountPrice) {
                    return (prevValue + itemDetails?.discountPrice * currentItem.count)
                } else {
                    return prevValue
                }
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
        cartInitialState,
        cartLoader,
        getCartTotal,
        setCartList
    }

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}