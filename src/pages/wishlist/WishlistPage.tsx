import { useContext, useEffect } from "react";

import { WishlistContext } from "contexts/wishlist.context";
import Navbar from "components/nav/Nav.component";
import ProductCard from "components/products/product-card/ProductCard";

import styles from "./WishlistPage.styles.module.css";

const WishlistPage = () => {
    const { wishlist } = useContext(WishlistContext);
    if (wishlist) {
        return (
            <>
                <Navbar />
                <h1 className={styles['page-heading']}>Wish List</h1>
                <div className={styles['wishlist-container']}>
                    {
                        wishlist.map(item =>
                            item ? <ProductCard key={item._id} product={item} /> : null
                        )
                    }
                </div>
            </>
        )
    }
    return (
        <>
            <Navbar />
            <div>
                No Wishlist items
            </div>
        </>
    );

}

export default WishlistPage;