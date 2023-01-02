import React, { createContext, useEffect, useState } from "react";

import ProviderPropsType from "../types/ProviderPropsType";
import { useAuthContext } from "./auth.context";
import { handleError } from "utils/displayError";
import ProductType from "types/ProductType";

import { showToastSuccessMessage } from "utils/toastMessage";

type WishlistContextValueType = {
    wishlist: ProductType[] | null
    addToWishlist: (item: any) => any
    removeFromWishlist: (item: any) => any
    wishlistCount: number | null
    setWishlist: React.Dispatch<React.SetStateAction<ProductType[] | null>>
    getWishlist: () => any
}

const INITIAL_CONTEXT_VALUE = {
    wishlist: null,
    addToWishlist: () => { },
    removeFromWishlist: () => { },
    wishlistCount: null,
    setWishlist: () => { },
    getWishlist: () => { },
}

export const WishlistContext = createContext<WishlistContextValueType>(INITIAL_CONTEXT_VALUE)

export const WishlistProvider = ({ children }: ProviderPropsType) => {
    const [wishlist, setWishlist] = useState<ProductType[] | null>(null)
    const wishlistCount = wishlist ? wishlist.length : null
    const { useAxiosPrivate, signedIn } = useAuthContext()
    const { axiosPrivate, requestInterceptor, responseInterceptor } = useAxiosPrivate()

    useEffect(() => {
        return () => {
            axiosPrivate.interceptors.request.eject(requestInterceptor)
            axiosPrivate.interceptors.response.eject(responseInterceptor)
        }
    }, [requestInterceptor, responseInterceptor])

    useEffect(() => {
        if (signedIn && !wishlist) {
            getWishlist()
        } else if (!signedIn) {
            setWishlist(null)
        }
    }, [signedIn])

    const getWishlist = async () => {
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

    const addToWishlist = async (item: string) => {
        try {
            const { data, status } = await axiosPrivate.post('wishlist', {
                productId: item
            })
            if (status === 201 || status === 200) {
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
                setWishlist(prev => (
                    prev
                        ? prev.filter(cartItem => cartItem._id !== data.removedItem)
                        : prev
                ))
                showToastSuccessMessage(data.message)
            }
        } catch (error) {
            handleError(error)
        }
    }

    const value = {
        wishlist,
        addToWishlist,
        removeFromWishlist,
        wishlistCount,
        setWishlist,
        getWishlist,
    }
    return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>
}

export function useWishlistContext() {
    const context = React.useContext(WishlistContext);
    if (context === undefined) {
        throw new Error('useWishlistContext must be used within a WishlistProvider')
    }
    return context;
}