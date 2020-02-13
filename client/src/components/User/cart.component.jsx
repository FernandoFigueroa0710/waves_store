import React, { Component } from "react";
import DashboardLayout from "../../hoc/dashboardLayout";

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
        let userCart = this.props.user.cart;
        if (userCart && userCart.length > 0) {
            userCart.forEach(item => {
                cartItems.push(item.id);
            });
        }
        this.props.dispatch(getCartItems(cartItems, userCart));
    }

    render() {
        return (
            <DashboardLayout>
                <div>
                    <div>User cart </div>
                </div>
            </DashboardLayout>
        );
    }
}

const mapStateToProps = state => {
    return {
        user: state.user.userData,
    };
};

export default connect(mapStateToProps)(UserCart);
