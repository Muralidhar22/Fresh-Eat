import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { ProductContext } from "contexts/products.context";
import { CartContext } from "contexts/cart.context";
import useAxiosPrivate from "hooks/useAxiosPrivate";
import { handleError } from "utils/displayError";
import Navbar from "components/nav/Nav.component";

import { FaPlusCircle, FaTrashAlt, FaMinusCircle } from "react-icons/fa";
import Loader from "components/loader/Loader.component";

const CartPage = () => {
    const axiosPrivate = useAxiosPrivate()
    const { cartList, increaseItemQty, decreaseItemQty, removeFromCart, cartLoader, getCartTotal, setCartList } = useContext(CartContext)
    const { products } = useContext(ProductContext)
    const navigate = useNavigate()
    const cartListProducts = cartList?.map(cartItem => {
        return {
            count: cartItem.count, details: products?.find(product => {
                return product._id === cartItem.productId
            })
        }
    })
    const cartTotal = getCartTotal();
    cartList?.forEach(cartItem => {
        products?.forEach(product => {
            console.log(product, cartItem)
            return product._id === cartItem.productId
        })
    })
    useEffect(() => {
        (async () => {
            try {
                const { data, status } = await axiosPrivate.get('cart')
                if (status === 200) {
                    console.log(data.items)
                    setCartList(data.items)
                }
            } catch (error) {
                handleError(error)
            }
        }
        )()
    }, [])

    if (cartList) {
        return (
            <>
                <Navbar />
                {cartLoader && <Loader />}
                <div>
                    {cartListProducts?.map((item) => (
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
                    cartList.length > 0 &&
                    <div>
                        <p className="text-uppercase">price details</p>
                        <ul>
                            <li>Price items: <span>{cartTotal}</span></li>
                            <li>Delivery Charges</li>
                        </ul>
                        <p className="text-uppercase">total price</p>
                        <span>{cartTotal}</span>
                        <button onClick={() => navigate('/checkout')}>Checkout</button>
                    </div>
                }
            </>
        )
    }

    return (
        <div>
            Cartlist is empty!
        </div>
    )
}

export default CartPage;
