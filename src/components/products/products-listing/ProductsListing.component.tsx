import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import { ProductContext } from "../../../contexts/products.context";
import ProductType from "../../../types/ProductType";
import CartButton from "../../cart-button/cartButton.component";
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
        <div className={styles.productsListContainer}>
            {filteredProducts ?
                filteredProducts.map((product: ProductType) => (
                    <div className={styles.productContainer} key={product._id}>
                        <div className={styles.productImg}>
                            <Link to={`/products/${product._id}`}>
                                <img loading="lazy" src={product.media[0].source} alt={product.name} />
                            </Link>
                        </div>
                        <div className={styles.productContainerInfo}>
                            <div className="flex jc-space-btwn">
                                <h3>{product.brand}</h3>
                                <span className="cursor-pointer">
                                    <WishlistButton
                                        wishlistElementType="icon"
                                        productId={product._id}
                                    />
                                </span>
                            </div>
                            <p className={styles.ProductName}>
                                {product.name}
                            </p>
                            <div>
                                <span>{product.discountPrice}</span>
                                <del><span className="sr-only" aria-label="old price"></span>{product.price}</del>
                                <span>({product.discount}% Off)</span>
                            </div>
                            <CartButton
                                wishlistElementType="button"
                                productId={product._id}
                            />

                        </div>
                    </div>
                ))
                : null
            }
        </div>
    )
}

export default ProductsListing;