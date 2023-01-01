import axios from "axios"
import { showToastErrorMessage, showToastInfoMessage } from "utils/toastMessage";
import { useContext, useState } from "react";

import { UserContext } from "contexts/user.context";
import { WishlistContext } from "contexts/wishlist.context";
import { CartContext } from "contexts/cart.context";
import { useUserContext } from "contexts/user.context";

type RefreshRequestType = {
    queue: [any]
}

const useRefreshToken = (setAccessToken: any) => {
    const { userSignOutHandler } = useContext(UserContext)
    const { wishlistInitialState } = useContext(WishlistContext)
    const { cartInitialState } = useContext(CartContext)
    // const { setAccessToken, userSignOutHandler, setTestState } = useUserContext()

    const handleLogout = () => {
        userSignOutHandler()
        wishlistInitialState()
        cartInitialState()
    }

    const refresh = async () => {
        try {
            const { data } = await axios.get('refresh', {
                withCredentials: true
            })
            if (setAccessToken) {
                setAccessToken(data.data.accessToken)
            }
            return data.data.accessToken;
        } catch (err) {
            handleLogout()
            showToastErrorMessage("Seems like your session expired!")
            showToastInfoMessage("SignIn again to continue.")
        }
    }
    return refresh;
};

export default useRefreshToken;