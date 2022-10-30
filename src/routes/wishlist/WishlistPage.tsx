import { useContext } from "react";

import { WishlistContext } from "contexts/wishlist.context";
import { ProductContext } from "contexts/products.context";

const WishlistPage = () => {
    const { wishlist } = useContext(WishlistContext);
    const { products } = useContext(ProductContext);
    const wishlistProducts = wishlist?.map(productId => {
        return products.find(product => product._id === productId)
    })

    return (
        <div>
            {
                wishlist && wishlist.length !== 0 ?
                    wishlistProducts.map(item => {
                        return (
                            <div>
                                <p>{item?.name}</p>
                            </div>)
                    })
                    : `No wishlist items...`
            }
        </div>
    )
}

export default WishlistPage;