import ProductType from "../../../types/ProductType";
import AddToCart from "../../cart-button/cartButton.component";
import WishlistButton from "components/wishlist-button/WishlistButton.component";

type ProductInfoPropsType = {
    product: ProductType
}

const ProductInfo = ({ product }: ProductInfoPropsType) => {
    return (
        <div>
            <h1>{product.name}</h1>
            <h2>{product.brand}</h2>
            <p>
                <span>{product.discountPrice}</span>
                <del><span className="sr-only" aria-label="old price"></span>{product.price}</del>
                <span>({product.discount}% Off)</span>
            </p>
            <hr />
            {product?.genre &&
                <p>
                    <span>Genre:</span>
                    {
                        product.genre.map(genre => <span key={genre}>{genre}&nbsp;</span>)
                    }
                </p>
            }
            <p>
                <span>Description:</span>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus ducimus amet at dolorem sit magni earum quidem illo perspiciatis iure deserunt recusandae minus ullam similique libero tempore, beatae, nisi animi!
            </p>
            <AddToCart
                productId={product._id}
            />
            <WishlistButton
                wishlistElementType="button"
                productId={product._id}
            />
        </div>
    )
}

export default ProductInfo