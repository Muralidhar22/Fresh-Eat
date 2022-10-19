import { createContext, useContext, useState, useReducer } from "react";

import { ProviderPropsType } from "../types/ProviderPropsType";
import { UserContext } from "./user.context";
const WishlistContext = createContext(null)

const WishlistProvider = ({ children }: ProviderPropsType) => {
    const value = {

    }
    return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>
}