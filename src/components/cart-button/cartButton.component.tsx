import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { UserContext } from "contexts/user.context";
import { CartContext } from "contexts/cart.context";
import useAxiosPrivate from "hooks/useAxiosPrivate";

import { FaShoppingCart } from "react-icons/fa";
import { showToastErrorMessage } from "utils/toastMessage";

type CartButtonPropsType = {
    wishlistElementType: "button" | "nav-icon"
    productId?: string
    className?: string
}

const CartButton = ({ productId, wishlistElementType, className }: CartButtonPropsType) => {
    const { signedIn, accessTokenRef } = useContext(UserContext)
    const { cartList, cartListCount, addToCart } = useContext(CartContext)
    const isCartItem = cartList.some((cartProduct) => cartProduct.productId === productId)
    const navigate = useNavigate()
    const axiosPrivate = useAxiosPrivate()

    const handleClickHandler = async () => {
        try {
            await axiosPrivate.get('cart/count')
        } catch (error) {
            console.error(error)
            showToastErrorMessage(`${error}`)
        }
    }

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
                                    handleClickHandler()
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