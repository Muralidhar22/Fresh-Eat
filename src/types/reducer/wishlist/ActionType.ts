import WISHLIST_ACTION_TYPE from "reducers/wishlist/wishlistActionType";

type WishlistActionType = typeof WISHLIST_ACTION_TYPE.SET_INITIAL_FETCH |
    typeof WISHLIST_ACTION_TYPE.SET_INITIAL_STATE |
    typeof WISHLIST_ACTION_TYPE.SET_WISHLIST

export default WishlistActionType;