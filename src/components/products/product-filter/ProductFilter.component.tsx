import { useContext, useState } from "react";

import CheckboxInput from "../../checkboxInput/CheckboxInput.component";
import { createAction } from "utils/reducer/createAction";
import { FilterContext } from "contexts/filter.context";
import PRODUCT_FILTER_ACTION_TYPE from "reducers/product-filter/productFilterActionType";

import styles from "./ProductFilter.styles.module.css";

const ProductFilter = () => {
    const { dispatch, filtersState, INITIAL_FILTERS_STATE } = useContext(FilterContext)

    return (
        <div className={styles.ProductFilter}>
            <div className={styles.FilterHeader}>
                <h2>Filters</h2>
                <button
                    onClick={() => {
                        dispatch(createAction(PRODUCT_FILTER_ACTION_TYPE.CLEAR_PRODUCTS_FILTER, INITIAL_FILTERS_STATE))
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
                                dispatch(createAction(PRODUCT_FILTER_ACTION_TYPE.PRICERANGE_FILTER, e.target.value))
                            }}
                            min="2000" max="20000"
                            step="500"
                            value={filtersState.priceRange}
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
                                dispatch(createAction(PRODUCT_FILTER_ACTION_TYPE.SORT_FILTER, e.target.value))
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
                                dispatch(createAction(PRODUCT_FILTER_ACTION_TYPE.SORT_FILTER, e.target.value))
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
                        checked={filtersState.inStock ? true : false}
                        onChange={() => {
                            dispatch(createAction(PRODUCT_FILTER_ACTION_TYPE.IN_STOCK_FILTER, null))
                        }}
                    />
                    <CheckboxInput
                        id="availability-fastDelivery"
                        name="fastDelivery"
                        label="Fast Delivery Only"
                        checked={filtersState.fastDelivery ? true : false}
                        onChange={() => {
                            dispatch(createAction(PRODUCT_FILTER_ACTION_TYPE.FAST_DELIVERY_FILTER, null))
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
                        checked={filtersState.categories.includes("game")}
                        onChange={(e) => {
                            dispatch(createAction(PRODUCT_FILTER_ACTION_TYPE.CATEGORY_FILTER, e.target.value))
                        }}
                    />
                    <CheckboxInput
                        id="category-accessories"
                        label="Accessories"
                        name="category"
                        value="accessories"
                        checked={filtersState.categories.includes("accessories")}
                        onChange={(e) => {
                            dispatch(createAction(PRODUCT_FILTER_ACTION_TYPE.CATEGORY_FILTER, e.target.value))
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
                        checked={filtersState.brands.includes("Sony")}
                        onChange={(e) => {
                            dispatch(createAction(PRODUCT_FILTER_ACTION_TYPE.BRAND_FILTER, e.target.value))
                        }} />
                    <CheckboxInput
                        id="brand-ea"
                        label="EA"
                        name="brand"
                        value="EA"
                        checked={filtersState.brands.includes("EA")}
                        onChange={(e) => {
                            dispatch(createAction(PRODUCT_FILTER_ACTION_TYPE.BRAND_FILTER, e.target.value))
                        }} />
                    <CheckboxInput
                        id="brand-ubisoft"
                        label="Ubisoft"
                        name="brand"
                        value="Ubisoft"
                        checked={filtersState.brands.includes("Ubisoft")}
                        onChange={(e) => {
                            dispatch(createAction(PRODUCT_FILTER_ACTION_TYPE.BRAND_FILTER, e.target.value))
                        }} />
                    <CheckboxInput
                        id="brand-ant"
                        label="Ant"
                        name="brand"
                        value="Ant"
                        checked={filtersState.brands.includes("Ant")}
                        onChange={(e) => {
                            dispatch(createAction(PRODUCT_FILTER_ACTION_TYPE.BRAND_FILTER, e.target.value))
                        }} />
                    <CheckboxInput
                        id="brand-acer"
                        label="Acer"
                        name="brand"
                        value="Acer"
                        checked={filtersState.brands.includes("Acer")}
                        onChange={(e) => {
                            dispatch(createAction(PRODUCT_FILTER_ACTION_TYPE.BRAND_FILTER, e.target.value))
                        }} />
                    <CheckboxInput
                        id="brand-green-soul"
                        label="Green Soul"
                        name="brand"
                        value="GreenSoul"
                        checked={filtersState.brands.includes("GreenSoul")}
                        onChange={(e) => {
                            dispatch(createAction(PRODUCT_FILTER_ACTION_TYPE.BRAND_FILTER, e.target.value))
                        }} />
                    <CheckboxInput
                        id="brand-eureka"
                        label="Eureka"
                        name="brand"
                        value="Eureka"
                        checked={filtersState.brands.includes("Eureka")}
                        onChange={(e) => {
                            dispatch(createAction(PRODUCT_FILTER_ACTION_TYPE.BRAND_FILTER, e.target.value))
                        }} />
                    <CheckboxInput
                        id="brand-razer"
                        label="Razer"
                        name="brand"
                        value="Razer"
                        checked={filtersState.brands.includes("Razer")}
                        onChange={(e) => {
                            dispatch(createAction(PRODUCT_FILTER_ACTION_TYPE.BRAND_FILTER, e.target.value))
                        }} />
                    <CheckboxInput
                        id="brand-red-clutch"
                        label="Red Clutch"
                        name="brand"
                        value="Redclutch"
                        checked={filtersState.brands.includes("Redclutch")}
                        onChange={(e) => {
                            dispatch(createAction(PRODUCT_FILTER_ACTION_TYPE.BRAND_FILTER, e.target.value))
                        }} />
                    <CheckboxInput
                        id="brand-qbik"
                        label="Qbik"
                        name="brand"
                        value="Qbik"
                        checked={filtersState.brands.includes("Qbik")}
                        onChange={(e) => {
                            dispatch(createAction(PRODUCT_FILTER_ACTION_TYPE.BRAND_FILTER, e.target.value))
                        }} />
                </ul>
            </div>
            {filtersState.categories.includes("game") &&
                <>
                    <div className={styles.ProductFilter_Platform}>
                        <h3>Platform</h3>
                        <ul>
                            <CheckboxInput
                                name="platform"
                                label="PC"
                                checked={filtersState.platform.includes("PC")}
                                onChange={(e) => {
                                    dispatch(createAction(PRODUCT_FILTER_ACTION_TYPE.PLATFORM_FILTER, e.target.value))
                                }}
                                id="platform-pc"
                                value="PC"
                            />
                            <CheckboxInput
                                name="platform"
                                label="PlayStation (PS)"
                                checked={filtersState.platform.includes("PS")}
                                onChange={(e) => {
                                    dispatch(createAction(PRODUCT_FILTER_ACTION_TYPE.PLATFORM_FILTER, e.target.value))
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
                                checked={filtersState.esrbRatings.includes("Teen")}
                                onChange={(e) => {
                                    dispatch(createAction(PRODUCT_FILTER_ACTION_TYPE.ESRB_FILTER, e.target.value))
                                }}
                            />
                            <CheckboxInput
                                name="esrbRating"
                                label="Everyone"
                                value="Everyone"
                                id="esrb-rating-everyone"
                                checked={filtersState.esrbRatings.includes("Everyone")}
                                onChange={(e) => {
                                    dispatch(createAction(PRODUCT_FILTER_ACTION_TYPE.ESRB_FILTER, e.target.value))
                                }}
                            />
                            <CheckboxInput
                                name="esrbRating"
                                label="Mature"
                                value="Mature"
                                id="esrb-rating-mature"
                                checked={filtersState.esrbRatings.includes("Mature")}
                                onChange={(e) => {
                                    dispatch(createAction(PRODUCT_FILTER_ACTION_TYPE.ESRB_FILTER, e.target.value))
                                }}
                            />
                        </ul>
                    </div>
                </>
            }

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
                                dispatch(createAction(PRODUCT_FILTER_ACTION_TYPE.RATINGS_FILTER, e.target.value))
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
                                dispatch(createAction(PRODUCT_FILTER_ACTION_TYPE.RATINGS_FILTER, e.target.value))
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
                                dispatch(createAction(PRODUCT_FILTER_ACTION_TYPE.RATINGS_FILTER, e.target.value))
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
                                dispatch(createAction(PRODUCT_FILTER_ACTION_TYPE.RATINGS_FILTER, e.target.value))
                            }} />
                        <label htmlFor="rating-1">1 star & above</label>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default ProductFilter;