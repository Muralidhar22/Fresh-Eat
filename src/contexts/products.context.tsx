import { useState, createContext, useContext, useEffect, useReducer } from "react";

import { ProviderPropsType } from "../types/ProviderPropsType";
import { GET_PRODUCTS_API } from "../constants/urls";
import ProductType from "../types/ProductType";
import PRODUCT_ACTION_TYPE from "../reducers/products/productActionType";
import ActionType from "../types/reducer/products/ActionType";
import { FilterContext } from "./filter.context";
// import { getNewFilteredProducts } from "../utils/getNewFilteredProducts";


export type ProductContextValueType = {
    products: ProductType[]
    filteredProducts: ProductType[]
    handleProductFilterChange: () => void
}
const DEFAULT_CONTEXT_VALUE = {
    products: [],
    filteredProducts: [],
    handleProductFilterChange: async () => { }
}
type ReducerActionType = {
    type: ActionType
    payload: any
}

export const ProductContext = createContext<ProductContextValueType>(DEFAULT_CONTEXT_VALUE);

const productsFilterReducer = (state: ProductType[], action: ReducerActionType) => {
    const { type, payload } = action
    switch (type) {
        case PRODUCT_ACTION_TYPE.UPDATE_PRODUCTS_LIST:
            return [...payload]
        case PRODUCT_ACTION_TYPE.SET_PRODUCTS_FILTER:
            return [...state, payload]
        case PRODUCT_ACTION_TYPE.CLEAR_PRODUCTS_FILTER:
            return [...payload]
        default:
            return state;
    }
}


export const ProductProvider = ({ children }: ProviderPropsType) => {
    const [products, setProducts] = useState([] as ProductType[]);
    const [filteredProducts, setFilteredProducts] = useState(products)

    useEffect(() => {
        const getProducts = async () => {
            const response = await fetch(GET_PRODUCTS_API)
            const result = await response.json()
            setProducts(result)
        }
        getProducts()
    }, [])

    useEffect(() => {
        setFilteredProducts(products)
    }, [products])

    const handleProductFilterChange = () => {


    }
    const value = {
        products,
        filteredProducts,
        handleProductFilterChange
    }
    return <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
}