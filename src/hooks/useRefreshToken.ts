import axios from "axios"
import { showToastErrorMessage } from "utils/toastMessage";
import { useContext, useEffect } from "react";

import { UserContext } from "contexts/user.context";
import { WishlistContext } from "contexts/wishlist.context";
import { CartContext } from "contexts/cart.context";

const useRefreshToken = () => {
    const { userSignOutHandler, accessTokenRef } = useContext(UserContext)
    const { wishlistInitialState } = useContext(WishlistContext)
    const { cartInitialState } = useContext(CartContext)

    const handleLogout = () => {
        userSignOutHandler()
        wishlistInitialState()
        cartInitialState()
    }

    const refresh = async () => {
        try {
            const response = await axios.get('refresh', {
                withCredentials: true
            })
            accessTokenRef.current = response.data.accessToken
            return response.data.accessToken;
        } catch (err) {
            handleLogout()
            showToastErrorMessage(`${err}`)
        }
    }
    return refresh;
};

export default useRefreshToken;