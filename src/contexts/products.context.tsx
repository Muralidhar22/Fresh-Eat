import { useState, createContext, useContext, useEffect, useReducer } from "react";

import { ProviderPropsType } from "types/ProviderPropsType";
import { GET_PRODUCTS_API } from "constants/urls";
import ProductType from "types/ProductType";

type ProductContextValueType = {
    products: ProductType[]
}
const DEFAULT_CONTEXT_VALUE = {
    products: [] as ProductType[],
}

export const ProductContext = createContext<ProductContextValueType>(DEFAULT_CONTEXT_VALUE);

export const ProductProvider = ({ children }: ProviderPropsType) => {
    const [products, setProducts] = useState([] as ProductType[]);

    useEffect(() => {
        const getProducts = async () => {
            const response = await fetch(GET_PRODUCTS_API)
            const result = await response.json()
            setProducts(result)
        }
        getProducts()
    }, [])

    const value = {
        products
    }
    return <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
}