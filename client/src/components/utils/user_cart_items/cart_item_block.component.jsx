import React from "react";

const CartItemBlock = ({ userInfo, removeItem }) => {
    const renderCartImage = images => {
        if (images.length > 0) {
            return images[0].url;
        } else {
            return "images/image_not_availble.png";
        }
    };
    const renderCartItems = () =>
        userInfo.cartDetail ? (
            userInfo.cartDetail.map(cartItem => (
                <div className="user_product_block" key={cartItem._id}>
                    <div
                        className="image"
                        style={{
                            background: `url(${renderCartImage(
                                cartItem.images
                            )}) no-repeat`,
                            minWidth: "150px",
                            minHeight: "150px",
                        }}
                    ></div>
                    <div className="item">
                        <h4>Product name</h4>
                        <div>
                            {cartItem.brand.name}
                            {cartItem.name}
                        </div>
                    </div>
                    <div className="item">
                        <h4>Quantity</h4>
                        <div>{cartItem.quantity}</div>
                    </div>
                    <div className="item">
                        <h4>Price</h4>
                        <div>${cartItem.price}</div>
                    </div>
                    <div className="item btn">
                        <div
                            className="cart_remove_btn"
                            onClick={() => removeItem(cartItem._id)}
                        >
                            Remove item
                        </div>
                    </div>
                </div>
            ))
        ) : (
            <div>&nbsp;</div>
        );
    return <div>{(this, renderCartItems())}</div>;
};

export default CartItemBlock;
