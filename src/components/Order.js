import React from 'react';
import styled from 'styled-components';
import CheckoutProduct from './CheckoutProduct';
import CurrencyFormat from 'react-currency-format';
import moment from 'moment';
const OrderStyle = styled.section`
    width: 100%;
    border: solid 1px #ddd;
    border-radius: 5px;
    box-sizing: border-box;
    margin-bottom: 20px;
`;
const Container = styled.div`
    width: 100%;
    padding: 20px;
    box-sizing: border-box;
`;

const Top = styled.div`
    background: #f6f6f6;
    color: #777;
    font-size: 15px;
    height: 70px;
    width: 100%;
    border-bottom: solid 1px #ddd;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    div {
        margin: 10px 20px;
        p {
            margin: 0;
        }
    }
`;

function Order({order}) {
    return (
        <OrderStyle>
            <Top>
                <div>
                    <p>ORDER PLACED</p>
                    <p>{moment.unix(order.data?.created).format('MMMM Do, YYYY')}</p>
                </div>
                <div style={{marginLeft: "50px"}}>
                    <p>TOTAL</p>
                    <p>
                        <CurrencyFormat 
                            value={order.data?.amount / 100}
                            displayType={'text'} 
                            thousandSeparator={true} 
                            prefix={'$'} 
                            decimalScale={2} 
                            fixedDecimalScale={true} 
                        />   
                    </p>
                </div>
            </Top>
            <Container>
                {order.data.basket?.map((item, i) => (
                    <CheckoutProduct product={item} key={i}/>
                ))}
            </Container>
        </OrderStyle>
    )
}

export default Order
