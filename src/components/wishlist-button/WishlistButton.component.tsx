import { useContext, useEffect, useState } from "react";
import { WishlistContext } from "contexts/wishlist.context";
import { FaRegHeart, FaHeart } from "react-icons/fa";

type WishlistButtonPropsType = {
    wishlistElementType: "icon" | "button"
    productId: string
}

const WishlistButton = ({ wishlistElementType, productId }: WishlistButtonPropsType) => {
    const { wishlist, addToWishlist, removeFromWishlist } = useContext(WishlistContext)
    const isItemWishlist = wishlist.length > 0 && wishlist.includes(productId)

    if (wishlistElementType === "icon") {
        return (
            <>
                {
                    isItemWishlist ?
                        <FaHeart color="red"
                            onClick={() => removeFromWishlist(productId)}
                        /> :
                        <FaRegHeart
                            onClick={() => addToWishlist(productId)}
                        />
                }
            </>
        )
    }
    return (
        isItemWishlist
            ? (
                <button onClick={() => removeFromWishlist(productId)}>
                    `Remove from Wishlist`
                </button>
            ) : (
                <button onClick={() => addToWishlist(productId)}>
                    `Add to Wishlist`
                </button>
            )
    )
}

export default WishlistButton;