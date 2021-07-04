/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link, useHistory } from 'react-router-dom';
import { useStateValue } from '../contexts/StateProvider';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import CheckoutProduct from '../components/CheckoutProduct';
import YellowButton from '../components/common/YellowButton';
import { useBasketTotal } from '../hooks/useBasket';
import CurrencyFormat from 'react-currency-format';
import axios from '../api/axios';
import { db } from '../firebase';


const PaymentStyle = styled.section`
    width: 100%;
    height: 100%;
    background: #eaeded;
    // background: #fff;
    margin: 0;
    padding: 40px 20px;
    border: solid 1px #eaeded;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;

    @media screen and (max-width: 579px) {
        // padding: 0;
        min-width: 332px;
    }
`;
const Container = styled.div`
    background: #fff;
    max-width: 700px;
    padding: 20px;
    border-radius: 10px;
    border: solid 2px #ddd;
    box-sizing: border-box;
`;
const Address = styled.div`
    font-size: 15px;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    h1 {
        font-weight: 300;
        margin: 0;
        padding-right: 20px;
    }
    div {
        p {
            margin: 0;
            font-weight: 600;
        }
    }
`;
const ProductsStyle = styled.div`
    // margin-right: 320px;
    padding-right: 20px;
    flex-grow: 1;
    @media screen and (max-width: 579px) {
        padding: 0;
        order: 2;
    }
`;
const Title = styled.div`
    width: 100%;
    text-align: left;
    font-size: 30px;
`;
const Bottom = styled.section`
    width: 100%;
    text-align: left;
    .total {
        font-size: 20px;
        margin: 15px 0;
        span {
            font-weight: 600;
        }
    }
`;
const PaymentMethod = styled.section`
    width: 100%;
    display: flex;
    flex-direction: column;
    .card {
        width: auto;
        max-width: 500px;
        // text-align: left;
    }
    .errorMessage {
        margin-top: 10px;
        color: red;
    }
`;
const Divider = styled.div`
    height: 1px;
    width: 100%;
    border-bottom: solid 1px #bbb;
    margin: 20px 0;
`;
const Table = styled.tbody`
    td {
        width: 120px;
    }
`;

function Payment() {
    const [{ basket, user }, dispatch] = useStateValue();
    const stripe = useStripe();
    const elements = useElements();
    const orderTotal = useBasketTotal();
    const history = useHistory();

    const [error, setError] = useState(null)
    const [clientSecret, setClientSecret] = useState(true)
    const [disabled, setDisabled] = useState(true)
    const [processing, setProcessing] = useState('')
    const [succeed, setSucceed] = useState(false)

    useEffect(() => {
        const getClientSecret = async () => {
            const response = await axios({
                method: 'post',
                url: `/payments/create?total=${orderTotal * 100}`
            })
            setClientSecret(response.data.clientSecret)
        }
        getClientSecret();
        console.log("Order Total >>>", orderTotal);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [basket])

    console.log("The client secret is >>>>", clientSecret);

    const handleSubmit = async (event) => {
        console.log('Submit pressed!');
        event.preventDefault();
        setProcessing(true);
        const stringClientSecret = clientSecret.toString();
        const payload = await stripe
          .confirmCardPayment(stringClientSecret, {
            payment_method: {
              card: elements.getElement(CardElement),
            },
          })
          .then(({ paymentIntent }) => {
            if (!paymentIntent) {
              alert("The card information is invalid.");
              return;
            }
            console.log("payment", paymentIntent);
            db.collection("users")
              .doc(user?.uid)
              .collection("orders")
              .doc(paymentIntent.id)
              .set({
                basket: basket,
                amount: paymentIntent.amount,
                created: paymentIntent.created,
              });
            setError(null);
            setSucceed(true)
            setProcessing(false)
            dispatch({
              type: "EMPTY_BASKET",
            });
            history.replace("/orders");
          });
    }

    const handleChange = event => {
        console.log('event.empty', event.empty)
        setDisabled(event.empty);
        setError(event.error ? event.error.message : "");
    }
    return (
        <>
        <PaymentStyle>
            <Container>
                <Title>Review your orders</Title>
                <Divider />
                <Address>
                    <h1>Shipping to:</h1>
                    <div>
                        <p>{user?.email}</p>
                        <p>Andrew Wiggins</p>
                        <p>45 Bridgeton Street Ambler, PA 19002</p>
                    </div>
                </Address>
                <Divider />
                <ProductsStyle>
                    {basket.map((product, i) => {
                        return (
                            <CheckoutProduct 
                                key={i}
                                product={product}
                            />
                        )
                    })}
                </ProductsStyle>
                <Divider />
                <form onSubmit={handleSubmit}>
                    <PaymentMethod>
                        <h3>Payment Method</h3>
                        <div className='card'>
                            <CardElement onChange={handleChange} />
                            {error && <div className="errorMessage">{error}</div>}
                        </div>
                    </PaymentMethod>
                    <Divider />
                    <Bottom>
                        <div className='total'>
                            <span>Order Total:</span> 
                            <CurrencyFormat 
                                value={orderTotal} 
                                displayType={'text'} 
                                thousandSeparator={true} 
                                prefix={'$'} 
                                decimalScale={2} 
                                fixedDecimalScale={true} 
                                style={{marginLeft: '15px', color: '#b12704'}}
                            />    
                        </div>
                        <YellowButton 
                            type={'submit'}
                            text={"Place order"}
                            disabledCondition={processing || disabled || succeed}
                        />
                    </Bottom>
                </form>
            </Container>
            
        </PaymentStyle>
        <PaymentStyle style={{padding: '0'}}>
            <Container>
                <p>This is fake payment.</p>
                <p>Please use fake card information.</p>
                <Table>
                    <tr>
                        <td>Card number:</td>
                        <td style={{width: '180px'}}>4242 4242 4242 4242</td>
                    </tr>
                    <tr>
                        <td>MM / YY:</td>
                        <td>04 / 30</td>
                    </tr>
                    <tr>
                        <td>CVC:</td>
                        <td>444</td>
                    </tr>
                    <tr>
                        <td>ZIP:</td>
                        <td>44444</td>
                    </tr>
                </Table>
            </Container>
        </PaymentStyle>
        </>
    )
}

export default Payment;
