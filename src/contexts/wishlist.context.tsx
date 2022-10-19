import { createContext, useContext, useState, useReducer } from "react";

import { ProviderPropsType } from "../types/ProviderPropsType";
import { UserContext } from "./user.context";
import { UserContextValueType } from "contexts/user.context";
import { useEffect } from "react";
import { WISHLIST_API } from "constants/urls";
import { WishlistType } from "types/WishlistType";
import wishlistReducer from "reducers/wishlist/wishlist.reducer";

type WishlistContextValueType = {
    wishlist: WishlistType
}

const INITIAL_STATE_VALUE = {
    _id: "",
    userId: "",
    items: []
}

const INITIAL_CONTEXT_VALUE = {
    wishlist: {} as WishlistType
}

const WishlistContext = createContext<WishlistContextValueType>(INITIAL_CONTEXT_VALUE)

export const WishlistProvider = ({ children }: ProviderPropsType) => {
    const [wishlist, dispatch] = useReducer(wishlistReducer, INITIAL_STATE_VALUE)
    const { accessToken } = useContext(UserContext) || {} as Partial<UserContextValueType>;
    useEffect(() => {
        const getWishlist = async () => {
            await fetch(WISHLIST_API, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json'
                }
            })
        }
        getWishlist()
    }, [])
    const value = {
        wishlist
    }
    return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>
}