import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import ShopIcon from '@material-ui/icons/Shop';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import LockIcon from '@material-ui/icons/Lock';
import CurrencyFormat from 'react-currency-format';
import { useStateValue } from "../contexts/StateProvider";
import DropdownQuantity from './common/DropdownQuantity';

const AddToShoppingCartStyles = styled.div`
   min-width: 250px;
   height: 430px;
   padding: 18px;
   display: flex;
   flex-direction: column;
   border: 1px solid var(--light-grey-2);
   border-radius: 5px;
   background-color: white;

   > * {
       margin: 5px 0;
   }

   .price-primary {
       font-size: 18px;
       color: var(--red);
   }

   .price-secondary {
       color: var(--light-grey-1);
   }

   .details-value {
       font-weight: bold;
   }

   .stock-status {
       font-size: 18px;
       color: var(--green);
   }

   button {
       border-radius: 3px;
       border: solid 0.5px;
       padding: 3px;
       display: flex;
       align-items: center;
       justify-content: center;
       min-height: 36px;
       width: 100%;

       :hover {
           cursor: pointer;
           opacity: 0.8;
       }

       .icon {
           color: white;
           background-color: black;
           padding: 2px;
           border-radius: 3px;
       }

       .text {
           flex: 1;
       }
    }
    .buy-link {
        text-decoration: none;
        color: #000;
        width: 100%;
    }

   .cart-button {
        background-color: var(--orange-1);
        border-color: #a88734 #9c7e31 #846a29;
   }

   .buy-button {
        background-color: var(--orange-2);
        border-color: #ca7c1b #be751a #a56616;
   }

   .secure-details,
   .deliver-details {
       display: flex;
       align-items: center;
       color: var(--light-grey-1);

       .icon {
           padding-right: 5px;
       }
   }
`;

export default function AddToShoppingCart({ product }) {
    // eslint-disable-next-line no-unused-vars
    const [{basket}, dispatch] = useStateValue();

    function addProductToCart() {
        dispatch({
            type: 'ADD_TO_BASKET',
            item: product
        })
    }
    function addProductToWishlist() {
        dispatch({
            type: 'ADD_TO_WISHLIST',
            item: product
        })
    }

    return (
        <AddToShoppingCartStyles>
            <div className="price">
                <div className="price-primary">
                    <CurrencyFormat value={product?.price} displayType={'text'} thousandSeparator={true} prefix={'$'} decimalScale={2} fixedDecimalScale={true} />
                </div>
                <div className="price-secondary">+ <CurrencyFormat value={product?.price * 0.25} displayType={'text'} thousandSeparator={true} prefix={'$'} decimalScale={2} fixedDecimalScale={true} /> Delivery</div>
            </div>
            <div><span className="details-key">Arrives: </span><span className="details-value">4 - 8 Feb</span></div>
            <div><span className="details-key">Fastest delivery: </span><span className="details-value">27 - 29 Jan</span></div>
            <div className="stock-status">In stock.</div>
            <DropdownQuantity product={product} />
            <button className="cart-button" onClick={addProductToCart}>
                <AddShoppingCartIcon className="icon"/><span className="text">Add to Cart</span>
            </button>
            <Link to="/checkout" className='buy-link'>
            <button className="buy-button" onClick={addProductToCart}>
                    <ShopIcon className="icon"/><span className="text">Buy Now</span>
            </button>
            </Link>
            <div className="secure-details"><LockIcon fontSize="small" className="icon"/><span>Secure transaction</span></div>
            <div>
                <div>Ships from: Amazon US</div>
                <div>Sold by: Amazon US</div>
            </div>
            <div className="deliver-details"><LocationOnIcon fontSize="small" className="icon"/><span>Deliver to North Epping 2121</span></div>
            <button onClick={addProductToWishlist}>Add to Wish List</button>
        </AddToShoppingCartStyles>
    )
}