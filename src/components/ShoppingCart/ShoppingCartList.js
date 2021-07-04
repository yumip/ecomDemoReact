import ShoppingCartProduct from './ShoppingCartProduct';
import ShoppingCartProductSp from './ShoppingCartProductSp';
import styled from 'styled-components';
import useWindowWidthState from '../../hooks/useWindowWidthState';
import { useStateValue } from '../../contexts/StateProvider';
import { useBasketTotal, useNumOfItems } from '../../hooks/useBasket';
import CurrencyFormat from 'react-currency-format';
  
const Cart = styled.section`
    padding: 20px;
    padding-bottom: 30px;
    background: #fff;
    @media screen and (max-width: 579px) {
        padding: 0;
    }
`;
const Top = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: aling-items;
    flex-direction: column;
    padding-bottom: 2px;
    border-bottom: solid 1px #ddd;
`;
const Title = styled.div`
    font-size: 28px;
    color: #0f1111;
    line-height: 1.5;
`;

// const Link = styled.a`
//     font-size: 14px;
//     color: var(--dark-green);
//     text-decoration: none; 
//     &:hover {
//         color: var(--red);
//         text-decoration: underline;
//         cursor: pointer;
//     }
// `;
const PriceTag = styled.div`
    width: 100%;
    text-align: right;
    font-size: 14px;
    color: #565959;
`;
const ProductContainer = styled.div`
    margin: 12px 0;
    border-bottom: solid 1px #ddd;
`;
const Subtotal = styled.div`
    width: 100%;
    text-align: right;
    font-size: 18px;
`;

function ShoppingCartList({products}) {
    const windowWidth = useWindowWidthState();
    // eslint-disable-next-line no-unused-vars
    const [{basket, wishlist}, dispatch] = useStateValue();
    const subtotal = useBasketTotal();
    const numOfItems = useNumOfItems();
    const itemsText = numOfItems === 1 ? 'item' : 'items'
    //Add firebase with useEffect later...
    const removeFromBasket = (id) => {
        dispatch({
            type: 'REMOVE_FROM_BASKET',
            id: id,
        })
    }
    // const removeFromWishlist = (id) => {
    //     dispatch({
    //         type: 'REMOVE_FROM_WISHLIST',
    //         id: id,
    //     })
    // }
    // const addToWishlist = (id) => {
    //     dispatch({
    //         type: 'ADD_TO_WISHLIST',
    //         id: id,
    //     })
    // }
    const moveToWishlist = (id) => {
        dispatch({
            type: 'MOVE_TO_WISHLIST',
            id: id,
        })
    }
    const setQuantity = (id, n) => {
        dispatch({
            type: 'SET_QUANTITY',
            id: id,
            quantity: n
        })
    }
    // const setWishlistQuantity = (id, n) => {
    //     dispatch({
    //         type: 'SET_WISHLIST_QUANTITY',
    //         id: id,
    //         quantity: n
    //     })
    // }
    // const MoveToWishlist = (id) => {
    //     removeFromBasket(id);
    //     setWishlistQuantity(id, 1);
    //     addToWishlist(id);
    // }
    return (
        <Cart>
            { windowWidth > 579 ? (
                <Top>
                    <Title>Shopping Cart</Title>
                    {/* <Link>Deselect all items</Link> */}
                    <PriceTag>Price</PriceTag>
                </Top>
            ) : ("")}
            { windowWidth > 579 ? (
                products.map((product, i) => {
                    return (
                        <ProductContainer key={i}>
                            <ShoppingCartProduct 
                                product={product}
                                remove={() => removeFromBasket(product.id)}
                                save={() => moveToWishlist(product.id)}
                            />
                        </ProductContainer>
                    )
                })
            ) : (
                products.map((product, i) => {
                    return (
                        <ProductContainer key={i}>
                            <ShoppingCartProductSp 
                                product={product}
                                remove={() => removeFromBasket(product.id)}
                                save={() => moveToWishlist(product.id)}
                                setQuantity={setQuantity} 
                            />
                        </ProductContainer>
                    )
                })
            )}
            { windowWidth > 579 ? (
                <Subtotal>
                    Subtotal ({numOfItems} {itemsText}): 
                    <span style={{fontWeight: "600"}}>
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
            ) : ("")}
        </Cart>
    );
}

export default ShoppingCartList;