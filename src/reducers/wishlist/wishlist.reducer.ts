import { WishlistType } from "types/WishlistType"


type ReducerActionType = {
    type: any
    payload?: any
}

const wishlistReducer = (state: WishlistType, action: ReducerActionType) => {
    const { type, payload } = action
    switch (type) {
        default:
            return state
    }
}

export default wishlistReducer;