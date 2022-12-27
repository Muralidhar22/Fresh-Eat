import axios from "axios"
import { showToastErrorMessage, showToastInfoMessage } from "utils/toastMessage";
import { useContext, useEffect } from "react";

import { UserContext } from "contexts/user.context";
import { WishlistContext } from "contexts/wishlist.context";
import { CartContext } from "contexts/cart.context";

const useRefreshToken = () => {
    const { userSignOutHandler, setAccessToken, accessToken } = useContext(UserContext)
    const { wishlistInitialState } = useContext(WishlistContext)
    const { cartInitialState } = useContext(CartContext)

    const handleLogout = () => {
        userSignOutHandler()
        wishlistInitialState()
        console.log("sadsad", cartInitialState())
    }

    const refresh = async () => {
        try {
            const response = await axios.get('refresh', {
                withCredentials: true
            })
            console.log("in refresh", accessToken)
            setAccessToken(response.data.accessToken)
            return response.data.accessToken;
        } catch (err) {
            handleLogout()
            showToastErrorMessage("Seems like your session expired!")
            showToastInfoMessage("SignIn again to continue.")
        }
    }
    return refresh;
};

export default useRefreshToken;