import { useState, useRef } from "react";

import ProductType from "../../../types/ProductType";

import styles from "./ProductCarousel.styles.module.css";

type ProductCarouselPropsType = {
    product: ProductType
}

const ProductCarousel = ({ product }: ProductCarouselPropsType) => {
    const [currentSlide, setCurrentSlide] = useState(1);
    const firstSlideRef = useRef<HTMLLIElement>(null);

    const productImages = product?.media.filter(media => media.type === "image")
    const productVideo = product?.media.filter(media => media.type === "video")
    return (
        <div>
            <section className={styles.productCarouselContainer}>
                <ul className={styles.slideshowContainer}>
                    {productImages?.length > 0 &&
                        productImages.map((image, idx) => (
                            <li key={image.source} className={styles.slide} ref={idx + 1 === 1 ? firstSlideRef : null}>
                                <img className={styles.slideContent} src={image.source} alt={product.name} />
                            </li>
                        ))
                    }
                    {productVideo?.length > 0 &&
                        productVideo.map((video, idx) => (
                            <li key={video.source} className={styles.slide}>
                                <iframe className={styles.slideContent} src={video.source} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                            </li>
                        ))

                    }
                </ul>
            </section>
            <div className={styles.sliderTabGroup}>
                {productImages?.length > 0 &&
                    productImages.map((image, idx) => (
                        <span key={`slideBtn-${image.source}`} className={styles.slideButtonContainer}>
                            <button className="cursor-pointer">
                                <span>
                                    <img width="50px" height="50px" src={image.source} />
                                </span>
                            </button>
                        </span>
                    ))

                }
                {productVideo?.length > 0 &&
                    productVideo.map((video, idx) => (
                        <span key={`slideBtn-${video.source}`} className={styles.slideButtonContainer}>
                            <button className="cursor-pointer">
                                <span>
                                    <iframe width="50px" height="50px" className={styles.slideContent} src={video.source} title="YouTube video player" frameBorder="0"></iframe>
                                </span>
                            </button>
                        </span>
                    ))

                }
            </div>
        </div>
    )
}

export default ProductCarousel;