import CART_ACTION_TYPE from "./cartActionType"
import CartActionType from "types/reducer/cart/ActionType";

type CartStateType = {
    cartlist: {
        productId: string
        count: number
    }[]
    INITIAL_FETCH: boolean
}

type ReducerAction = {
    type: CartActionType
    payload: any
}

const cartReducer = (state: CartStateType, action: ReducerAction) => {
    const { type, payload } = action
    switch (type) {
        case CART_ACTION_TYPE.SET_CART_LIST:
            return { ...state, cartlist: payload }
        case CART_ACTION_TYPE.SET_INITIAL_STATE:
            return { ...payload }
        case CART_ACTION_TYPE.SET_INITIAL_FETCH:
            return { ...state, INITIAL_FETCH: payload }
        default:
            return state
    }
}

export default cartReducer;