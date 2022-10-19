import { createContext, SetStateAction, useState } from "react";

import useSetState from "../hooks/useSetState";
import { ProviderPropsType } from "../types/ProviderPropsType";
import FiltersStateType from "../types/FiltersStateType";


type FilterContextValueType = {
    filtersState: FiltersStateType
    setFiltersState: React.Dispatch<SetStateAction<FiltersStateType>>
    getFiltersState: any
    INITIAL_FILTERS_STATE: FiltersStateType
}

const INITIAL_FILTERS_STATE = {
    price: 20000,
    inStock: false,
    fastDelivery: false,
    brand: [] as string[],
    category: [] as string[],
    platform: [] as string[],
    esrbRating: [] as string[],
    rating: 0,
    sortBy: "",
}

const INITAL_CONTEXT_VALUE = {
    filtersState: INITIAL_FILTERS_STATE,
    setFiltersState: () => { },
    getFiltersState: () => { },
    INITIAL_FILTERS_STATE
}


export const FilterContext = createContext<FilterContextValueType>(INITAL_CONTEXT_VALUE)

export const FilterProvider = ({ children }: ProviderPropsType) => {
    const [filtersState, setFiltersState, getFiltersState] = useSetState(INITIAL_FILTERS_STATE)

    const value = {
        filtersState,
        setFiltersState,
        getFiltersState,
        INITIAL_FILTERS_STATE
    }
    return <FilterContext.Provider value={value}>{children}</FilterContext.Provider>
}