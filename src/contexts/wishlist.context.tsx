import React, { createContext, useContext, useEffect, useState } from "react";

import ProviderPropsType from "../types/ProviderPropsType";
import { useAxiosPrivateContext } from "./axiosPrivate.context";
import { handleError } from "utils/displayError";
import { showToastSuccessMessage } from "utils/toastMessage";
import { UserContext } from "./user.context";
import ProductType from "types/ProductType";

type WishlistContextValueType = {
    wishlist: ProductType[] | null
    addToWishlist: (item: any) => any
    removeFromWishlist: (item: any) => any
    wishlistInitialState: () => void
    wishlistCount: number | null
    setWishlist: React.Dispatch<React.SetStateAction<ProductType[] | null>>
    getWishlist: () => any
}

const INITIAL_CONTEXT_VALUE = {
    wishlist: null,
    addToWishlist: () => { },
    removeFromWishlist: () => { },
    wishlistInitialState: () => { },
    wishlistCount: null,
    setWishlist: () => { },
    getWishlist: () => { },
}

export const WishlistContext = createContext<WishlistContextValueType>(INITIAL_CONTEXT_VALUE)

export const WishlistProvider = ({ children }: ProviderPropsType) => {
    const [wishlist, setWishlist] = useState<ProductType[] | null>(null)
    const wishlistCount = wishlist ? wishlist.length : null
    const { accessToken } = useContext(UserContext)
    const { axiosPrivate } = useAxiosPrivateContext()

    useEffect(() => {
        getWishlist()
    }, [accessToken])

    const getWishlist = async () => {
        if (accessToken && !wishlist) {
            (async () => {
                try {
                    const { data, status } = await axiosPrivate.get('wishlist')
                    if (status === 200) {
                        setWishlist(data.data)
                    }
                } catch (error) {
                    handleError(error)
                }
            })()
        }
    }

    const addToWishlist = async (item: string) => {
        try {
            const { data, status } = await axiosPrivate.post('wishlist', {
                productId: item
            })
            if (status === 201 || status === 200) {
                console.log(data)
                setWishlist(prev => prev ? [...prev, data.data] : data.data)
                showToastSuccessMessage(data.message)
            }
        } catch (error) {
            handleError(error)
        }
    }

    const removeFromWishlist = async (item: string) => {
        try {
            const { data, status } = await axiosPrivate.patch('wishlist', {
                productId: item
            })
            if (status === 200) {
                setWishlist(data.items)
                showToastSuccessMessage(data.message)
            }
        } catch (error) {
            handleError(error)
        }
    }

    const wishlistInitialState = () => {
        setWishlist(null)
    }

    const value = {
        wishlist,
        addToWishlist,
        removeFromWishlist,
        wishlistCount,
        wishlistInitialState,
        setWishlist,
        getWishlist,
    }
    return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>
}