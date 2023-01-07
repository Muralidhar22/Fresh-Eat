import { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { redirect } from "react-router-dom";

import CheckoutForm from "components/checkout-form/CheckoutForm.component";
import { useUserContext } from "contexts/user.context";
import { useCartContext } from "contexts/cart.context"; import { useAuthContext } from "contexts/auth.context";
import { useOrdersContext } from "contexts/orders.context";

import { showToastInfoMessage } from "utils/toastMessage";

const PaymentPage = () => {
    const [stripePromise, setStripePromise] = useState<Promise<any> | null>(null);
    const [clientSecret, setClientSecret] = useState<string>();
    const { userInfo, } = useUserContext();
    const { cartList } = useCartContext();
    const { addNewOrder } = useOrdersContext();
    const [orderId, setOrderId] = useState<string>();
    const deliveryAddress = userInfo?.address.find(userAddress => userAddress.isDeliveryAddress)
    const isCheckoutFormDisplayed = stripePromise && clientSecret && orderId && deliveryAddress
    let orderAmount = 0;
    const { useAxiosPrivate, signedIn } = useAuthContext()
    const { axiosPrivate, requestInterceptor, responseInterceptor } = useAxiosPrivate()

    useEffect(() => {
        return () => {
            axiosPrivate.interceptors.request.eject(requestInterceptor)
            axiosPrivate.interceptors.response.eject(responseInterceptor)
        }
    }, [requestInterceptor, responseInterceptor])

    useEffect(() => {
        if (signedIn) {
            if (deliveryAddress) {
                setStripePromise(loadStripe(`${process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY}`));
                (async () => {
                    const { data, status } = await axiosPrivate.post('create-payment-intent', {
                        items: cartList
                    })
                    if (status === 200) {
                        setClientSecret(data.clientSecret);
                        orderAmount = data.amount
                        const newOrderId = addNewOrder(orderAmount);
                        setOrderId(newOrderId)
                    }
                })();
            } else {
                showToastInfoMessage("Set a delivery address");
                redirect('/address')
            }

        }
    }, [signedIn])


    return (
        <>
            <h1>Payment Gateway</h1>
            <p>please do not refresh</p>
            {isCheckoutFormDisplayed &&
                <Elements stripe={stripePromise} options={{ clientSecret, appearance: { theme: 'flat' } }}>
                    <CheckoutForm
                        orderId={orderId}
                        deliveryAddress={deliveryAddress}
                    />
                </Elements>}
        </>
    )
}

export default PaymentPage;