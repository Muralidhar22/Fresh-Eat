import { createContext, useContext, useState, useEffect } from "react";

import { ProviderPropsType } from "../types/ProviderPropsType";
import { UserContext } from "./user.context";
import { WISHLIST_API } from "constants/urls";
import getNewAccessToken from "utils/getNewAccessToken";
import { showToastErrorMessage } from "utils/toastMessage";
import WishlistType from "types/WishlistType";

type WishlistContextValueType = {
    wishlist: string[]
    addToWishlist: (item: any) => any
    removeFromWishlist: (item: any) => any
}

const INITIAL_STATE_VALUE: string[] = []

const INITIAL_CONTEXT_VALUE = {
    wishlist: [],
    addToWishlist: () => { },
    removeFromWishlist: () => { }
}

export const WishlistContext = createContext<WishlistContextValueType>(INITIAL_CONTEXT_VALUE)

export const WishlistProvider = ({ children }: ProviderPropsType) => {
    const [wishlist, setWishlist] = useState(INITIAL_STATE_VALUE)
    const { accessToken, setAccessToken } = useContext(UserContext);
    const [initialFetch, setInitialFetch] = useState(true)
    const wishlistCount = wishlist.length

    const accessForbiddenHandler = async () => {
        const result = await getNewAccessToken()
        if (result.accessToken) {
            setAccessToken(result.accessToken)
            return result.accessToken;
        } else {
            showToastErrorMessage(result.message)
        }
    }

    useEffect(() => {
        if (accessToken && initialFetch) {
            const getWishlist = async (accessToken: string) => {
                const response = await fetch(WISHLIST_API, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${accessToken}`
                    },
                })
                console.log("hfjsbfkd")
                const result: WishlistType | any = await response.json();
                if (response.status === 200) {
                    setWishlist(result.items)
                    setInitialFetch(false)
                } else {
                    showToastErrorMessage(result.message)
                }
            }
            getWishlist(accessToken)
        } else if (accessToken === null) {
            setWishlist(INITIAL_STATE_VALUE)
        }
    }, [accessToken])

    const addItemtoWishlist = async (accessToken: any, item: string) => {
        const response = await fetch(WISHLIST_API, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                productId: item
            }),
        })
        return response;
    }

    const removeItemInWishlist = async (accessToken: any, item: string) => {
        const response = await fetch(WISHLIST_API, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                productId: item
            }),
        })
        return response;
    }

    const addToWishlist = async (item: string) => {
        const response = await addItemtoWishlist(accessToken, item)
        if (response.status === 403) {
            const newAccessToken = await accessForbiddenHandler()
            const response = await addItemtoWishlist(newAccessToken, item)
            const result: any = await response.json()
            if (response.status === 201) {
                setWishlist(result.items)
            } else {
                showToastErrorMessage(result.message)
            }
        } else if (response.status === 201) {
            const result: WishlistType = await response.json()
            setWishlist(result.items)
        }
    }

    const removeFromWishlist = async (item: string) => {
        const response = await removeItemInWishlist(accessToken, item)
        if (response.status === 403) {
            const newAccessToken = await accessForbiddenHandler()
            const response = await removeItemInWishlist(newAccessToken, item)
            const result: any = await response.json()
            if (response.status === 201) {
                setWishlist(result.items)
            } else {
                showToastErrorMessage(result.message)
            }
        } else if (response.status === 201) {
            const result: WishlistType = await response.json()
            setWishlist(result.items)
        }
    }


    const value = {
        wishlist,
        addToWishlist,
        removeFromWishlist
    }
    return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>
}