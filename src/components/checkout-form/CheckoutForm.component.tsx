import { useState, useEffect } from "react";
import {
    useStripe,
    useElements,
    PaymentElement
} from "@stripe/react-stripe-js";

import { AddressType } from "contexts/user.context";
import { useAuthContext } from "contexts/auth.context";

import styles from "./CheckoutForm.styles.module.css";
import { showToastSuccessMessage } from "utils/toastMessage";

export default function CheckoutForm({ orderId, deliveryAddress }: { orderId: string, deliveryAddress: AddressType }) {
    const [message, setMessage] = useState<string>();
    const [isProcessing, setIsProcessing] = useState(false);
    const stripe = useStripe();
    const elements = useElements();
    const { useAxiosPrivate } = useAuthContext()
    const { axiosPrivate, requestInterceptor, responseInterceptor } = useAxiosPrivate()

    useEffect(() => {
        return () => {
            axiosPrivate.interceptors.request.eject(requestInterceptor)
            axiosPrivate.interceptors.response.eject(responseInterceptor)
        }
    }, [requestInterceptor, responseInterceptor])

    const updateOrderStatus = async () => {
        const { data, status } = await axiosPrivate.patch('orders')
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!stripe || !elements) {
            return;
        }
        setIsProcessing(true);
        const { error, paymentIntent } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                payment_method_data: {
                    billing_details: {
                        address: deliveryAddress,
                        name: deliveryAddress ? deliveryAddress?.name : "Guest",
                    }
                },
                shipping: {
                    name: deliveryAddress ? deliveryAddress?.name : "Guest",
                    address: deliveryAddress,
                },
                return_url: `${window.location.origin}/orders`,
            },
            redirect: "if_required"
        });

        if (error) {
            setMessage(error.message);
        } else if (paymentIntent?.status === "succeeded") {
            showToastSuccessMessage(`Payment completed`)
            updateOrderStatus()

        } else if (paymentIntent?.status === "canceled") {

        }
        setIsProcessing(false);
    }

    return (
        <div className={styles.paymentFormContainer}>
            <form id="payment-form" onSubmit={handleSubmit}>
                <PaymentElement id="payment-element" />
                <button disabled={isProcessing} id="submit">
                    <span id="button-text">
                        {isProcessing ? `...processing` : "Pay now"}
                    </span>
                </button>
                {/* Show any error or success messages */}
                {message && <div id="payment-message">{message}</div>}
            </form>
            <p className="cursor-pointer">copy test card details</p>
        </div>
    );
}
