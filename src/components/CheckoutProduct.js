import React from 'react';
import styled from 'styled-components';
import CurrencyFormat from 'react-currency-format';

const ProductContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    box-sizing: border-box;
`;
const ItemInfo = styled.div`
    font-size: 14px;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    flex-direction: column;
    margin-left: 10px;
    h3 {
        font-wegith: 300;
        margin: 5px 0;
    }
    p {
        margin: 3px 0;
    }
`;
const Image = styled.div`
    width: 160px;
    min-width: 160px;
    max-width: 160px;
    height: 160px;
    overflow: hidden;
    img {
        width: 100%;
    }
`;



function CheckoutProduct({product}) {
    if (!product.quantity) product.quantity = 1;
  return (
        <ProductContainer>
            <Image>
                <img src={product.image} alt={product.title} />
            </Image>
            <ItemInfo>
                <h3>{product.title}</h3>
                <p>Price: 
                    <CurrencyFormat 
                        value={product.price} 
                        displayType={'text'} 
                        thousandSeparator={true} 
                        prefix={'$'} 
                        decimalScale={2} 
                        fixedDecimalScale={true} 
                        style={{marginLeft: '3px'}}
                    />
                </p>
                <p>Quantity: {product.quantity}</p>
                <h4>Unit Price:
                    <CurrencyFormat 
                        value={product.price * product.quantity} 
                        displayType={'text'} 
                        thousandSeparator={true} 
                        prefix={'$'} 
                        decimalScale={2} 
                        fixedDecimalScale={true} 
                        style={{marginLeft: '3px'}}
                    />
                </h4>
            </ItemInfo>
        </ProductContainer>
  );
}

export default CheckoutProduct;