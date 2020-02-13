import React, { Component } from "react";
import DashboardLayout from "../../hoc/dashboardLayout";
import CartItemBlock from "../utils/user_cart_items/cart_item_block.component";
import { connect } from "react-redux";
import { getCartItems } from "../../redux/actions/user_actions";

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
        }
        this.props.dispatch(getCartItems(cartItems, userCart));
    }
    removeFromCart = () => {};
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
                    </div>
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
