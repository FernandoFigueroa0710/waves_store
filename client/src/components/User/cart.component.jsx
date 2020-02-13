import React, { Component } from "react";
import DashboardLayout from "../../hoc/dashboardLayout";

import { connect } from "react-redux";

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
        let cartItem = [];
        let user = this.props.user;
        if (user.userData.cart && user.userData.cart.length > 0) {
            user.userData.cart.forEach(item => {
                cartItem.push(item.id);
            });
        }
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
