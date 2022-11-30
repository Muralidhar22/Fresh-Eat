import { createContext, useReducer, useState } from "react";

import { ProviderPropsType } from "../types/ProviderPropsType";
import cartReducer from "reducers/cart/cart.reducer";
import { createAction } from "utils/reducer/createAction";
import CART_ACTION_TYPE from "reducers/cart/cartActionType";

type CartContextValueType = {
    cartlist: {
        productId: string
        count: number
    }[]
    cartlistCount: number
    addToCart: (item: any) => void,
    removeFromCart: (item: any) => void,
    increaseItemQty: (item: any) => void,
    decreaseItemQty: (item: any) => void,
    cartInitialState: () => void,
    cartLoader: boolean
}

const INITIAL_STATE_VALUE = {
    cartlist: [],
    INITIAL_FETCH: true
}

const INITIAL_CONTEXT_VALUE = {
    cartlist: [],
    cartlistCount: 0,
    addToCart: () => { },
    removeFromCart: () => { },
    increaseItemQty: () => { },
    decreaseItemQty: () => { },
    cartInitialState: () => { },
    cartLoader: false
}


const fetchAddToCart = async (accessToken: any, item: string) => {
    // const { data, status } = await axios.post('cart', { productItem: item })
    // return { data, status };
}

const fetchRemoveFromCart = async (accessToken: any, item: string) => {
    // const { data, status } = await axios({
    //     method: 'delete', url: 'cart', data: {
    //         productId: item
    //     }
    // })
    // return { data, status };
}

const fetchChangeItemQty = async (accessToken: any, cartItem: string) => {
    // const { data, status } = await axios.patch('cart', {
    //     cartItem
    // })
    // return { data, status };
}

export const CartContext = createContext<CartContextValueType>(INITIAL_CONTEXT_VALUE)

export const CartProvider = ({ children }: ProviderPropsType) => {
    const [{ cartlist, INITIAL_FETCH }, dispatch] = useReducer(cartReducer, INITIAL_STATE_VALUE)
    // const { accessToken, setAccessToken } = useContext(UserContext);
    const cartlistCount = cartlist.length
    const [cartLoader, setCartLoader] = useState(false)



    // useEffect(() => {
    //     if (accessToken && INITIAL_FETCH) {
    //         const getCartlist = async (accessToken: string) => {
    //             const response = await fetch(CART_API, {
    //                 method: 'GET',
    //                 headers: {
    //                     'Authorization': `Bearer ${accessToken}`
    //                 },
    //             })
    //             const result: any = await response.json();
    //             if (response.status === 200) {
    //                 dispatch(createAction(CART_ACTION_TYPE.SET_CART_LIST, result.items))
    //                 dispatch(createAction(CART_ACTION_TYPE.SET_INITIAL_FETCH, false))
    //             } else if (response.status === 403) {
    //                 const newAccessToken = await accessForbiddenHandler()
    //                 getCartlist(newAccessToken)
    //             } else {
    //                 showToastErrorMessage(result.message)
    //             }
    //         }
    //         getCartlist(accessToken)
    //     }
    // }, [accessToken])



    const addToCart = async (item: any) => {
        // const response = await fetchAddToCart(accessToken, item)
        // if (response.status === 403) {
        //     const newAccessToken = await accessForbiddenHandler()
        //     const response = await fetchAddToCart(newAccessToken, item)
        //     const result: any = await response.json()
        //     if (response.status === 201) {
        //         showToastSuccessMessage(`Added to Cart!`)
        //         dispatch(createAction(CART_ACTION_TYPE.SET_CART_LIST, result.items))
        //     } else {
        //         showToastErrorMessage(result.message)
        //     }
        // } else if (response.status === 201) {
        //     showToastSuccessMessage(`Added to Cart!`)
        //     const result: CartType = await response.json()
        //     dispatch(createAction(CART_ACTION_TYPE.SET_CART_LIST, result.items))
        // }
    }

    const removeFromCart = async (item: any) => {
        // const response = await fetchRemoveFromCart(accessToken, item)
        // if (response.status === 403) {
        //     const newAccessToken = await accessForbiddenHandler()
        //     const response = await fetchRemoveFromCart(newAccessToken, item)
        //     const result: any = await response.json()
        //     if (response.status === 200) {
        //         showToastSuccessMessage(`Removed from Cart!`)
        //         dispatch(createAction(CART_ACTION_TYPE.SET_CART_LIST, result.items))
        //     } else {
        //         showToastErrorMessage(result.message)
        //     }
        // } else if (response.status === 200) {
        //     const result: CartType = await response.json()
        //     dispatch(createAction(CART_ACTION_TYPE.SET_CART_LIST, result.items))
        // }
    }

    const increaseItemQty = async (item: any) => {
        // setCartLoader(true)
        // const itemToUpdate = cartlist.find((cartItem: {
        //     productId: string
        //     count: number
        // }) => cartItem.productId === item)
        // const response = await fetchChangeItemQty(accessToken, { ...itemToUpdate, count: itemToUpdate.count + 1 })
        // setCartLoader(false)
        // if (response.status === 200) {
        //     const result: CartType = await response.json()
        //     dispatch(createAction(CART_ACTION_TYPE.SET_CART_LIST, result.items))
        // } else if (response.status === 403) {
        //     const newAccessToken = await accessForbiddenHandler()
        //     const response = await fetchChangeItemQty(newAccessToken, { ...itemToUpdate, count: itemToUpdate.count + 1 })
        //     const result: any = await response.json()
        //     if (response.status === 200) {
        //         dispatch(createAction(CART_ACTION_TYPE.SET_CART_LIST, result.items))
        //     } else {
        //         showToastErrorMessage(result.message)
        //     }
        // } else {
        //     const result: any = await response.json()
        //     showToastErrorMessage(result.message)
        // }
    }

    const decreaseItemQty = async (item: any) => {
        // s
    }

    const cartInitialState = () => {
        dispatch(createAction(CART_ACTION_TYPE.SET_INITIAL_STATE, INITIAL_STATE_VALUE))
    }

    const value = {
        cartlist,
        cartlistCount,
        addToCart,
        removeFromCart,
        increaseItemQty,
        decreaseItemQty,
        cartInitialState,
        cartLoader
    }

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}