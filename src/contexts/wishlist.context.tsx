import React, { createContext, useContext, useEffect, useState } from "react";

import { ProviderPropsType } from "../types/ProviderPropsType";
import useAxiosPrivate from "hooks/useAxiosPrivate";
import { handleError } from "utils/displayError";
import { showToastSuccessMessage } from "utils/toastMessage";
import { UserContext } from "./user.context";

type WishlistContextValueType = {
    wishlist: string[] | null
    addToWishlist: (item: any) => any
    removeFromWishlist: (item: any) => any
    wishlistInitialState: () => void
    wishlistCount: number | null
    setWishlist: React.Dispatch<React.SetStateAction<string[] | null>>
}

const INITIAL_CONTEXT_VALUE = {
    wishlist: null,
    addToWishlist: () => { },
    removeFromWishlist: () => { },
    wishlistInitialState: () => { },
    wishlistCount: null,
    setWishlist: () => { }
}

export const WishlistContext = createContext<WishlistContextValueType>(INITIAL_CONTEXT_VALUE)

export const WishlistProvider = ({ children }: ProviderPropsType) => {
    const [wishlist, setWishlist] = useState<string[] | null>(null)
    const wishlistCount = wishlist ? wishlist.length : null
    const axiosPrivate = useAxiosPrivate()
    const { signedIn } = useContext(UserContext)

    useEffect(() => {
        if (signedIn && !wishlist) {
            (async () => {
                try {
                    const { data, status } = await axiosPrivate.get('wishlist')
                    if (status === 200) {
                        setWishlist(data.items)
                    }
                } catch (error) {
                    handleError(error)
                }
            })()
        }
    }, [signedIn])

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
        setWishlist
    }
    return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>
}