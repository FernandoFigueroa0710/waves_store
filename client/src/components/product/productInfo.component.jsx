import React from "react";

import MyButton from "../utils/button";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import faTruck from "@fortawesome/fontawesome-free-solid/faTruck";
import faCheck from "@fortawesome/fontawesome-free-solid/faCheck";
import faTimes from "@fortawesome/fontawesome-free-solid/faTimes";

const ProductInfo = ({ productDetail }) => {
    const { name, description } = productDetail;
    return (
        <div>
            <h1>{name}</h1>
            <div>{description}</div>
        </div>
    );
};

export default ProductInfo;
