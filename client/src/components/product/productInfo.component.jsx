import React from "react";

import MyButton from "../utils/button";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import faTruck from "@fortawesome/fontawesome-free-solid/faTruck";
import faCheck from "@fortawesome/fontawesome-free-solid/faCheck";
import faTimes from "@fortawesome/fontawesome-free-solid/faTimes";

const ProductInfo = ({ productDetail }) => {
    const { name, description } = productDetail;
    console.log("HERE", productDetail);
    const showProductTags = detail => (
        <div className="product_tags">
            {detail.shipping ? (
                <div className="tag">
                    <div>
                        <FontAwesomeIcon icon={faTruck} />
                    </div>
                    <div className="tag_text">
                        <div>Free Shipping</div>
                        <div>And return</div>
                    </div>
                </div>
            ) : null}
            {detail.available ? (
                <div className="tag">
                    <div>
                        <FontAwesomeIcon icon={faCheck} />
                    </div>
                    <div className="tag_text">
                        <div>Available</div>
                        <div>in store</div>
                    </div>
                </div>
            ) : (
                <div className="tag">
                    <div>
                        <FontAwesomeIcon icon={faTimes} />
                    </div>
                    <div className="tag_text">
                        <div>Not available</div>
                        <div>pre-order only</div>
                    </div>
                </div>
            )}
        </div>
    );
    const showProductActions = detail => (
        <div className="product_actions">
            <div className="price">${detail.price}</div>
            <div className="cart">
                <MyButton
                    type="add_to_cart"
                    runAction={() => {
                        console.log("add to cart");
                    }}
                />
            </div>
        </div>
    );
    const showProductSpecifications = detail => (
        <div className="product_specifications">
            <h2>Specs:</h2>
            <div className="item">
                <strong>Frets:</strong>&nbsp;
                {detail.frets}
            </div>
            <div className="item">
                <strong>Wood:</strong>&nbsp;
                {detail.wood.name}
            </div>
        </div>
    );
    return (
        <div>
            <h1>{name}</h1>
            <p>{description}</p>
            {showProductTags(productDetail)}
            {showProductActions(productDetail)}
            {showProductSpecifications(productDetail)}
        </div>
    );
};

export default ProductInfo;