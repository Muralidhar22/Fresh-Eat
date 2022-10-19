type FiltersStateType = {
    price: number
    inStock: boolean
    fastDelivery: boolean
    brand: string[]
    category: string[]
    platform: string[]
    esrbRating: string[]
    rating: number
    sortBy: "ascending" | "descending" | string
}

export default FiltersStateType;