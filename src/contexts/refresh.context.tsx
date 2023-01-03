import { createContext, useState } from "react";

import ProviderPropsType from "types/ProviderPropsType";

type RefreshContextType = {
    refreshRequestQueue: [any] | null
    setRefreshRequestQueue: React.Dispatch<React.SetStateAction<any>>
}

const INITIAL_CONTEXT_VALUE = {
    refreshRequestQueue: null,
    setRefreshRequestQueue: () => { }
}

export const RefreshContext = createContext<RefreshContextType>(INITIAL_CONTEXT_VALUE)
export const RefreshProvider = ({ children }: ProviderPropsType) => {
    const [refreshRequestQueue, setRefreshRequestQueue] = useState(null)
    const value = { refreshRequestQueue, setRefreshRequestQueue }

    return <RefreshContext.Provider value={value}> {children}</RefreshContext.Provider >
}