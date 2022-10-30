import { useContext } from "react";

import { UserContext } from "contexts/user.context";
import { CartContext } from "contexts/cart.context";

import { FaShoppingCart } from "react-icons/fa";

type CartButtonPropsType = {
    wishlistElementType: "button" | "nav-icon"
    productId?: string
}

const CartButton = ({ productId, wishlistElementType }: CartButtonPropsType) => {
    const { accessToken } = useContext(UserContext)
    const isCartItem = false

    if (wishlistElementType === 'nav-icon') {
        return (
            <FaShoppingCart />
        )
    } else if (wishlistElementType === 'button') {
        return (
            <>
                {
                    isCartItem
                        ? (
                            <button>
                                Remove From Cart
                            </button>
                        )
                        : (
                            <button>
                                Add to Cart
                            </button>
                        )
                }
            </>
        )
    } else {
        return null
    }
}

export default CartButton;