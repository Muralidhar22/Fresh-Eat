import { useContext } from "react";
import { WishlistContext } from "contexts/wishlist.context";
import { ProductContext } from "contexts/products.context";

const WishlistPage = () => {
    const { wishlist } = useContext(WishlistContext);
    const { products } = useContext(ProductContext);

    const getProductDetails = (productId: any) => {
        const wishlistProduct = products.filter(product => product._id === productId)
        console.log(wishlistProduct)
    }

    return (
        <div>
            {
                wishlist.length !== 0 ?
                    wishlist.map(productId => {
                        const name = getProductDetails(productId)
                        return <span>{ }</span>
                    })
                    : `No wishlist items...`
            }

        </div>
    )
}

export default WishlistPage;