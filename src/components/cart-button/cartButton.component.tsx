import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { UserContext } from "contexts/user.context";
import { CartContext } from "contexts/cart.context";

import { FaShoppingCart } from "react-icons/fa";
import { showToastErrorMessage } from "utils/toastMessage";

type CartButtonPropsType = {
    wishlistElementType: "button" | "nav-icon"
    productId?: string
    className?: string
}

const CartButton = ({ productId, wishlistElementType, className }: CartButtonPropsType) => {
    const { signedIn } = useContext(UserContext)
    const { cartList, cartListCount, addToCart } = useContext(CartContext)
    const isCartItem = cartList?.find((cartProduct) => cartProduct.product._id === productId)
    const navigate = useNavigate()

    if (wishlistElementType === 'nav-icon') {
        return (
            <>
                <FaShoppingCart />
                {signedIn && <span>{cartListCount}</span>}
            </>
        )
    } else if (wishlistElementType === 'button') {
        return (
            <>
                {
                    isCartItem
                        ? (
                            <button
                                className={className}
                                onClick={() => navigate('/cart')}
                            >
                                Go To Cart
                            </button>
                        )
                        : (
                            <button
                                className={className}
                                onClick={() => {
                                    addToCart(productId)
                                }}
                            >
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