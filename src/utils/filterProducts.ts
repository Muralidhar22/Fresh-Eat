import FiltersStateType from 'types/FiltersStateType';
import ProductType from 'types/ProductType';

export const getSortedProducts = (products: ProductType[], sortBy: 'ascending' | 'descending' | null) => {
  if (sortBy === 'descending') {
    return products.sort((a, b) => b.discountPrice - a.discountPrice);
  } else if (sortBy === 'ascending') {
    return products.sort((a, b) => a.discountPrice - b.discountPrice);
  }
  return products;
};

export const getFilteredProducts = (
  products: ProductType[],
  {
    outOfStock,
    fastDelivery,
    categories,
    brands,
    rating,
    priceRange,
    search,
    esrbRatings,
    platforms,
  }: FiltersStateType,
) => {
  const filteredProducts = products.filter((product) => {
    const categoryMatch = categories.some((category) => product.category === category);
    const brandMatch = brands.some((brand) => product.brand === brand);
    const esrbRatingMatch = esrbRatings.some((esrbRating) => product.esrbRating === esrbRating);
    const platformMatch = platforms.some((platform) => product.platform?.includes(platform));

    if (!(product.discountPrice <= priceRange)) {
      return false;
    }
    if (rating && !(product.ratings >= rating)) {
      return false;
    }
    if (categories.length > 0 && !categoryMatch) {
      return false;
    }
    if (brands.length > 0 && !brandMatch) {
      return false;
    }
    if (esrbRatings.length > 0 && !esrbRatingMatch && product.category === 'game') {
      return false;
    }
    if (platforms.length > 0 && !platformMatch && product.category === 'game') {
      return false;
    }
    if (!outOfStock && product.inStock === false) {
      return false;
    }
    if (fastDelivery && !product.fastDelivery) {
      return false;
    }
    return true;
  });
  return filteredProducts;
};
