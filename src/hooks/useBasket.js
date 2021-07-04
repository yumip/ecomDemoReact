import { InfoRounded } from '@material-ui/icons';
import { useStateValue } from '../contexts/StateProvider';

export function useBasketTotal() {
    const [{ basket }] = useStateValue();
    return  basket.reduce((sum, d) => {
        if (d.quantity && typeof(d.quantity) == "number") {
            return d.price * d.quantity + sum
        } 
        return d.price + sum
    }, 0);
}

export function useNumOfItems() {
    const [{ basket }] = useStateValue();
    return basket.reduce((sum, product) => {
        const quantity = product.quantity ? product.quantity : 1
        return sum + quantity        
    }, 0)
}

