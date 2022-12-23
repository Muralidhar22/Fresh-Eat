import React, { createContext, useState } from "react";

import { ProviderPropsType } from "../types/ProviderPropsType";
import useAxiosPrivate from "hooks/useAxiosPrivate";
import { handleError } from "utils/displayError";
import { showToastSuccessMessage } from "utils/toastMessage";
import WishlistType from "types/WishlistType";

type WishlistContextValueType = {
    wishlist: WishlistType[] | null
    addToWishlist: (item: any) => any
    removeFromWishlist: (item: any) => any
    wishlistInitialState: () => void
    wishlistCount: number | null
    setWishlistCount: React.Dispatch<React.SetStateAction<number | null>>
    setWishlist: React.Dispatch<React.SetStateAction<WishlistType[] | null>>
}

const INITIAL_CONTEXT_VALUE = {
    wishlist: null,
    addToWishlist: () => { },
    removeFromWishlist: () => { },
    wishlistInitialState: () => { },
    wishlistCount: null,
    setWishlistCount: () => { },
    setWishlist: () => { }
}

export const WishlistContext = createContext<WishlistContextValueType>(INITIAL_CONTEXT_VALUE)

export const WishlistProvider = ({ children }: ProviderPropsType) => {
    const [wishlist, setWishlist] = useState<WishlistType[] | null>(null)
    const [wishlistCount, setWishlistCount] = useState<number | null>(null)
    const axiosPrivate = useAxiosPrivate()

    const addToWishlist = async (item: string) => {
        try {
            const { data, status } = await axiosPrivate.post('wishlist', {
                productId: item
            })
            if (status === 201) {
                setWishlist(data.items)
                showToastSuccessMessage(`Added to wishlist`)
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
            if (status === 201) {
                setWishlist(data.items)
                showToastSuccessMessage(`Removed from wishlist`)
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
        setWishlistCount,
        setWishlist
    }
    return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>
}