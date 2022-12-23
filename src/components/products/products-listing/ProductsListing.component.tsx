import { FC, useContext, useEffect } from "react";
import { Link } from "react-router-dom";

import { ProductContext } from "../../../contexts/products.context";
import ProductType from "../../../types/ProductType";
import WishlistButton from "components/wishlist-button/WishlistButton.component";
import { getFilteredProducts, getSortedProducts } from "utils/filterProducts";
import { FilterContext } from "contexts/filter.context";

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
                    <div className={styles['product-container']} key={product._id}>
                        <div className={styles['product-image-container']}>
                            <Link to={`/products/${product._id}`}>
                                <img loading="lazy" className={styles['product-image']} src={product.media[0].source} alt={product.name} />
                            </Link>
                        </div>
                        <div className={styles['product-container-info']}>
                            <div className="flex jc-space-btwn">
                                <h3>{product.brand}</h3>
                                <span className="cursor-pointer">
                                    <WishlistButton
                                        wishlistElementType="icon"
                                        productId={product._id}
                                    />
                                </span>
                            </div>
                            <p className={styles['product-name']}>
                                {product.name}
                            </p>
                            <div className={styles['price-container']}>
                                <span>{product.discountPrice} &#8377;</span>
                                <del><span className="sr-only" aria-label="old price"></span>{product.price}</del>
                            </div>
                        </div>
                        <span className={styles['discount-percent']}>-{product.discount}%</span>
                    </div>
                ))
                : null
            }
        </div >
    )
}

export default ProductsListing;