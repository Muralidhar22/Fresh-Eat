import { useState, useEffect, useContext } from "react";
import {
    useStripe,
    useElements,
    PaymentElement
} from "@stripe/react-stripe-js";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { UserContext } from "contexts/user.context";
import { CartContext } from "contexts/cart.context";

import styles from "./CheckoutForm.styles.module.css";
import { showToastSuccessMessage } from "utils/toastMessage";

export default function CheckoutForm({ orderId }: { orderId: string }) {
    const [message, setMessage] = useState<string>();
    const [isProcessing, setIsProcessing] = useState(false);
    const stripe = useStripe();
    const elements = useElements();
    const { signedIn } = useContext(UserContext);
    const navigate = useNavigate();
    const { cartList } = useContext(CartContext);


    const updateOrderStatus = async () => {
        const { data, status } = await axios.patch('orders')
    }


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        setIsProcessing(true);

        // const { error, paymentIntent } = await stripe.confirmPayment({
        // elements,
        //     confirmParams: {
        //         payment_method_data: {
        //             billing_details: {
        //                 address: {
        //                     line1: "",
        //                     city: "foocity",
        //                     country: "India",
        //                     postal_code: "530051",
        //                     state: "AP",
        //                 },
        //                 // name: customerName ? customerName : "Guest",
        //             }
        //         },
        //         // shipping: {
        //             // name: customerName ? customerName : "Guest",
        //             address: {
        //                 line1: "",
        //                 city: "foocity",
        //                 country: "India",
        //                 postal_code: "530051",
        //                 state: "AP",
        //             }
        //         },
        //         return_url: `${window.location.origin}/orders`,
        //     },
        //     redirect: "if_required"
        // });

        // if (error) {
        //     setMessage(error.message);
        // } else if (paymentIntent?.status === "succeeded") {
        //     showToastSuccessMessage(`Payment completed`)
        //     updateOrderStatus()

        // } else if (paymentIntent?.status === "canceled") {

        // }
        // setIsProcessing(false);
    };
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
