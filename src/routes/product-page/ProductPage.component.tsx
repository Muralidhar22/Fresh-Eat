import { useContext } from "react";
import { useParams } from "react-router-dom";

import { ProductContext } from "../../contexts/products.context";
import ProductCarousel from "../../components/products/product-carousel/ProductCarousel.component";
import ProductInfo from "../../components/products/product-info/ProductInfo.component";

import styles from "./ProductPage.styles.module.css";

const ProductPage = () => {
    const { products } = useContext(ProductContext)
    const { productId } = useParams()
    const [product] = products.filter(product => product._id === productId)
    return (
        <div className={styles.productContainer}>
            <div className={styles.productImg}>
                <img src={product.media[0].source} alt={product.name} />
            </div>
            <div className={styles.productInfo}>
                <ProductInfo
                    product={product}
                />
            </div>
        </div>
    )
}

export default ProductPage;