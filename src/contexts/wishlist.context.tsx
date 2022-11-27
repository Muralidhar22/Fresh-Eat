import { createContext, useContext, useReducer, useEffect } from "react";

import { ProviderPropsType } from "../types/ProviderPropsType";
import { UserContext } from "./user.context";
import { showToastErrorMessage } from "utils/toastMessage";
import WishlistType from "types/WishlistType";
import wishlistReducer from "reducers/wishlist/wishlist.reducer"
import { createAction } from "utils/reducer/createAction";
import WISHLIST_ACTION_TYPE from "reducers/wishlist/wishlistActionType";
import axios from "axios";

type WishlistContextValueType = {
    wishlist: string[]
    addToWishlist: (item: any) => any
    removeFromWishlist: (item: any) => any
    wishlistInitialState: () => void
    wishlistCount: number
}

const INITIAL_STATE_VALUE = {
    wishlist: [],
    INITIAL_FETCH: true
}

const INITIAL_CONTEXT_VALUE = {
    wishlist: [],
    addToWishlist: () => { },
    removeFromWishlist: () => { },
    wishlistInitialState: () => { },
    wishlistCount: 0
}

const fetchAddToWishlist = async (item: string) => {
    const { data, status } = await axios.post('wishlist', {
        productId: item
    })
    return { data, status };
}

const fetchRemoveFromWishlist = async (item: string) => {
    const { data, status } = await axios.patch('wishlist', {
        productId: item
    })
    return { data, status };
}

export const WishlistContext = createContext<WishlistContextValueType>(INITIAL_CONTEXT_VALUE)

export const WishlistProvider = ({ children }: ProviderPropsType) => {
    const [{ wishlist, INITIAL_FETCH }, dispatch] = useReducer(wishlistReducer, INITIAL_STATE_VALUE)
    const wishlistCount = wishlist.length


    // useEffect(() => {
    //     if (accessToken && INITIAL_FETCH) {
    //         const getWishlist = async (accessToken: string) => {
    //             const response = await fetch(WISHLIST_API, {
    //                 method: 'GET',
    //                 headers: {
    //                     'Authorization': `Bearer ${accessToken}`
    //                 },
    //             })
    //             const result: any = await response.json();
    //             if (response.status === 200) {
    //                 dispatch(createAction(WISHLIST_ACTION_TYPE.SET_WISHLIST, result.items))
    //                 dispatch(createAction(WISHLIST_ACTION_TYPE.SET_INITIAL_FETCH, false))
    //             } else if (response.status === 403) {
    //                 const newAccessToken = await accessForbiddenHandler()
    //                 getWishlist(newAccessToken)
    //             } else {
    //                 showToastErrorMessage(result.message)
    //             }
    //         }
    //         getWishlist(accessToken)
    //     }
    // }, [accessToken])

    const addToWishlist = async (item: string) => {
        // const response = await fetchAddToWishlist(accessToken, item)
        // if (response.status === 403) {
        //     const newAccessToken = await accessForbiddenHandler()
        //     const   = await fetchAddToWishlist(newAccessToken, item)
        //     const result: any = await response.json()
        //     if (response.status === 201) {
        //         dispatch(createAction(WISHLIST_ACTION_TYPE.SET_WISHLIST, result.items))
        //     } else {
        //         showToastErrorMessage(result.message)
        //     }
        // } else if (response.status === 201) {
        //     const result: WishlistType = await response.json()
        //     dispatch(createAction(WISHLIST_ACTION_TYPE.SET_WISHLIST, result.items))
        // }
    }

    const removeFromWishlist = async (item: string) => {
        // const response = await fetchRemoveFromWishlist(accessToken, item)
        // if (response.status === 403) {
        //     const newAccessToken = await accessForbiddenHandler()
        //     const response = await fetchRemoveFromWishlist(newAccessToken, item)
        //     const result: any = await response.json()
        //     if (response.status === 201) {
        //         dispatch(createAction(WISHLIST_ACTION_TYPE.SET_WISHLIST, result.items))
        //     } else {
        //         showToastErrorMessage(result.message)
        //     }
        // } else if (response.status === 201) {
        //     const result: WishlistType = await response.json()
        //     dispatch(createAction(WISHLIST_ACTION_TYPE.SET_WISHLIST, result.items))
        // }
    }

    const wishlistInitialState = () => {
        dispatch(createAction(WISHLIST_ACTION_TYPE.SET_INITIAL_STATE, INITIAL_STATE_VALUE))
    }

    const value = {
        wishlist,
        addToWishlist,
        removeFromWishlist,
        wishlistCount,
        wishlistInitialState
    }
    return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>
}