import { useEffect, useContext } from "react";

import ProductFilter from "../../components/products/product-filter/ProductFilter.component";
import ProductsListing from "../../components/products/products-listing/ProductsListing.component";
import Navbar from "components/nav/Nav.component";
import useAxiosPrivate from "hooks/useAxiosPrivate";
import { WishlistContext } from "contexts/wishlist.context";
import { CartContext } from "contexts/cart.context";
import { handleError } from "utils/displayError";

import styles from "./ShopPage.styles.module.css";


const ShopPage = () => {
    const axiosPrivate = useAxiosPrivate()
    const { wishlist, setWishlist } = useContext(WishlistContext);
    const { cartList, setCartList } = useContext(CartContext)

    useEffect(() => {
        if (!wishlist) {
            (async () => {
                try {
                    const { data, status } = await axiosPrivate.get('wishlist')
                    if (status === 200) {
                        setWishlist(data.items)
                    }
                } catch (error) {
                    handleError(error)
                }
            })()
        }
        if (!cartList) {
            (async () => {
                try {
                    const { data, status } = await axiosPrivate.get('cart')
                    if (status === 200) {
                        setCartList(data.items)
                    }
                } catch (error) {
                    handleError(error)
                }
            }
            )()
        }
    }, [])

    return (
        <>
            <Navbar />
            <div>
                <main className={styles['shop-page-main']}>
                    <div className={`flex ${styles['main-content']}`} style={{ "--gap": "1rem" } as React.CSSProperties}>
                        <ProductFilter />
                        <ProductsListing />
                    </div>
                </main>
            </div>
        </>
    )
}

export default ShopPage;