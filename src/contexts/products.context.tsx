import { useState, createContext, useContext } from "react";
import axios from "axios";

import { ProviderPropsType } from "types/ProviderPropsType";
import ProductType from "types/ProductType";
import { getFilteredProducts, getSortedProducts } from "utils/filterProducts";
import { FilterContext } from "contexts/filter.context";

type ProductContextValueType = {
    products: ProductType[]
    sortedProducts: ProductType[]
    filteredProducts: ProductType[]
    getProducts: () => {}
}

const DEFAULT_CONTEXT_VALUE = {
    products: null,
    sortedProducts: null,
    filteredProducts: null,
    getProducts: () => { }
}

export const ProductContext = createContext<ProductContextValueType>(DEFAULT_CONTEXT_VALUE);

export const ProductProvider = ({ children }: ProviderPropsType) => {
    const [products, setProducts] = useState<ProductType[] | null>(null);
    const { filtersState } = useContext(FilterContext)
    const sortedProducts = products && getSortedProducts(products, filtersState.sortBy)
    const filteredProducts = sortedProducts && getFilteredProducts(sortedProducts, filtersState)

    const getProducts = async () => {
        if (!products) {
            const { data, status } = await axios.get('products')
            if (status === 200) {
                setProducts(data)
                return data;
            }
        }
    }

    const value = {
        products,
        sortedProducts,
        filteredProducts,
        getProducts
    }
    return <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
}