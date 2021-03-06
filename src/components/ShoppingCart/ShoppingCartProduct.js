import React from 'react';
import styled from 'styled-components';
// import CustomizedCheckbox from '../common/CustomizedCheckbox';
import DropdownQuantity from '../common/DropdownQuantity';
import { Link } from "react-router-dom";

const ProductContainer = styled.div`
    width: 100%;
    height: auto;
    min-width: 642px;
    min-height: 180px;
    margin: 12px 0;
    &:after {
        content: "";
        clear: both;
        display: table;
    }
    &:before {
        content: "";
    }
    display: flex;
    justify-content: center;
    align-items: flex-start;
`;
const ItemInfo = styled.div`
    position: relative;
    margin-right: 2%;
    float: left;
    margin-left: 220px;
    width: 100%;

    @media screen and (max-width: 579px) {
         margin-left: 130px;
    }
`;
const ItemPrice= styled.div`
    float: right;
    font-size: 18px;
    font-weight: 600;
    line-height: 2;
`;
const Details = styled.ul`
     padding-left: 220px;
    width: 100%;
    list-style: none; 
    padding: 0; 
    margin: 0; 
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    flex-direction: column;
`;
const Detail = styled.li`
    width: 100%;
    font-size: 12px;
    margin: 2px 0;
    &:nth-child(2) {
        color: var(--green);
    }
`;
const Image = styled.div`
    width: 180px;
    margin-left: -210px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    & img {
        object-fit: cover;
        width: 180px;
        height: 180px;
    }

   @media screen and (max-width: 579px) {
         width: 100px;
         margin-left: -130px;
         & img {
             width: 100px;
             height: 100px;
         }
     }

    &:hover {
        cursor: pointer;
    }
    
`;
const Manipulations = styled.div`
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-wrap: wrap;
`;
const Manipulation = styled.div`
    width: auto;
`;

const LinkStyle = styled.div`
    font-size: 12px;
    color: var(--dark-green);
    text-decoration: none; 
    &:hover {
        color: var(--red);
        text-decoration: underline;
        cursor: pointer;
    }
`;
const Divider = styled.div`
    margin: 10px;
    width: 1px;
    background: #ddd;
    height: 14px;
`;


function ShoppingCartProduct({product, remove, save}) {
  return (
    <>
        <ProductContainer>
                <ItemInfo>
                    <Image>
                        <Link to="/" >
                            <img src={product?.image} alt={product?.title} />
                        </Link>
                    </Image>
                    <Details>
                        <Detail>
                            <LinkStyle  style={{lineHeight: "1.6", fontWeight: "600", fontSize: "18px"}}>{product?.title}</LinkStyle>
                        </Detail>
                        <Detail style={{margin: '10px 0'}}>In Stock</Detail>
                    </Details>
                    <Manipulations>
                        <DropdownQuantity 
                            product={product}
                        />
                        <Divider />
                        <Manipulation>
                            <LinkStyle onClick={remove}>Delete</LinkStyle>
                        </Manipulation>
                        <Divider />
                        <Manipulation>
                            <LinkStyle onClick={save}>Move to Wishlist</LinkStyle>
                        </Manipulation>
                    </Manipulations>
                </ItemInfo>
                <ItemPrice>${product?.price}</ItemPrice>
        </ProductContainer>
    </>
  );
}

export default ShoppingCartProduct;