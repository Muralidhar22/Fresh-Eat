import { useContext } from "react";
import { Link } from "react-router-dom";

import { ProductContext } from "../../../contexts/products.context";
import ProductType from "../../../types/ProductType";
import AddToCart from "../../add-to-cart/AddToCart.component";
import AddToWishlist from "../../add-to-wishlist/AddToWishlist.component";
import { getFilteredProducts, getSortedProducts } from "utils/filterProducts"

import styles from "./ProductsListing.styles.module.css";
import { FilterContext } from "contexts/filter.context";

const ProductsListing = () => {
    const { products } = useContext(ProductContext)
    const { filtersState } = useContext(FilterContext)

    const sortedProducts = getSortedProducts(products, filtersState.sortBy)
    const filteredProducts = getFilteredProducts(sortedProducts, filtersState)

    return (
        <div className={styles.ProductsListContainer}>
            {
                filteredProducts.map((product: ProductType) => (
                    <div className={styles.ProductContainer} key={product._id}>
                        <Link to={`/products/${product._id}`}>
                            <img loading="lazy" src={product.media[0].source} alt={product.name} />
                        </Link>
                        <h3>{product.brand}
                            <span className="cursor-pointer">
                                <AddToWishlist
                                    wishlistElementType="icon"
                                    productId={product._id}
                                />
                            </span></h3>
                        <p className={styles.ProductName}>
                            {product.name}
                        </p>
                        <div>
                            <span>{product.discountPrice}</span>
                            <del><span className="sr-only" aria-label="old price"></span>{product.price}</del>
                            <span>({product.discount}% Off)</span>
                        </div>
                        <AddToCart productId={product._id} />
                    </div>
                ))
            }
        </div>
    )
}

export default ProductsListing;