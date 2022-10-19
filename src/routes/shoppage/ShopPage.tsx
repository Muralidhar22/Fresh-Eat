import ProductFilter from "../../components/products/product-filter/ProductFilter.component";
import ProductsListing from "../../components/products/products-listing/ProductsListing.component";

import styles from "./ShopPage.styles.module.css";

const ShopPage = () => {
    return (
        <div>
            <main className={styles.ShopPage_main}>
                <ProductFilter />
                <ProductsListing />
            </main>
        </div>
    )
}

export default ShopPage;