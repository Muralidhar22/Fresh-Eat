import { useEffect, useState, useContext } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import CheckoutForm from "components/checkout-form/CheckoutForm.component";
import { UserContext } from "contexts/user.context";
import { CartContext } from "contexts/cart.context";
import { ProductContext } from "contexts/products.context";
import { formatDate, formatTime } from "utils/dateTimeFormat";
import useAxiosPrivate from "hooks/useAxiosPrivate";

const PaymentPage = () => {
    const [stripePromise, setStripePromise] = useState<Promise<any> | null>(null);
    const [clientSecret, setClientSecret] = useState<string>();
    const { accessToken } = useContext(UserContext);
    const { cartList } = useContext(CartContext);
    // const axiosPrivate = useAxiosPrivate(accessToken);
    let orderAmount = 0;
    const formattedDate = formatDate()
    const formattedTime = formatTime()
    const [orderId, setOrderId] = useState<string>();
    const { products } = useContext(ProductContext)



    useEffect(() => {
        setStripePromise(loadStripe(`${process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY}`))
        // const updateOrders = async () => {
        //     const { data, status } = await axiosPrivate.post('orders', {
        //         items: cartList,
        //         shippingAddress: {},
        //         billingAddress: {},
        //         amount: orderAmount,
        //         createdTime: formattedTime,
        //         createdDate: formattedDate
        //     })
        //     if (status === 201) {
        //         setOrderId(data.id)
        //     }
        // }
        // (async () => {
        //     const { data, status } = await axiosPrivate.post('create-payment-intent', {
        //         items: cartList
        //     })
        //     if (status === 200) {
        //         setClientSecret(data.clientSecret);
        //         orderAmount = data.amount
        //         updateOrders()
        //     }

        // })();
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