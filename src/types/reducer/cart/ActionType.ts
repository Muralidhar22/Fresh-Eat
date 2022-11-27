import CART_ACTION_TYPE from "reducers/cart/cartActionType";

type CartActionType = typeof CART_ACTION_TYPE.SET_CART_LIST | typeof CART_ACTION_TYPE.SET_INITIAL_STATE
    | typeof CART_ACTION_TYPE.SET_INITIAL_FETCH

export default CartActionType;