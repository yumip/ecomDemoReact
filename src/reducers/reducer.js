export const initialState = {
    basket: [],
    wishlist: [],
    user: null,
};

// Selector
// export const getBasketTotal = (basket) => {
//     if (basket) {
//         return basket.reduce((amount, item) => {
//             const basketItemQuantity = item.quantity ? item.quantity : 1
//             return item.price * basketItemQuantity + amount
//         }, 0);  
//     }
//     return 0;
// }

const reducer = (state, action) => {

    switch(action.type) {
        case 'ADD_TO_BASKET':
            let isSameItem = false;
            const returnQuantity = (product) => {
                return product.quantity ? product.quantity : 1
            } 
            state.basket.forEach(product => {
                if (product.id === action.item.id) {
                    isSameItem = true;
                }
            })
            if (isSameItem) {
                return { 
                    ...state,
                    basket: state.basket.map(product => 
                        product.id === action.item.id 
                            ? { ...product, quantity: returnQuantity(product) + returnQuantity(action.item) } 
                            : product
                    )
                };
            }
            return {
                ...state,
                basket: [...state.basket, action.item]
            };
        case 'REMOVE_FROM_BASKET':
            const index = state.basket.findIndex(
                (basketItem) => basketItem.id === action.id
            );
            let newBasket = [...state.basket];
                newBasket.splice(index, 1);
            if (index >= 0) {

            } else {
                console.warn(`Cant remove product (id: ${action.id}) as it is not in the basket!`);
            }

            return {
                ...state,
                basket: newBasket
            }
        case 'ADD_TO_WISHLIST':
            let isSameInWishlist = false;
            state.wishlist.forEach(product => {
                if (product.id === action.item.id) {
                    isSameInWishlist = true;
                }
            })
            if (isSameInWishlist) {
                return { 
                    ...state
                };
            }
            return {
                ...state,
                wishlist: [...state.wishlist, action.item]
            };
        case 'REMOVE_FROM_WISHLIST':
            const indexOfWishlist = state.basket.findIndex(
                (basketItem) => basketItem.id === action.id
            );
            let newWishlist = [...state.wishlist];
                newWishlist.splice(indexOfWishlist, 1);
            if (indexOfWishlist >= 0) {

            } else {
                console.warn(`Cant remove product (id: ${action.id}) as it is not in the basket!`);
            }

            return {
                ...state,
                wishlist: newWishlist
            }
        case "SET_USER":
            return {
                ...state,
                user: action.user
            }
        case "SET_QUANTITY":
            return {
                ...state,
                basket: state.basket.map(product => 
                            product.id === action.id ? { ...product, quantity: action.quantity } : product
                        )
            }
        case "MOVE_TO_WISHLIST":
            const moveToWishlistItem = state.basket.filter(product => product.id === action.id)[0]
            return {
                ...state,
                basket: state.basket.filter(product => product.id !== action.id),
                wishlist: [ 
                    ...state.wishlist, 
                    moveToWishlistItem
                ]
            }
        case "MOVE_TO_BASKET":
            const moveToBasketItem = state.wishlist.filter(product => product.id === action.id)[0]
            return {
                ...state,
                wishlist: state.wishlist.filter(product => product.id !== action.id),
                basket: [ 
                    ...state.basket, 
                    moveToBasketItem
                ]
            }
        case "EMPTY_BASKET":
            return {
                ...state,
                basket: []
            }
        default:
            return state;
    }

}

export default reducer;