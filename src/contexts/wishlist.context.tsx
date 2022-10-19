import { createContext, useContext, useState, useReducer } from "react";

import { ProviderPropsType } from "../types/ProviderPropsType";
import { UserContext } from "./user.context";
import { UserContextValueType } from "contexts/user.context";
import { useEffect } from "react";

const WishlistContext = createContext(null)



const WishlistProvider = ({ children }: ProviderPropsType) => {
    const [wishlist, dispatch] = useReducer()
    const { accessToken } = useContext(UserContext) || {} as Partial<UserContextValueType>;
    useEffect(() => {
        const getWishlist = async () => {
            await fetch(SIGNIN_API, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email.value,
                    password: password.value
                })
            })
        }
    })
    const value = {

    }
    return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>
}