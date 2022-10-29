import WISHLIST_ACTION_TYPE from "reducers/wishlist/wishlistActionType"

type ReducerActionType = {
    type: any
    payload?: any
}

const wishlistReducer = (state: string[], action: ReducerActionType) => {
    const { type, payload } = action
    console.log("wishlist payload", payload)
    switch (type) {
        case WISHLIST_ACTION_TYPE.SET_WISHLIST:
            return payload;
        default:
            return state;
    }
}

export default wishlistReducer;