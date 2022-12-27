import { FC, useContext, useEffect } from "react";
import { Link } from "react-router-dom";

import { ProductContext } from "../../../contexts/products.context";
import ProductType from "../../../types/ProductType";
import { getFilteredProducts, getSortedProducts } from "utils/filterProducts";
import { FilterContext } from "contexts/filter.context";
import ProductCard from "../product-card/ProductCard";

import styles from "./ProductsListing.styles.module.css";

const ProductsListing = () => {
    const { products, getProducts } = useContext(ProductContext)
    const { filtersState } = useContext(FilterContext)
    const sortedProducts = products && getSortedProducts(products, filtersState.sortBy)
    const filteredProducts = sortedProducts && getFilteredProducts(sortedProducts, filtersState)


    useEffect(() => {
        getProducts()
    }, [])

    return (
        <div className={styles['products-list-container']}>
            {filteredProducts ?
                filteredProducts.map((product: ProductType) => (
                    <ProductCard key={product._id} product={product} />
                ))
                : null
            }
        </div >
    )
}

export default ProductsListing;