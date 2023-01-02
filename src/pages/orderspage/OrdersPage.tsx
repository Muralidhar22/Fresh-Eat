import { useContext, useEffect } from "react";

import { useAuthContext } from "contexts/auth.context";
import Navbar from "components/nav/Nav.component";

const OrdersPage = () => {
    const { signedIn } = useAuthContext()
    // useEffect(() => {
    //     (async () => {
    //         const { data, status } = await axios.get('orders')
    //     })();
    // }, [])
    return (
        <>
            <Navbar />
            <div>Your Orders...</div>
        </>
    )
}

export default OrdersPage;