import { createContext, useContext, useState, useReducer } from "react";

import ProviderPropsType from "../types/ProviderPropsType";
import { UserContext } from "./user.context";
const OrdersContext = createContext(null)

// const OrdersProvider = ({ children }: ProviderPropsType) => {
//     const value = {

//     }
//     return <OrdersContext.Provider value={value}>{children}</OrdersContext.Provider>
// }