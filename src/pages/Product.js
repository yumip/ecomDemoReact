import React, { useContext } from 'react';
import styled from 'styled-components';
import ProductInformation from '../components/ProductInformation';
import AddToShoppingCart from '../components/AddToShoppingCart';
import { ProductContext } from '../contexts/StateProvider';
import { Link } from "react-router-dom";
import Header from '../components/Header';

const ProductPageStyles = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 10px;
    padding: 20px;
    max-width: 1500px;
    margin: 0 auto;
    background-color: white;
    min-height: 85vh;

    @media (min-width: 768px) {
        grid-template-columns: 1fr auto;
    }
`

const ProductErrorPageStyles = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 50px;
    min-height: 80vh;
`;

export default function Product({ match }) {

    const {
        params: { productId }
    } = match;

    const products = useContext(ProductContext);
    const currentProduct = products?.find(product => product.id === parseInt(productId));

    return (
        <>
            <Header />
            {currentProduct?
                <ProductPageStyles>
                    <ProductInformation product={currentProduct} />
                    <AddToShoppingCart product={currentProduct} />
                </ProductPageStyles>
            : <ProductErrorPageStyles>
                <h2>Sorry! The product you are looking for has not been found!</h2>
                <Link to="/">Back to Homepage</Link>
            </ProductErrorPageStyles>}
        </>
    )
}