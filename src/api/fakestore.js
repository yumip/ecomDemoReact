export const getProductData = async() => fetch('https://fakestoreapi.com/products')
            .then(res=>res.json());