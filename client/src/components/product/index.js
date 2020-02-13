import React, { Component } from "react";
import ProductInfo from "./productInfo.component";
import ProductImages from "./productImages.component";
import PageTop from "../../components/utils/page_top";

import { connect } from "react-redux";
import {
    getProductDetail,
    clearProductDetail,
} from "../../redux/actions/products_actions";

class ProductDetail extends Component {
    componentDidMount() {
        const id = this.props.match.params.id;
        this.props.dispatch(getProductDetail(id));
    }
    componentWillUnmount() {
        this.props.dispatch(clearProductDetail());
    }
    addToCarthandler = () => {};
    render() {
        const id = this.props.match.params.id;
        const { productDetail } = this.props.products;
        return (
            <div>
                <PageTop title="Product Detail" />
                <div className="container">
                    {this.props.products.productDetail ? (
                        <div className="product_detail_wrapper">
                            <div className="left">
                                <div style={{ width: "500px" }}>
                                    <ProductImages />
                                </div>
                            </div>
                            <div className="right">
                                <ProductInfo
                                    addToCart={id => this.addToCarthandler(id)}
                                    productDetail={productDetail}
                                />
                            </div>
                        </div>
                    ) : (
                        "Circular Progress"
                    )}
                </div>
            </div>
        );
    }
}
const mapStateToProps = state => {
    return {
        products: state.products,
    };
};
export default connect(mapStateToProps)(ProductDetail);
