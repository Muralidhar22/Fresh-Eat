import WISHLIST_ACTION_TYPE from "./wishlistActionType";
import WishlistActionType from "types/reducer/wishlist/ActionType";

type WishlistStateType = {
    wishlist: string[]
    INITIAL_FETCH: boolean
}

type ReducerAction = {
    type: WishlistActionType
    payload: any
}

const wishlistReducer = (state: WishlistStateType, action: ReducerAction) => {
    const { type, payload } = action;
    switch (type) {
        case WISHLIST_ACTION_TYPE.SET_WISHLIST:
            return { ...state, wishlist: payload }
        case WISHLIST_ACTION_TYPE.SET_INITIAL_STATE:
            return { ...payload }
        case WISHLIST_ACTION_TYPE.SET_INITIAL_FETCH:
            return { ...state, INITIAL_FETCH: payload }
        default:
            return state
    }
}

export default wishlistReducer;