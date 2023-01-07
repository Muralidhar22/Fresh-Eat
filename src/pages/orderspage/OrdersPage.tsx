import { useEffect } from "react";

import { useAuthContext } from "contexts/auth.context";
import { useOrdersContext } from "contexts/orders.context";
import Navbar from "components/nav/Nav.component";

const OrdersPage = () => {
    const { signedIn } = useAuthContext()
    const { getOrders, orders } = useOrdersContext()

    useEffect(() => {
        getOrders()
    }, [])
    return (
        <>
            <Navbar />
            {
                orders
                    ?
                    <div>Your Orders...</div>
                    :
                    null
            }
        </>
    )
}

export default OrdersPage;