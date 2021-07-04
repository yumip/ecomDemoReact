import React, { useContext } from "react";
import styled from "styled-components";
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import ProductPreview from "../components/ProductPreview";
import useWindowWidthState from '../hooks/useWindowWidthState';
import { ProductContext } from '../contexts/StateProvider';
import { Link } from "react-router-dom";
import Slider from "react-slick";
import '../../node_modules/slick-carousel/slick/slick.css';
import "../../node_modules/slick-carousel/slick/slick-theme.css";
import shuffleArray from "../utils/shuffleArray";

// Carousel images
import carousel1 from "../assets/carousel-1.jpg";
import carousel2 from "../assets/carousel-2.jpg";
import carousel3 from "../assets/carousel-3.jpg";
import carousel4 from "../assets/carousel-4.jpg";
import carousel5 from "../assets/carousel-5.jpg";
import mobileCarousel1 from '../assets/carousel-1-mobile.jpg';
import mobileCarousel2 from '../assets/carousel-2-mobile.jpg';
import mobileCarousel3 from '../assets/carousel-3-mobile.jpg';
import mobileCarousel4 from '../assets/carousel-4-mobile.jpg';

const desktopCarouselImages = [carousel1, carousel2, carousel3, carousel4, carousel5];
const mobileCarouselImages = [mobileCarousel1, mobileCarousel2, mobileCarousel3, mobileCarousel4];

const HomeStyles = styled.div`

    display: flex;
    flex-direction: column;
    max-width: 1500px;
    margin: 0 auto;
    background-color: var(--light-grey-2);
    
    .carousel {
        margin-bottom: 0;
        mask-image: none;
    }

    .product-grid {
        display: grid;
        width: 100%;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        grid-template-rows: 420px 200px 420px 420px 200px 420px 420px;
        grid-template-areas: "row1" "slider1" "row3" "row4" "slider2" "row5" "row6";
        grid-auto-rows: 0; /* set height to 0 for autogenerated grid rows */
        overflow-y: hidden; /* hide grid items that overflow */
        justify-items: center;
        box-sizing: border-box;
        padding: 10px;

        > * {
            box-sizing: border-box;
            background-color: white;
            padding: 10px 20px;
            z-index: 2;
            text-decoration: none;
            margin: 10px;
        }

        .sliderOne {
            grid-area: slider1;
        }

        .sliderTwo {
            grid-area: slider2;
        }

        .slick-slider {
            background-color: white;
            width: calc(100% - 20px);
            grid-column: 1 / -1;
            padding: 10px 30px;

            .slick-arrow::before {
                color: var(--light-grey-1);
            }

            .slick-prev {
                left: 5px;
            }

            .slick-next {
                right: 5px;
            }

            .slider-image {
                max-height: 160px;
                height: 90%;
                width: auto;
                padding: 0 20px;
            }
        }
    }

    @media (min-width: 567px) {

        .carousel {
            margin-bottom: -11.5%;
            mask-image: linear-gradient(to bottom, rgba(0,0,0,1), rgba(0,0,0,0.9), rgba(0,0,0,0));
        }

        .product-grid {
            grid-template-rows: 420px 200px 420px 200px 420px;
            grid-template-areas: "row1" "slider1" "row3" "slider2";
        }

        
    }
`;

export default function Home() {

    const windowWidth = useWindowWidthState();
    const products = useContext(ProductContext);

    const sliderSettings = {
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        initialSlide: 0,
        autoplay: true,
        autoplaySpeed: 3000,
        variableWidth: true,
        responsive: [
            {
              breakpoint: 992,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
              }
            },
            {
              breakpoint: 768,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
                initialSlide: 2
              }
            },
            {
              breakpoint: 576,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1
              }
            }
          ]
      };

    return (
        <HomeStyles>
            <Carousel 
                className="carousel"
                showStatus={false}
                showIndicators={false}
                showThumbs={false}
                autoPlay={true}
                interval={6000}
                infiniteLoop={true}
            >
                {windowWidth > 579 ? desktopCarouselImages.map((image, i) => (
                    <div key={`desktop-carousel-banner-${i}`}>
                        <img src={image} alt="desktop carousel banner" />
                    </div>
                )) : mobileCarouselImages.map((image, i) => (
                    <div key={`mobile-carousel-banner-${i}`}>
                        <img src={image} alt="mobile carousel banner" />
                    </div>
                ))}
            </Carousel>
            <div className="product-grid">
                {products && shuffleArray(products).map(product => (
                    <Link to={`/product/${product.id}`} className="grid-item" key={`product-grid-item-${product.id}`}><ProductPreview  image={product.image} title={product.title} /></Link>
                ))}
                <Slider className="sliderOne" {...sliderSettings}>
                    {products && shuffleArray(products).map(product => (
                        <Link to={`/product/${product.id}`} key={`slider-one-item-${product.id}`}><img className="slider-image" alt={product.title} src={product.image} /></Link>
                    ))}
                </Slider>
                <Slider className="sliderTwo" {...sliderSettings}>
                    {products && shuffleArray(products).map(product => (
                        <Link to={`/product/${product.id}`} key={`slider-two-item-${product.id}`}><img className="slider-image" alt={product.title} src={product.image} /></Link>
                    ))}
                </Slider>
            </div>
        </HomeStyles>
    )
}