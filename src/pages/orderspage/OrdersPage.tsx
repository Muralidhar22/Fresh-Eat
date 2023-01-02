import { useContext, useEffect } from "react";

import { useAuthContext } from "contexts/auth.context";

const OrdersPage = () => {
    const { signedIn } = useAuthContext()
    // useEffect(() => {
    //     (async () => {
    //         const { data, status } = await axios.get('orders')
    //     })();
    // }, [])
    return (
        <div>Your Orders...</div>
    )
}

export default OrdersPage;