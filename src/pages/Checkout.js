import styled from 'styled-components';
import { Link } from 'react-router-dom';
import ShoppingCartList from '../components/ShoppingCart/ShoppingCartList';
import ProceedToCheckout from '../components/ShoppingCart/ProceedToCheckout';
import Wishlist from '../components/ShoppingCart/Wishlist';
import { useStateValue } from '../contexts/StateProvider';

const ShoppingCartPage = styled.section`
    width: 100%;
    height: 100%;
    background: #eaeded;
    // padding: 0;
    margin: 0;
    padding: 14px 18px 18px;
    box-sizing: border-box;
    min-width: 998px;
    @media screen and (max-width: 579px) {
        background: #fff;
        padding: 0;
        min-width: 332px;
    }
`;
const Container = styled.div`
    width: 100%;
    height: auto;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    @media screen and (max-width: 579px) {
        flex-direction: column;
    }
`;
const Main = styled.main`
    // margin-right: 320px;
    padding-right: 20px;
    flex-grow: 1;
    @media screen and (max-width: 579px) {
        padding: 0;
        order: 2;
    }
`;
const Aside = styled.aside`
    margin-right: 20px;
    @media screen and (max-width: 579px) {
        order: 1;
        border-bottom: solid 1px #ddd;
        width: 100%;
    }
`;
const Empty = styled.div`
    width: auto;
    background: #fff;
    padding: 30px;
    h2 { 
        font-size: 32px;
        font-weight: 300;
    }
    p {
        padding: 0;
        font-size: 14px;
    }
    min-height: 300px;
`;

function ShoppingCart() {
    // eslint-disable-next-line no-unused-vars
    const [{ basket, wishlist }, dispatch] = useStateValue();
    return (
        <ShoppingCartPage>
            <Container>
                <Main>
                    {basket.length === 0 ? (
                        <>
                        <Empty>
                            <h2>Your Amazon Cart is empty.</h2>
                            <p>Check your Saved for later items below or <Link to='/' style={{textDecoration: 'none', color: '#007185'}}>continue shopping</Link>.</p>
                        </Empty>
                        </>
                    ) : (
                        <ShoppingCartList products={basket} />
                    )}
                    {wishlist.length > 0 ? (
                        <Wishlist />
                    ) : ('')}
                </Main>
                <Aside>
                    {basket.length > 0 ? (
                        <ProceedToCheckout />
                    ) : ("")}
                </Aside>
            </Container>
        </ShoppingCartPage>
    );
}

export default ShoppingCart;