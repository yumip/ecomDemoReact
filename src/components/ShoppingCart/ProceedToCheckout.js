import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
// import CustomizedCheckbox from '../common/CustomizedCheckbox';
import YellowButton from '../common/YellowButton';
import { useBasketTotal, useNumOfItems } from '../../hooks/useBasket';
import CurrencyFormat from 'react-currency-format';
import { useStateValue } from '../../contexts/StateProvider';

const Container = styled.section`
    width: 260px;
    height: auto;
    background: #fff;
    padding: 20px;
    padding-bottom: 30px;
    @media screen and (max-width: 579px) {
        box-sizing: border-box;
        width: 100%;
    }
`;
const Subtotal = styled.div`
    width: 100%;
    text-align: left;
    font-size: 18px;
    line-height: 1.5;
    margin-bottom: 15px;
`;
// const Gift = styled.div`
//     width: 100%;
//     text-align: left;
//     color: #0f1111;
//     font-size: 14px;
//     display: flex;
//     margin: 8px 0;
// `;

function ProceedToCheckout() {
    const [{ user }] = useStateValue();
    const subtotal = useBasketTotal();
    const numOfItems = useNumOfItems();
    const itemsText = numOfItems === 1 ? 'item' : 'items';
  return (
    
    <Container>
        <Subtotal>
            Subtotal ({numOfItems} {itemsText}): 
            <span style={{fontWeight: "600", paddingLeft: '5px'}}>
                <CurrencyFormat 
                    value={subtotal} 
                    displayType={'text'} 
                    thousandSeparator={true} 
                    prefix={'$'} 
                    decimalScale={2} 
                    fixedDecimalScale={true} 
                />
            </span>
        </Subtotal>
        {/* <Gift>
            <CustomizedCheckbox />
            <div style={{marginLeft: "5px"}}>This order contains a gift</div>
        </Gift>         */}
        {user ? (
            <Link to='/payment'>
                <YellowButton 
                    text={"Proceed to checkout"} 
                    type={'button'}
                />
            </Link>
            ) : (
            <Link to='/login'>
                <YellowButton 
                    text={"Login in & buy"} 
                    type={'button'}
                />
            </Link>
        )}
    </Container>
  );
}
  
export default ProceedToCheckout;