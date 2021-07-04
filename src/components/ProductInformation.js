import React from 'react';
import styled from 'styled-components';
import StarIcon from '@material-ui/icons/Star';
import StarHalfIcon from '@material-ui/icons/StarHalf';
import CurrencyFormat from 'react-currency-format';

const ProductInformationStyles = styled.div`

    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 20px;
    background-color: white;

    @media (min-width: 992px) {
        grid-template-columns: 1fr 1fr;
    }

    hr {
        display: block;
        height: 1px;
        border-width: 0;
        border-top: 1px solid var(--light-grey-2);
        margin: 10px 0;
    }

    .product-photo {
        max-width: 100%;
    }

    .product-rating {
        color: var(--orange-1);
    }

    .product-details-list {
        list-style: none;
        padding: 0;

        .product-details-key {
            color: var(--light-grey-1);
        }

        .product-details-price {
            color: var(--red);
            padding-left: 10px;
            font-size: 1.3em;
        }

        .product-details-value {
            font-weight: bold;
            padding-left: 10px;
        }
    }

    ul {
        padding-left: 15px;
    }

`;

export default function ProductInformation({ product }) {
    window.scrollTo({top: 0});
    return (
        <ProductInformationStyles>
            <div className="product-left">
                <img src={product?.image} alt="Product" className="product-photo" />
            </div>
            <div className="product-right">
                <h2>{product?.title}</h2>
                <div className="product-rating"><StarIcon /><StarIcon /><StarIcon /><StarIcon /><StarHalfIcon /></div>
                <hr />
                <ul className="product-details-list">
                    <li><span className="product-details-key">Price:</span><span className="product-details-price">
                        <CurrencyFormat value={product?.price} displayType={'text'} thousandSeparator={true} prefix={'$'} decimalScale={2} fixedDecimalScale={true} />
                    </span></li>
                    <li><span className="product-details-key">Category:</span><span className="product-details-value">{product?.category}</span></li>
                </ul>
                <hr />
                <h3>About this item</h3>
                <ul className="product-about-list">
                    <li>{product?.description}</li>
                </ul>
            </div>
        </ProductInformationStyles>
    )
}