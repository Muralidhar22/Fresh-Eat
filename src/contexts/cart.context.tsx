import { createContext, useContext, useEffect, useReducer } from "react";

import { ProviderPropsType } from "../types/ProviderPropsType";
import { UserContext } from "./user.context";
import cartReducer from "reducers/cart/cart.reducer";
import getNewAccessToken from "utils/getNewAccessToken";
import { showToastErrorMessage } from "../utils/toastMessage";
import { CART_API } from "../constants/urls";

type CartContextValueType = {
    cartlist: {
        productId: string
        count: number
    }[]
    cartlistCount: number
}

const INITIAL_STATE_VALUE = {
    cartlist: [],
    INITIAL_FETCH: true
}

const INITIAL_CONTEXT_VALUE = {
    cartlist: [],
    cartlistCount: 0,
}


const fetchAddToCart = async () => {

}

const fetchRemoveFromCart = async () => {

}

const fetchIncreaseItemQty = async () => {

}
const fetchDecreaseItemQty = async () => {

}

export const CartContext = createContext<CartContextValueType>(INITIAL_CONTEXT_VALUE)

export const CartProvider = ({ children }: ProviderPropsType) => {
    const [{ cartlist, INITIAL_FETCH }, dispatch] = useReducer(cartReducer, INITIAL_STATE_VALUE)
    const { accessToken, setAccessToken } = useContext(UserContext);
    const cartlistCount = cartlist.length

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
        if (accessToken && INITIAL_FETCH) {
            const getCartlist = async (accessToken: string) => {
                const response = await fetch(CART_API, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${accessToken}`
                    },
                })
                const result: any = await response.json();
                if (response.status === 200) {

                } else if (response.status === 403) {
                    const newAccessToken = await accessForbiddenHandler()
                    getCartlist(newAccessToken)
                } else {
                    showToastErrorMessage(result.message)
                }
            }
            getCartlist(accessToken)
        }
    }, [accessToken])



    const addToCart = async (productId: string) => {

    }

    const removeFromCart = async (productId: string) => {

    }

    const changeCartItemQty = () => {

    }

    const increaseItemQty = async () => {

    }

    const decreaseItemQty = async () => {

    }

    const value = {
        cartlist,
        cartlistCount,
    }
    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}