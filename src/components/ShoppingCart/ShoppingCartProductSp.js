import React, { useState } from 'react';
import styled from 'styled-components';
import ProductQuantity from '../common/ProductQuantity';

const ProductContainer = styled.div`
    width: 100%;
    height: auto;
    min-height: 100px;
    margin: 12px 0px;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    flex-direction: column;
    box-sizing: border-box;
    padding: 0 12px;
`;
const ItemInfo = styled.div`
    position: relative;
    margin-right: 2%;
    width: 100%;
    display: flex;
    align-items: flex-start;
    
`;
const Details = styled.ul`
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
        color: var(--red);
        font-size: 15px;
    }
    &:nth-child(3) {
        color: var(--green);
    }
`;
const Image = styled.a`
    width: 100px;
    margin-right: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    & img {
        object-fit: cover;
        width: 100px;
        height: 100px;
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
    margin-top: 10px;
`;
const Manipulation = styled.div`
    width: auto;
    margin: 0 5px;
    padding: 8px;
    border: solid 1px #aaa;
    border-radius: 3px;
    font-size: 13px;
    background-image: linear-gradient(to bottom, #fcfcfd 0%, #e7e9ec 100%);
`;

const Link = styled.div`
    font-size: 12px;
`;

function ShoppingCartProduct({product, remove, setQuantity, save}) {
    //Checkbox from material ui
    // eslint-disable-next-line no-unused-vars
    const [checked, setChecked] = useState(true);
    // eslint-disable-next-line no-unused-vars
    const handleChange = (event) => {
      setChecked(event.target.checked);
    };
  return (
    <>
        <ProductContainer>
            <ItemInfo>
                <Image>
                    <img src={product.image} alt={product.title}/>
                </Image>
                <Details>
                    <Detail>
                        <Link style={{color: "#000", fontSize: "15px"}}>{product.title}</Link>
                    </Detail>
                    <Detail>${product.price}</Detail>
                    <Detail>In Stock</Detail>
                </Details>
            </ItemInfo>
            <Manipulations>
                <ProductQuantity 
                    setQuantity={setQuantity} 
                    remove={remove}
                    quantity={product.quantity ? product.quantity : 1}
                    id={product.id}
                />
                <div style={{display: "flex", marginLeft: "20px"}}>
                    <Manipulation>
                        <Link onClick={remove}>Delete</Link>
                    </Manipulation>
                    <Manipulation>
                        <Link onClick={save}>Move to wishlist</Link>
                    </Manipulation>
                </div>
            </Manipulations>
        </ProductContainer>
    </>
  );
}

export default ShoppingCartProduct;