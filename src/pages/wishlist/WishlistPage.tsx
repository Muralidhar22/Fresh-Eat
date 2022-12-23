import { useContext } from "react";

import { WishlistContext } from "contexts/wishlist.context";
import { ProductContext } from "contexts/products.context";
import Navbar from "components/nav/Nav.component";

const WishlistPage = () => {
    const { wishlist } = useContext(WishlistContext);
    const { products } = useContext(ProductContext);
    const wishlistProducts = (products && wishlist)
        ? wishlist.map(productId => {
            return products.find(product => product._id === productId)
        })
        : null

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