import { useContext } from "react";
import { WishlistContext } from "contexts/wishlist.context";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { useAuthContext } from "contexts/auth.context";

type WishlistButtonPropsType = {
    wishlistElementType: "icon" | "button" | "nav-icon"
    productId?: string
    className?: string
}

const WishlistButton = ({ wishlistElementType, productId, className }: WishlistButtonPropsType) => {
    const { wishlist, addToWishlist, removeFromWishlist, wishlistCount } = useContext(WishlistContext)
    const { signedIn } = useAuthContext()
    const isWishlistItem = wishlist?.find((item) => item._id === productId)

    if (wishlistElementType === "icon") {
        return (
            <>
                {
                    isWishlistItem ?
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
        isWishlistItem
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