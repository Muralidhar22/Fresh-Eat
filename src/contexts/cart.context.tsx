import { createContext, useContext, useState, useReducer } from "react";

import { ProviderPropsType } from "../types/ProviderPropsType";
import { UserContext } from "./user.context";

const CartContext = createContext(null)

const CartProvider = ({ children }: ProviderPropsType) => {
    const value = {

    }
    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}