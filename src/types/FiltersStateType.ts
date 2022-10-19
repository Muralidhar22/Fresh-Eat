type FiltersStateType = {
    priceRange: number
    inStock: boolean | null
    fastDelivery: boolean | null
    brands: string[]
    categories: string[]
    platforms: string[]
    esrbRatings: string[]
    rating: number | null
    sortBy: "ascending" | "descending" | null
    search: string | null
}

export default FiltersStateType;