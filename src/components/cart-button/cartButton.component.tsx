import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { UserContext } from "contexts/user.context";
import { CartContext } from "contexts/cart.context";
import useAxiosPrivate from "hooks/useAxiosPrivate";

import { FaShoppingCart } from "react-icons/fa";
import { showToastErrorMessage } from "utils/toastMessage";

type CartButtonPropsType = {
    wishlistElementType: "button" | "nav-icon"
    productId?: string
}

const CartButton = ({ productId, wishlistElementType }: CartButtonPropsType) => {
    const { signedIn } = useContext(UserContext)
    const { cartlist, cartlistCount, addToCart } = useContext(CartContext)
    const isCartItem = cartlist.some((cartProduct) => cartProduct.productId === productId)
    const navigate = useNavigate()
    const axiosPrivate = useAxiosPrivate()

    const handleClickHandler = async () => {
        try {
            await axiosPrivate.get('cart/count')
        } catch (error) {
            console.log(error)
            showToastErrorMessage(`YOOOOOOO`)
        }
    }

    if (wishlistElementType === 'nav-icon') {
        return (
            <>
                <FaShoppingCart />
                {signedIn && <span>{cartlistCount}</span>}
            </>
        )
    } else if (wishlistElementType === 'button') {
        return (
            <>
                {
                    isCartItem
                        ? (
                            <button
                                onClick={() => navigate('/cart')}
                            >
                                Go To Cart
                            </button>
                        )
                        : (
                            <button
                                onClick={() => {
                                    handleClickHandler()
                                    // useAxiosPrivate.get('cart/count')
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