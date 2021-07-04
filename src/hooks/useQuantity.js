import { useState } from 'react';
import { useStateValue } from "../contexts/StateProvider";

function useQuantity(product) {
    const initialVal = product.quantity ? product.quantity : 1;
    const [presetQuantity, setPresetQuantity] = useState(initialVal);
    const [, dispatch] = useStateValue();
    const setQuantity = (n) => {
        if (n===0) {
            dispatch({
                type: 'REMOVE_FROM_BASKET',
                id: product.id,
            })
        } else {
            setPresetQuantity(n)
            dispatch({
                type: 'SET_QUANTITY',
                id: product.id,
                quantity: n
            })
        }
    }
    return [presetQuantity, setQuantity]
}

export default useQuantity;