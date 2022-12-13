import { useContext } from "react";
import { WishlistContext } from "contexts/wishlist.context";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { UserContext } from "contexts/user.context";

type WishlistButtonPropsType = {
    wishlistElementType: "icon" | "button" | "nav-icon"
    productId?: string
    className?: string
}

const WishlistButton = ({ wishlistElementType, productId, className }: WishlistButtonPropsType) => {
    const { wishlist, addToWishlist, removeFromWishlist, wishlistCount } = useContext(WishlistContext)
    const isItemWishlist = (wishlist.length > 0 && productId) && wishlist.includes(productId)
    const { signedIn } = useContext(UserContext)

    if (wishlistElementType === "icon") {
        return (
            <>
                {
                    isItemWishlist ?
                        <FaHeart
                            className={className}
                            color="red"
                            onClick={() => removeFromWishlist(productId)}
                        /> :
                        <FaRegHeart
                            className={className}
                            onClick={() => addToWishlist(productId)}
                        />
                }
            </>
        )
    } else if (wishlistElementType === 'nav-icon') {
        return (
            <>
                <FaRegHeart />
                {signedIn && <span>{wishlistCount}</span>}
            </>
        )
    }
    return (
        isItemWishlist
            ? (
                <button className={className} onClick={() => removeFromWishlist(productId)}>
                    Remove from Wishlist
                </button>
            ) : (
                <button className={className} onClick={() => addToWishlist(productId)}>
                    Add to Wishlist
                </button>
            )
    )
}

export default WishlistButton;