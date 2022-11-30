import { useContext, useEffect } from "react";
import { axiosPrivate } from "api/axios";

import { UserContext } from "contexts/user.context";
import { WishlistContext } from "contexts/wishlist.context";
import { CartContext } from "contexts/cart.context";
import useRefreshToken from "hooks/useRefreshToken";
import axios from "axios";

const useAxiosPrivate = () => {
    const refresh = useRefreshToken()
    const { accessToken } = useContext(UserContext)


}

export default useAxiosPrivate;
