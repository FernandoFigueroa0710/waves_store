import React, { Component } from "react";
import DashboardLayout from "../../hoc/dashboardLayout";
import CartItemBlock from "../utils/user_cart_items/cart_item_block.component";
import Paypal from "../utils/paypal";

import { connect } from "react-redux";
import { getCartItems, removeCartItem } from "../../redux/actions/user_actions";

import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import faFrown from "@fortawesome/fontawesome-free-solid/faFrown";
import faSmile from "@fortawesome/fontawesome-free-solid/faSmile";

class UserCart extends Component {
    state = {
        loading: true,
        total: 0,
        showTotal: false,
        showSuccess: false,
    };

    componentDidMount() {
        let cartItems = [];
        let userCart = this.props.user.userData.cart;
        if (userCart && userCart.length > 0) {
            cartItems = userCart.map(item => item.id);
            this.props
                .dispatch(getCartItems(cartItems, userCart))
                .then(response => {
                    if (this.props.user.cartDetail.length > 0) {
                        this.calculateTotalInItems(this.props.user.cartDetail);
                    }
                });
        }
    }
    calculateTotalInItems(items) {
        let totalCart = 0;
        totalCart = items.reduce((acc, item) => {
            return acc + item.price * item.quantity;
        }, 0);
        this.setState({
            showTotal: true,
            total: parseInt(totalCart),
        });
    }
    showSuccessMessage = () => (
        <div className="cart_no_items">
            <div>{} Than you for your purchase!</div>
            <FontAwesomeIcon icon={faSmile} />
        </div>
    );
    showEmptyCartMessage = () => (
        <div className="cart_no_items">
            <div>{} You have no items in your cart</div>
            <FontAwesomeIcon icon={faFrown} />
        </div>
    );
    removeFromCart = id => {
        this.props.dispatch(removeCartItem(id)).then(response => {
            if (this.props.user.cartDetail.length <= 0) {
                this.setState({
                    showTotal: false,
                });
            } else {
                this.calculateTotalInItems(this.props.user.cartDetail);
            }
        });
    };

    transactionError = data => {
        console.log("PAYPAL ERROR", data);
    };
    transactionCancelled = data => {
        console.log("PAYPAL CANCELLED", data);
    };
    transactionSuccess = data => {
        this.setState({
            showTotal: false,
            showSuccess: true,
        });
    };
    render() {
        return (
            <DashboardLayout>
                <div>
                    <h1>My cart</h1>
                    <div className="user_cart">
                        <CartItemBlock
                            userInfo={this.props.user}
                            type="cart"
                            removeItem={id => this.removeFromCart(id)}
                        />
                        {this.state.showTotal ? (
                            <div className="user_cart_sum">
                                <div>Total amount: ${this.state.total}</div>
                            </div>
                        ) : this.state.showSuccess ? (
                            this.showSuccessMessage()
                        ) : (
                            this.showEmptyCartMessage()
                        )}
                    </div>
                    {this.state.showTotal ? (
                        <div className="paypal_button_container">
                            <Paypal
                                toPay={this.state.total}
                                transactionError={data =>
                                    this.transactionError(data)
                                }
                                transactionCancelled={data =>
                                    this.transactionCancelled(data)
                                }
                                onSuccess={data =>
                                    this.transactionSuccess(data)
                                }
                            />
                        </div>
                    ) : null}
                </div>
            </DashboardLayout>
        );
    }
}

const mapStateToProps = state => {
    return {
        user: state.user,
    };
};

export default connect(mapStateToProps)(UserCart);
