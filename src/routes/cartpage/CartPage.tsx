import { useContext, useState } from "react";
import { CartContext } from "contexts/cart.context";

import { ProductContext } from "contexts/products.context";
import Loader from "components/loader/Loader.component";

import { FaPlusCircle, FaTrashAlt, FaMinusCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

// let cartAmount = 0
const CartPage = () => {
    const { cartlist, increaseItemQty, decreaseItemQty, removeFromCart, cartLoader } = useContext(CartContext)
    const { products } = useContext(ProductContext)
    const navigate = useNavigate()
    const cartlistProducts = cartlist.map(cartItem => {
        return { count: cartItem.count, details: products.find(product => product._id === cartItem.productId) }
    })
    const cartAmount: number = cartlist.reduce((prevValue, currentItem) => {
        const itemDetails = products.find(product => product._id === currentItem.productId)
        if (itemDetails?.discountPrice) {
            return (prevValue + itemDetails?.discountPrice * currentItem.count)
        } else {
            return prevValue
        }
    }, 0)
    // setTotalCartAmount(cartAmount)

    return (
        <>
            {cartLoader && <Loader />}
            <div>
                {cartlistProducts.map((item) => (
                    <div key={item.details?._id}>
                        <p>{item.details?.name}</p>
                        <p><span>Price:</span> {item.details?.discountPrice}</p>
                        <div>
                            <button
                                onClick={() => decreaseItemQty(item.details?._id)}><FaMinusCircle /></button>
                            <span>{item.count}</span>
                            <button
                                onClick={() => increaseItemQty(item.details?._id)}><FaPlusCircle /></button>
                        </div>
                        <button
                            onClick={() => removeFromCart(item.details?._id)}
                        ><FaTrashAlt /></button>
                    </div>
                ))}
            </div>
            {
                cartlist.length > 0 &&
                <div>
                    <p className="text-uppercase">price details</p>
                    <ul>
                        <li>Price items: <span>{cartAmount}</span></li>
                        <li>Delivery Charges</li>
                    </ul>
                    <p className="text-uppercase">total price</p>
                    <span>{cartAmount}</span>
                    <button onClick={() => navigate('/checkout')}>Checkout</button>
                </div>
            }
        </>
    )
}

export default CartPage;
