import { createContext, useContext, useEffect, useReducer } from "react";

import { ProviderPropsType } from "../types/ProviderPropsType";
import { UserContext } from "./user.context";
import { UserContextValueType } from "contexts/user.context";
import { WISHLIST_API } from "constants/urls";
import wishlistReducer from "reducers/wishlist/wishlist.reducer";
import getNewAccessToken from "utils/getNewAccessToken";
import { createAction } from "utils/reducer/createAction";
import WISHLIST_ACTION_TYPE from "reducers/wishlist/wishlistActionType";
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
    const [wishlist, dispatch] = useReducer(wishlistReducer, INITIAL_STATE_VALUE)
    const { accessToken, setAccessToken } = useContext(UserContext) || {} as Partial<UserContextValueType>;

    const accessForbiddenHandler = async () => {
        const result = await getNewAccessToken()
        if (result.accessToken) {
            setAccessToken && setAccessToken(result.accessToken)
            return result.accessToken;
        } else {
            showToastErrorMessage(result.message)
        }
    }

    useEffect(() => {
        if (accessToken && wishlist.length < 0) { // once user is authenticated display the wishlist items of the logged in user from database
            console.log("wishlist fetching", "access TOken:", accessToken)
            const getWishlist = async () => {
                const response = await fetch(WISHLIST_API, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${accessToken}`
                    }
                })
                const result: WishlistType = await response.json();
                if (response.status === 403) accessForbiddenHandler()
                else if (response.status === 200) {
                    dispatch(createAction(WISHLIST_ACTION_TYPE.SET_WISHLIST, result.items))
                }
            }
            getWishlist()
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
        console.log("Adding to wishlist", item)
        const response = await addItemtoWishlist(accessToken, item)
        if (response.status === 403) {
            const newAccessToken = await accessForbiddenHandler()
            addItemtoWishlist(newAccessToken, item)
        } else if (response.status === 201) {
            const result: WishlistType = await response.json()
            dispatch(createAction(WISHLIST_ACTION_TYPE.SET_WISHLIST, result.items))
        }
    }
    const removeFromWishlist = async (item: string) => {
        console.log("removing wishlist item", item)
        const response = await removeItemInWishlist(accessToken, item)
        if (response.status === 403) {
            const newAccessToken = await accessForbiddenHandler()
            removeItemInWishlist(newAccessToken, item)
        } else if (response.status === 201) {
            const result: WishlistType = await response.json()
            dispatch(createAction(WISHLIST_ACTION_TYPE.SET_WISHLIST, result.items))
        }
    }


    const value = {
        wishlist,
        addToWishlist,
        removeFromWishlist
    }
    return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>
}