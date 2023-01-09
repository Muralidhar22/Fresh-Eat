type ProductType = {
    _id: any,
    name: string,
    category: "game" | "accessories",
    media: { type: string, source: string }[]
    price: number,
    discountPrice: number,
    discount: number,
    esrbRating?: "Mature" | "Teen" | "Everyone",
    platform?: string[],
    brand: String,
    genre?: string[],
    ratings: number,
    inStock: boolean,
    fastDelivery?: boolean
}

export default ProductType