import { useEffect, useState, useContext } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import CheckoutForm from "components/checkout-form/CheckoutForm.component";
import { UserContext } from "contexts/user.context";
import { CartContext } from "contexts/cart.context";
import { ProductContext } from "contexts/products.context";
import { formatDate, formatTime } from "utils/dateTimeFormat";
import axios from "axios";

const PaymentPage = () => {
    const [stripePromise, setStripePromise] = useState<Promise<any> | null>(null);
    const [clientSecret, setClientSecret] = useState<string>();
    const { signedIn } = useContext(UserContext);
    const { cartlist, } = useContext(CartContext);
    let orderAmount = 0;
    const formattedDate = formatDate()
    const formattedTime = formatTime()
    const [orderId, setOrderId] = useState<string>();
    const { products } = useContext(ProductContext)
    const cartlistProducts = cartlist.map(cartItem => {
        return { count: cartItem.count, details: products.find(product => product._id === cartItem.productId) }
    })


    useEffect(() => {
        setStripePromise(loadStripe(`${process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY}`))
        const updateOrders = async () => {
            const { data, status } = await axios.post('orders', {
                items: cartlistProducts,
                shippingAddress: {},
                billingAddress: {},
                amount: orderAmount,
                createdTime: formattedTime,
                createdDate: formattedDate
            })
            if (status === 201) {
                setOrderId(data.id)
            }
        }
        (async () => {
            const { data, status } = await axios.post('create-payment-intent', {
                items: cartlist
            })
            if (status === 200) {
                setClientSecret(data.clientSecret);
                orderAmount = data.amount
                updateOrders()
            }

        })();
    }, [])


    return (
        <>
            <h1>Payment Gateway</h1>
            <p>please do not refresh</p>
            {stripePromise && clientSecret && orderId &&
                <Elements stripe={stripePromise} options={{ clientSecret, appearance: { theme: 'flat' } }}>
                    <CheckoutForm
                        orderId={orderId}
                    />
                </Elements>}
        </>
    )
}

export default PaymentPage;