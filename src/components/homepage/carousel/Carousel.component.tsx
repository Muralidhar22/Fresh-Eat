import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";

import styles from "./Carousel.styles.module.css";

import slideOneDesktop from "../../../assets/carousel1_1920x720.jpg";
import slideOneTablet from "../../../assets/carousel1_1083x1222.jpg";
import slideOneMobile from "../../../assets/carousel1_767x1175.jpg";
import slideTwoDesktop from "../../../assets/carousel2_1920x720.jpg";
import slideTwoTablet from "../../../assets/carousel2_1083x1222.jpg";
import slideTwoMobile from "../../../assets/carousel2_767x1175.jpg";
import slideThreeDesktop from "../../../assets/carousel3_1920x720.jpg";
import slideThreeTablet from "../../../assets/carousel3_1083x1222.jpg";
import slideThreeMobile from "../../../assets/carousel3_767x1175.jpg";

type SlidesType = {
    _id: number,
    desktop: any,
    tablet: any,
    mobile: any,
    alt: string,
    theme: 'light' | 'dark',
    actionItem: {
        content: {
            heading: string,
            para: string,
            actionButtonText: string,
            tag?: string
        }
        pos: {
            desktop: 'left' | 'right'
        }
    }
}

const slides: SlidesType[] = [
    {
        _id: 1,
        desktop: slideOneDesktop,
        tablet: slideOneTablet,
        mobile: slideOneMobile,
        alt: "Cover art from games that are part of the Xbox & Bethesda Anniversary Collection including Microsoft Flight Simulator, Forza Horizon 5, Age of Empires IV, Fallout, and Dishonored®",
        theme: "dark",
        actionItem: {
            content: {
                heading: "Anniversary Collection",
                para: "Celebrate the joy of gaming with us",
                actionButtonText: "get it now"
            },
            pos: {
                desktop: "right",
            }
        }

    },
    {
        _id: 2,
        desktop: slideTwoDesktop,
        tablet: slideTwoTablet,
        mobile: slideTwoMobile,
        alt: "Valheim, two characters in dark woods sitting by a large campfire.",
        theme: "dark",
        actionItem: {
            content: {
                heading: "Valheim",
                para: "Play now with Game X Pass or purchase",
                actionButtonText: "get it now",
            },
            pos: {
                desktop: "left",
            }
        }
    },
    {
        _id: 3,
        desktop: slideThreeDesktop,
        tablet: slideThreeTablet,
        mobile: slideThreeMobile,
        alt: "Sojourn, Junker Queen, and Kiriko pose confidently among the clouds.",
        theme: "light",
        actionItem: {
            content: {
                heading: "Overwatch 2",
                para: "Play Season1 now featuring epic 5v5 combat and 35 unique heroes",
                actionButtonText: "get it now",
                tag: "play free now"
            },
            pos: {
                desktop: "left",
            }
        }
    }
]
const INITIAL_STATE = 1
const Carousel = () => {
    const [currentSlide, setCurrentSlide] = useState<number>(INITIAL_STATE)
    const [slideMoving, setSlideMoving] = useState<boolean>(false)
    const firstSlideRef = useRef<HTMLLIElement>(null);

    useEffect(() => {
        moveSlide(currentSlide)
        const intervalId = setInterval(() => {
            if (currentSlide < 3) {
                setCurrentSlide((prevSlide) => prevSlide + 1)
            }

            if (currentSlide === 3) {
                setCurrentSlide(1);
            }
        }, 4000);

        return () => {
            clearInterval(intervalId);
        };
    }, [currentSlide]);

    const moveSlide = (slideNumber: number) => {
        if (firstSlideRef.current !== null) {
            switch (slideNumber) {
                case 1:
                    firstSlideRef.current.style.marginLeft = "0%";
                    break;
                case 2:
                    firstSlideRef.current.style.marginLeft = "-100%";
                    break;
                case 3:
                    firstSlideRef.current.style.marginLeft = "-200%";
                    break;
                default:
                    console.error(`firstSlideRef current value:`, firstSlideRef.current)
            }
        }
    }
    const onValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSlideMoving(true);
        moveSlide(Number(e.target.value))
        setTimeout(() => {
            setCurrentSlide(Number(e.target.value))
            setSlideMoving(false)
        }, 2000)
    }

    return (
        <section className={styles.carouselContainer} role="tabpanel" tabIndex={-1}>
            <ol className={styles.slideshowContainer}>
                {
                    slides.map((slide, idx) => (
                        <li key={idx}
                            className={`${styles.slide}`}
                            ref={slide._id === 1 ? firstSlideRef : null}>
                            <picture>
                                <source className={styles.slideImg} media="(min-width:1084px)" srcSet={slide.desktop} />
                                <source className={styles.slideImg} media="(min-width: 768px)" srcSet={slide.tablet} />
                                <source className={styles.slideImg} media="(min-width: 0px)" srcSet={slide.mobile} />
                                <img className={styles.slideImg} src={slide.desktop} alt={slide.alt} />
                            </picture>
                        </li>
                    ))
                }
            </ol>
            {!slideMoving &&
                slides.map((slideContent) => (
                    slideContent._id === currentSlide && (
                        <div data-theme={slideContent.theme} className={`${styles.actionItem}
                                         ${slideContent.actionItem.pos.desktop === "left" ? styles.actionItemPosLeft : ''}
                                         ${slideContent.actionItem.pos.desktop === "right" ? styles.actionItemPosRight : ''}`}>
                            <h1>
                                {slideContent.actionItem.content.heading}
                            </h1>
                            <p>{slideContent.actionItem.content.para}</p>
                            {slideContent.actionItem.content.tag && <span>{slideContent.actionItem.content.tag}</span>}
                            <Link to="/shop" className={`text-uppercase cursor-pointer ${styles.actionLink}`}>{slideContent.actionItem.content.actionButtonText}</Link>
                        </div>
                    )
                ))
            }
            <div className={styles.sliderTabGroup} role="tablist">
                {
                    slides.map((slide) => (
                        <>
                            <label htmlFor={`slide${slide._id}`} className="sr-only">slide{slide._id}</label>
                            <input role="tab" id={`slide${slide._id}`} tabIndex={slide._id === 1 ? 0 : -1}
                                value={slide._id} type="radio" name="slide" data-index={slide._id} key={slide._id} className={styles.dot} checked={currentSlide === slide._id}
                                onChange={onValueChange} />
                        </>
                    ))
                }
            </div>
        </section>

    )
}

export default Carousel;