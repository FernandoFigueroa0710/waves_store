//Server Routes

export const USER_SERVER = "http://localhost:3002/api/users";
export const PRODUCTS_SERVER = "http://localhost:3002/api/products";
export const PRODUCT_SERVER = "http://localhost:3002/api/product";

//Reusable functions

export function setCartItems(userCart, items) {
    userCart.map(cartItem => {
        items.map(item => {
            if (cartItem.id === item._id) {
                item.quantity = cartItem.quantity;
            }
        });
    });
    return items;
}

export function removeCartItems(data) {
    data.cart.forEach(cartItem => {
        data.cartDetail.forEach((cartDetailItem, index) => {
            if (cartItem.id === cartDetailItem._id) {
                cartDetailItem[index].quantity = cartItem.quantity;
            }
        });
    });
    return data;
}
