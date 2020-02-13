//Server Routes

export const USER_SERVER = "http://localhost:3002/api/users";
export const PRODUCTS_SERVER = "http://localhost:3002/api/products";
export const PRODUCT_SERVER = "http://localhost:3002/api/product";

//Resusable functions

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
