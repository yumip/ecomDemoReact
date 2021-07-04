import WishlistProduct from './WishlistProduct';
import styled from 'styled-components';
import { useStateValue } from '../../contexts/StateProvider';
  
const Cart = styled.section`
    padding: 20px;
    margin-top: 20px;
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
const ProductContainer = styled.div`
    margin: 12px 0;
    border-bottom: solid 1px #ddd;
`;

function Wishlist() {
    // eslint-disable-next-line no-unused-vars
    const [{wishlist}, dispatch] = useStateValue();
    const removeFromWishlist = (id) => {
        dispatch({
            type: 'REMOVE_FROM_WISHLIST',
            id: id,
        })
    }
    const moveToBasket = (id) => {
        dispatch({
            type: 'MOVE_TO_BASKET',
            id: id,
        })
    }
    return (
        <Cart>
            <Top>
                <Title>Wishlist</Title>
            </Top>
            {
                wishlist?.map((product, i) => {
                    return (
                        <ProductContainer key={i}>
                            <WishlistProduct 
                                product={product}
                                remove={() => removeFromWishlist(product.id)}
                                save={() => moveToBasket(product.id)}
                            />
                        </ProductContainer>
                    )
                })
            }
        </Cart>
    );
}

export default Wishlist;