import React, { Component } from "react";
import { connect } from "react-redux";
import { auth } from "../redux/actions/user_actions";
import { CircularProgress } from "@material-ui/core";

export default function(ComposedClass, reload, adminRoute = null) {
    class AuthenticationCheck extends Component {
        _isMounted = false;

        state = {
            loading: true,
        };

        componentDidMount() {
            this._isMounted = true;

            this.props.dispatch(auth()).then(response => {
                let user = this.props.user.userData;
                if (!user.isAuth) {
                    if (reload) {
                        this.props.history.push("/register_log_in");
                    }
                } else {
                    if (adminRoute && !user.isAdmin) {
                        this.props.history.push("/user/dashboard");
                    } else {
                        if (reload === false) {
                            this.props.history.push("/user/dashboard");
                        }
                    }
                }
                this.setState({
                    loading: false,
                });
            });
        }
        componentWillUnmount() {
            this._isMounted = false;
        }
        render() {
            if (this.state.loading) {
                return (
                    <div className="main_loader">
                        <CircularProgress
                            style={{ color: "#999592" }}
                            thickness={7}
                        />
                    </div>
                );
            }
            return (
                <div>
                    <ComposedClass {...this.props} user={this.props.user} />
                </div>
            );
        }
    }

    function mapStateToProps(state) {
        return {
            user: state.user,
        };
    }
    return connect(mapStateToProps)(AuthenticationCheck);
}
