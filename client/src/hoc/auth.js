import React, { Component } from 'react';
import { connect } from  "react-redux";
import { auth } from "../redux/actions/user_actions";
import {CircularProgress} from "@material-ui/core";

export default function(conposedClass, reload, adminRoute = null) {
    class AuthenticationCheck extends Component {

        state ={
            loading: true,

        }

        render() {
            if(this.state.loading){
                return (
                    <div className="main_loader">
                        <CircularProgress style={{color:'#999592' }} thickness={7}  />
                    </div>
                )
            }
            return (
                <div>
                    Component to display
                </div>
            );
        }
    }

    function mapStateToProps(state){
        return {
            user: state.user
        }
    }
    return connect(mapStateToProps)(AuthenticationCheck);
}

