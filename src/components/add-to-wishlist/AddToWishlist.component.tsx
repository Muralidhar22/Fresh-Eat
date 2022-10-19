import { FaRegHeart } from "react-icons/fa";

type AddToWishlistPropsType = {
    wishlistElementType: "icon" | "button"
    productId: any
}

const AddToWishlist = ({ wishlistElementType, productId }: AddToWishlistPropsType) => {
    if (wishlistElementType === "icon") {
        return (
            <FaRegHeart />

        )
    }
    return (
        <button>Add To Wishlist</button>
    )
}

export default AddToWishlist;