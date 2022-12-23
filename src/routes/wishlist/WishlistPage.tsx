import { useContext, useEffect } from "react";
import axios from "axios";

import { WishlistContext } from "contexts/wishlist.context";
import { ProductContext } from "contexts/products.context";
import { handleError } from "utils/displayError";
import useAxiosPrivate from "hooks/useAxiosPrivate";
import Navbar from "components/nav/Nav.component";

const WishlistPage = () => {
    const { wishlist, setWishlist } = useContext(WishlistContext);
    const { products } = useContext(ProductContext);
    const axiosPrivate = useAxiosPrivate()
    const wishlistProducts = (products && wishlist)
        ? wishlist.map(productId => {
            return products.find(product => product._id === productId)
        })
        : null

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
    }, [])

    if (products && wishlist && wishlistProducts) {
        return (
            <>
                <Navbar />
                <div>
                    {
                        wishlistProducts.map(item => {
                            return (
                                <div>
                                    <p>{item?.name}</p>
                                </div>)
                        })
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