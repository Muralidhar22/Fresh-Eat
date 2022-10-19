import { useContext } from "react";

import CheckboxInput from "../../checkboxInput/CheckboxInput.component";
import { FilterContext } from "../../../contexts/filter.context";
import { ProductContext } from "../../../contexts/products.context";

import styles from "./ProductFilter.styles.module.css";

const ProductFilter = () => {
    const { filtersState, setFiltersState, INITIAL_FILTERS_STATE } = useContext(FilterContext)
    const { handleProductFilterChange } = useContext(ProductContext)
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>, changedProperty: keyof typeof filtersState) => {
        handleProductFilterChange()
        if (Array.isArray(filtersState[changedProperty])) {
            if ((filtersState[changedProperty] as string[]).includes(e.target.value)) {
                setFiltersState({
                    ...filtersState,
                    [changedProperty]: (filtersState[changedProperty] as string[]).filter(
                        value => (
                            value !== e.target.value
                        )
                    )
                })
            } else {
                setFiltersState({
                    ...filtersState,
                    [changedProperty]: [...filtersState[changedProperty] as string[], e.target.value]
                })
            }
        } else if (typeof filtersState[changedProperty] === "boolean") {
            setFiltersState({
                ...filtersState,
                [changedProperty]: !filtersState[changedProperty]
            })
        } else if (typeof filtersState[changedProperty] === "number") {
            setFiltersState({
                ...filtersState,
                [changedProperty]: Number(e.target.value)
            })
        } else if (typeof filtersState[changedProperty] === "string") {
            setFiltersState({
                ...filtersState,
                [changedProperty]: e.target.value
            })
        }
    }

    return (
        <div className={styles.ProductFilter}>
            <div className={styles.FilterHeader}>
                <h2>Filters</h2>
                <button
                    onClick={() => {
                        setFiltersState(INITIAL_FILTERS_STATE)
                    }}
                >Clear All</button>
            </div>
            <div className={styles.ProductFilter_PriceRange}>
                <h3>Price</h3>
                <ul>
                    <li>
                        <label htmlFor="price-range">Range:</label>
                        <input type="range"
                            name="price"
                            onChange={(e) => {
                                handleChange(e, "price")
                            }}
                            min="2000" max="20000"
                            step="500"
                            value={filtersState.price}
                            id="price-range"
                        />
                    </li>
                </ul>
            </div>
            <div className={styles.ProductFilter_sort}>
                <ul>
                    <li>
                        <input
                            type="radio"
                            name="sortBy"
                            id="sort-by-low"
                            value="ascending"
                            checked={filtersState.sortBy === "ascending"}
                            onChange={(e) => {
                                handleChange(e, "sortBy")
                            }} />
                        <label htmlFor="sort-by-low">Price: Low to High</label>
                    </li>
                    <li>
                        <input
                            type="radio"
                            name="sortBy"
                            id="sort-by-high"
                            value="descending"
                            checked={filtersState.sortBy === "descending"}
                            onChange={(e) => {
                                handleChange(e, "sortBy")
                            }} />
                        <label htmlFor="sort-by-high">Price: High to Low</label>
                    </li>
                </ul>
            </div>
            <div className={styles.ProductFilter_Availability}>
                <h3>Availability</h3>
                <ul>
                    <CheckboxInput
                        id="availability-stock"
                        label="Include Out of Stock"
                        name="inStock"
                        checked={filtersState.inStock}
                        onChange={(e) => {
                            handleChange(e, "inStock")
                        }}
                    />
                    <CheckboxInput
                        id="availability-fastDelivery"
                        name="fastDelivery"
                        label="Fast Delivery Only"
                        checked={filtersState.fastDelivery}
                        onChange={(e) => {
                            handleChange(e, "fastDelivery")
                        }}
                    />
                </ul>
            </div>
            <div className={styles.ProductFilter_Category}>
                <h3>Category</h3>
                <ul>
                    <CheckboxInput
                        id="category-game"
                        label="Games"
                        value="game"
                        name="category"
                        checked={filtersState.category.includes("game")}
                        onChange={(e) => {
                            handleChange(e, "category")
                        }}
                    />
                    <CheckboxInput
                        id="category-accessories"
                        label="Accessories"
                        name="category"
                        value="accessories"
                        checked={filtersState.category.includes("accessories")}
                        onChange={(e) => {
                            handleChange(e, "category")
                        }}
                    />
                </ul>
            </div>
            <div className={styles.ProductFilter_Brand}>
                <h3>Brands</h3>
                <ul>
                    <CheckboxInput
                        id="brand-sony"
                        label="Sony"
                        name="brand"
                        value="Sony"
                        checked={filtersState.brand.includes("Sony")}
                        onChange={(e) => {
                            handleChange(e, "brand")
                        }} />
                    <CheckboxInput
                        id="brand-ea"
                        label="EA"
                        name="brand"
                        value="EA"
                        checked={filtersState.brand.includes("EA")}
                        onChange={(e) => {
                            handleChange(e, "brand")
                        }} />
                    <CheckboxInput
                        id="brand-ubisoft"
                        label="Ubisoft"
                        name="brand"
                        value="Ubisoft"
                        checked={filtersState.brand.includes("Ubisoft")}
                        onChange={(e) => {
                            handleChange(e, "brand")
                        }} />
                    <CheckboxInput
                        id="brand-ant"
                        label="Ant"
                        name="brand"
                        value="Ant"
                        checked={filtersState.brand.includes("Ant")}
                        onChange={(e) => {
                            handleChange(e, "brand")
                        }} />
                    <CheckboxInput
                        id="brand-acer"
                        label="Acer"
                        name="brand"
                        value="Acer"
                        checked={filtersState.brand.includes("Acer")}
                        onChange={(e) => {
                            handleChange(e, "brand")
                        }} />
                    <CheckboxInput
                        id="brand-green-soul"
                        label="Green Soul"
                        name="brand"
                        value="GreenSoul"
                        checked={filtersState.brand.includes("GreenSoul")}
                        onChange={(e) => {
                            handleChange(e, "brand")
                        }} />
                    <CheckboxInput
                        id="brand-eureka"
                        label="Eureka"
                        name="brand"
                        value="Eureka"
                        checked={filtersState.brand.includes("Eureka")}
                        onChange={(e) => {
                            handleChange(e, "brand")
                        }} />
                    <CheckboxInput
                        id="brand-razer"
                        label="Razer"
                        name="brand"
                        value="Razer"
                        checked={filtersState.brand.includes("Razer")}
                        onChange={(e) => {
                            handleChange(e, "brand")
                        }} />
                    <CheckboxInput
                        id="brand-red-clutch"
                        label="Red Clutch"
                        name="brand"
                        value="Redclutch"
                        checked={filtersState.brand.includes("Redclutch")}
                        onChange={(e) => {
                            handleChange(e, "brand")
                        }} />
                    <CheckboxInput
                        id="brand-qbik"
                        label="Qbik"
                        name="brand"
                        value="Qbik"
                        checked={filtersState.brand.includes("Qbik")}
                        onChange={(e) => {
                            handleChange(e, "brand")
                        }} />
                </ul>
            </div>
            <div className={styles.ProductFilter_Platform}>
                <h3>Platform</h3>
                <ul>
                    <CheckboxInput
                        name="platform"
                        label="PC"
                        checked={filtersState.platform.includes("PC")}
                        onChange={(e) => {
                            handleChange(e, "platform")
                        }}
                        id="platform-pc"
                        value="PC"
                    />
                    <CheckboxInput
                        name="platform"
                        label="PlayStation (PS)"
                        checked={filtersState.platform.includes("PS")}
                        onChange={(e) => {
                            handleChange(e, "platform")
                        }}
                        id="platform-ps"
                        value="PS"
                    />
                </ul>
            </div>
            <div className={styles.ProductFilter_Esrb}>
                <h3>ESRB Rating</h3>
                <ul>
                    <CheckboxInput
                        name="esrbRating"
                        label="Teen"
                        value="Teen"
                        id="esrb-rating-teen"
                        checked={filtersState.esrbRating.includes("Teen")}
                        onChange={(e) => {
                            handleChange(e, "esrbRating")
                        }}
                    />
                    <CheckboxInput
                        name="esrbRating"
                        label="Everyone"
                        value="Everyone"
                        id="esrb-rating-everyone"
                        checked={filtersState.esrbRating.includes("Everyone")}
                        onChange={(e) => {
                            handleChange(e, "esrbRating")
                        }}
                    />
                    <CheckboxInput
                        name="esrbRating"
                        label="Mature"
                        value="Mature"
                        id="esrb-rating-mature"
                        checked={filtersState.esrbRating.includes("Mature")}
                        onChange={(e) => {
                            handleChange(e, "esrbRating")
                        }}
                    />
                </ul>
            </div>
            <div className={styles.ProductFilter_Rating}>
                <h3>Ratings</h3>
                <ul>
                    <li>
                        <input
                            type="radio"
                            name="rating"
                            id="rating-4"
                            value={4}
                            checked={filtersState.rating === 4}
                            onChange={(e) => {
                                handleChange(e, "rating")
                            }} />
                        <label htmlFor="rating-4">4 stars & above</label>
                    </li>
                    <li>
                        <input
                            type="radio"
                            name="rating"
                            id="rating-3"
                            value={3}
                            checked={filtersState.rating === 3}
                            onChange={(e) => {
                                handleChange(e, "rating")
                            }} />
                        <label htmlFor="rating-3">3 stars & above</label>
                    </li>
                    <li>
                        <input
                            type="radio"
                            name="rating"
                            id="rating-2"
                            value={2}
                            checked={filtersState.rating === 2}
                            onChange={(e) => {
                                handleChange(e, "rating")
                            }} />
                        <label htmlFor="rating-2">2 stars & above</label>
                    </li>
                    <li>
                        <input
                            type="radio"
                            name="rating"
                            id="rating-1"
                            value={1}
                            checked={filtersState.rating === 1}
                            onChange={(e) => {
                                handleChange(e, "rating")
                            }} />
                        <label htmlFor="rating-1">1 star & above</label>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default ProductFilter;