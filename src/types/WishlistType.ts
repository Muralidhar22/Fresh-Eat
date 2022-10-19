export type WishlistItemsType = {
    productId: any
}

export type WishlistType = {
    _id: any
    userId: string
    items: WishlistItemsType[]
}