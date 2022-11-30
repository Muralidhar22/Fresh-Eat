import { useContext, useEffect } from "react";

import { UserContext } from "contexts/user.context";

const OrdersPage = () => {
    const { signedIn } = useContext(UserContext)
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