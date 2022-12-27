import React, { createContext, useState, useContext, useEffect } from "react";

import { ProviderPropsType } from "../types/ProviderPropsType";
import useAxiosPrivate from "hooks/useAxiosPrivate";
import { showToastSuccessMessage } from "utils/toastMessage";
import { handleError } from "utils/displayError";
import { ProductContext } from "./products.context";
import { UserContext } from "./user.context";
import ProductType from "types/ProductType";

type CartListType = { product: ProductType, count: number }[]

type CartContextValueType = {
    cartList: CartListType | null
    cartListCount: number | null
    addToCart: (item: any) => void,
    removeFromCart: (item: any) => void,
    increaseItemQty: (item: any) => void,
    decreaseItemQty: (item: any) => void,
    cartInitialState: () => string,
    cartLoader: boolean
    getCartTotal: () => number | null
    setCartList: React.Dispatch<React.SetStateAction<CartListType | null>>
    getCartList: () => void
}
const INITIAL_CONTEXT_VALUE = {
    cartList: null,
    cartListCount: null,
    addToCart: () => { },
    removeFromCart: () => { },
    increaseItemQty: () => { },
    decreaseItemQty: () => { },
    cartInitialState: () => { return " " },
    cartLoader: false,
    setCartList: () => { },
    getCartTotal: () => { return null },
    getCartList: () => { },
}

export const CartContext = createContext<CartContextValueType>(INITIAL_CONTEXT_VALUE)

export const CartProvider = ({ children }: ProviderPropsType) => {
    const [cartList, setCartList] = useState<CartListType | null>(null)
    const cartListCount = cartList ? cartList.length : null
    const [cartLoader, setCartLoader] = useState(false)
    const { products } = useContext(ProductContext)
    const axiosPrivate = useAxiosPrivate()
    const { signedIn } = useContext(UserContext)

    useEffect(() => {
        getCartList()
    }, [signedIn])

    const getCartList = () => {
        if (signedIn && !cartList) {
            (async () => {
                try {
                    const { data, status } = await axiosPrivate.get('cart')
                    if (status === 200) {
                        setCartList(data.items)
                    }
                } catch (error) {
                    handleError(error)
                }
            }
            )()
        }
    }

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
            const itemToUpdate = cartList.find((cartItem) => cartItem.product._id === item)
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
            const itemToUpdate = cartList.find((cartItem) => cartItem.product._id === item)
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
        return "set to initial cart state";
    }

    const getCartTotal = () => {
        let cartAmount;
        if (cartList && products) {
            cartAmount = cartList?.reduce((prevValue, currentItem) => {
                const itemDetails = products?.find(product => product._id === currentItem.product._id)
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
        setCartList,
        getCartList,
    }

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}