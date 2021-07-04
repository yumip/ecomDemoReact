import React, { createContext, useContext, useReducer, useState, useEffect } from "react";
import { getProductData } from '../api/fakestore';
// Prepares the data layer
export const StateContext = createContext();
export const ProductContext = createContext();

// Wrap the app and provide the data layer to every component
export const StateProvider = ({ reducer, initialState, children }) => {
    const [products, setProducts] = useState(null);
    useEffect(() => {
        !(products) && getProductData()
                        .then(res => setProducts(res))
    }, [products])
    return (
        <StateContext.Provider value={useReducer(reducer, initialState)}>
            <ProductContext.Provider value={products}>
                {children}
            </ProductContext.Provider>
        </StateContext.Provider>
    )
};

// Pull information from the data layer
export const useStateValue = () => useContext(StateContext);