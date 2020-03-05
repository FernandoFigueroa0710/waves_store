import React, { Component } from "react";

import FormField from "../../utils/forms/formField";
import {
    update,
    generateData,
    isFormValid,
    populateFields,
} from "../../utils/forms/formActions";

import { connect } from "react-redux";
class UpdateNfo extends Component {
    render() {
        return (
            <div>
                <span>UPDATE NFO</span>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        site: state.site,
    };
};
export default connect(mapStateToProps)(UpdateNfo);
