import PRODUCT_ACTION_TYPE from "../../../reducers/products/productActionType"

type ActionType = typeof PRODUCT_ACTION_TYPE.SET_PRODUCTS_FILTER | typeof PRODUCT_ACTION_TYPE.UPDATE_PRODUCTS_LIST | typeof PRODUCT_ACTION_TYPE.CLEAR_PRODUCTS_FILTER

export default ActionType;