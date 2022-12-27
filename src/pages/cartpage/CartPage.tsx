import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { CartContext } from "contexts/cart.context";
import Navbar from "components/nav/Nav.component";

import { FaPlusCircle, FaTrashAlt, FaMinusCircle } from "react-icons/fa";
import Loader from "components/loader/Loader.component";
import styles from "./CartPage.styles.module.css";
import { UserContext } from "contexts/user.context";

const CartPage = () => {
    const { cartList, increaseItemQty, decreaseItemQty, removeFromCart, cartLoader, getCartTotal } = useContext(CartContext)
    const navigate = useNavigate()
    const cartTotal = getCartTotal();
    const { accessToken } = useContext(UserContext)

    console.log(accessToken)

    if (cartList && cartList.length > 0) {
        return (
            <>
                <Navbar />
                {cartLoader && <Loader />}

                <div className={styles['cart-content-container']}>
                    <div className={styles['cart-list-container']}>
                        <div className={styles['address-container']}>
                            <div className={styles['address-content']}>
                                Deliver To: <span>Muralidhar, 530051</span> <span className={styles['address-type']}></span>
                                <div>MIG A 71, Foo- City, Foo - pradesh</div>
                            </div>
                            <button className={styles['change-address-button']}>Change</button>
                        </div>
                        {cartList.map((item) => (
                            <div className={styles['cart-list-item']} key={item.product._id}>
                                <div className={styles['cart-list-item-image-container']}>
                                    <img className={styles['product-image']} src={item.product.media[0].source} alt={item.product.name} />
                                </div>
                                <p>{item.product.name}</p>
                                <p><span>Price:</span> {item.product.discountPrice}</p>
                                <div >
                                    <button
                                        onClick={() => decreaseItemQty(item.product._id)}><FaMinusCircle /></button>
                                    <span>{item.count}</span>
                                    <button
                                        onClick={() => increaseItemQty(item.product._id)}><FaPlusCircle /></button>
                                </div>
                                <button
                                    onClick={() => removeFromCart(item.product._id)}
                                ><FaTrashAlt /></button>
                            </div>
                        ))}
                    </div>
                    <div className={styles['price-container']}>
                        <h2 className="text-uppercase">price details</h2>
                        <ul>
                            <li>Price items: <span>{cartTotal}</span></li>
                            <li>Delivery Charges: <span style={{ color: "rgb(101, 183, 101)", fontWeight: "500" }}>FREE</span></li>
                        </ul>
                        <p className="text-uppercase">total price</p>
                        <span>{cartTotal}</span>
                        <button onClick={() => navigate('/checkout')}>Checkout</button>
                    </div>
                </div>
            </>
        )
    }

    return (
        <div>
            <Navbar />
            <span>Cartlist is empty!</span>
            <img src="/assets/empty_cart.svg" alt="A Man with an empty cart holding a list" />
        </div>
    )
}

export default CartPage;
