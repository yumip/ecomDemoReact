/* eslint-disable no-unused-vars */
import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { db } from '../firebase';
import { useStateValue } from '../contexts/StateProvider';
import Order from '../components/Order';

const OrdersStyle = styled.section`
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
    padding-bottom: 200px;

    @media screen and (max-width: 579px) {
        padding: 40px 0px;
        min-width: 332px;
    }
`;

const Divider = styled.div`
    height: 1px;
    width: 500px;
    border-bottom: solid 1px #bbb;
    margin: 20px 0;
    @media screen and (max-width: 579px) {
        width: 100%;
    }
`;

const Container = styled.div`
    background: #fff;
    max-width: 800px;
    padding: 20px;
    border-radius: 10px;
    border: solid 2px #ddd;
    box-sizing: border-box;

    h1 {
        font-weight: 300;
        font-size: 30px;  
    }
    .home-button {
    background: var(--light-grey-2);
    border-radius: 2px;
    width: 100%;
    height: 30px;
    border: 1px solid;
    margin-top: 10px;
    border-color: var(--dark-grey);
    text-decoration: none;

  }
`;


function Orders() {
    const [{basket, user}, dispatch] = useStateValue();
    const [orders, setOrders] = useState([]);
    useEffect(() => {
        if(user) {
            db
                .collection('users')
                .doc(user?.uid)
                .collection('orders')
                .orderBy('created', 'desc')
                .onSnapshot(snapshot => (
                    setOrders(snapshot.docs.map(doc => ({
                        id: doc.id,
                        data: doc.data()
                    })))
                ))
        } else {
            setOrders([])
        }
    }, [user]);

    return (
        <OrdersStyle>
            <Container>
                <h1>Your Orders</h1>
                {orders && orders.length > 0 ? (
                    orders?.map((order, i) => (
                        <Order order={order} key={i} />
                    ))
                ) : (
                    <>
                    </>
                )} 
                <>
                    <Link to={'/'}>
                        <p style={{textAlign: 'center', padding: '20px 0'}}>continue shopping</p>
                    </Link>
                </>    
            </Container>
        </OrdersStyle>
    )
}

export default Orders;