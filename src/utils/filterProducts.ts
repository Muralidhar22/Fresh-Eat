import FiltersStateType from "types/FiltersStateType";
import ProductType from "types/ProductType";

export const getSortedProducts = (products: ProductType[], sortBy: "ascending" | "descending" | null) => {
    if (sortBy === "descending") {
        return products.sort((a, b) => b.discountPrice - a.discountPrice);
    } else if (sortBy === "ascending") {
        return products.sort((a, b) => a.discountPrice - b.discountPrice);
    }
    return products;
};

export const getFilteredProducts = (
    products: ProductType[],
    {
        inStock,
        fastDelivery,
        categories,
        brands,
        rating,
        priceRange,
        search,
        esrbRatings,
        platforms
    }: FiltersStateType
) => {
    return products
        .filter((product) => (inStock === null ? true : inStock === product.inStock))
        .filter((product) => (fastDelivery === null ? true : fastDelivery === product.fastDelivery))
        .filter((product) => (rating === null ? true : product.ratings >= rating))
        .filter((product) => (priceRange === null ? true : product.discountPrice <= priceRange))
        .filter((product) =>
            esrbRatings.length === 0
                ? true
                : esrbRatings.find((esrbRating) => product.esrbRating ? esrbRating === product.esrbRating : true)
        )
        .filter((product) =>
            platforms.length === 0
                ? true
                : platforms.find((platform) => product.platform ? product.platform.includes(platform) : true)
        )
        .filter((product) =>
            brands.length === 0
                ? true
                : brands.find((brand) => brand === product.brand)
        )
        .filter((product) =>
            categories.length === 0
                ? true
                : categories.find((category) => category === product.category)
        )
        .filter(
            (product) => search === null ? true :
                product.name.toLowerCase().includes(search.toLowerCase()) ||
                product.brand.toLowerCase().includes(search.toLowerCase())
        )
};