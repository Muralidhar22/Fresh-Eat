type CartType = {
    _id: any
    userId: string
    items: {
        productId: string
        count: number
    }[]
}

export default CartType;