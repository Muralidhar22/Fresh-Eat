import { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useNavigate } from "react-router-dom";

import CheckoutForm from "components/checkout-form/CheckoutForm.component";
import { useUserContext } from "contexts/user.context";
import { useCartContext } from "contexts/cart.context";
import { formatDate, formatTime } from "utils/dateTimeFormat";
import { useAuthContext } from "contexts/auth.context";

import { showToastInfoMessage } from "utils/toastMessage";

const PaymentPage = () => {
    const [stripePromise, setStripePromise] = useState<Promise<any> | null>(null);
    const [clientSecret, setClientSecret] = useState<string>();
    const { userInfo, } = useUserContext();
    const { cartList } = useCartContext();
    const formattedDate = formatDate()
    const formattedTime = formatTime()
    const [orderId, setOrderId] = useState<string>();
    const navigate = useNavigate()
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
                setStripePromise(loadStripe(`${process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY}`))
                const updateOrders = async () => {
                    const { data, status } = await axiosPrivate.post('orders', {
                        items: cartList,
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
                    const { data, status } = await axiosPrivate.post('create-payment-intent', {
                        items: cartList
                    })
                    if (status === 200) {
                        setClientSecret(data.clientSecret);
                        orderAmount = data.amount
                        updateOrders()
                    }
                })();
            } else {
                showToastInfoMessage("Set a delivery address");
                navigate('/addresses')
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