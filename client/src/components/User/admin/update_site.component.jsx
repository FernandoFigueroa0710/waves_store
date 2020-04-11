import React, { Component } from "react";

import FormField from "../../utils/forms/formField";
import {
    update,
    generateData,
    isFormValid,
    populateFields,
} from "../../utils/forms/formActions";

import { connect } from "react-redux";
import {
    getSiteData,
    updateSiteData,
} from "../../../redux/actions/site_actions";
class UpdateNfo extends Component {
    state = {
        formError: false,
        formSuccess: false,
        formData: {
            address: {
                element: "input",
                value: "",
                config: {
                    label: "Address",
                    name: "address_input",
                    type: "text",
                    placeholder: "Enter the site address",
                },
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
                validationMessage: "",
                showLabel: true,
            },
            hours: {
                element: "input",
                value: "",
                config: {
                    label: "Working hours",
                    name: "hours_input",
                    type: "text",
                    placeholder: "Enter working hours",
                },
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
                validationMessage: "",
                showLabel: true,
            },
            phone: {
                element: "input",
                value: "",
                config: {
                    label: "Phone Number",
                    name: "phone_input",
                    type: "text",
                    placeholder: "Enter site number",
                },
                validation: {
                    required: true,
                    email: false,
                },
                valid: false,
                touched: false,
                validationMessage: "",
                showLabel: true,
            },
            email: {
                element: "input",
                value: "",
                config: {
                    label: "Store email",
                    name: "email_input",
                    type: "email",
                    placeholder: "Enter store email",
                },
                validation: {
                    required: true,
                    email: true,
                },
                valid: false,
                touched: false,
                validationMessage: "",
                showLabel: true,
            },
        },
    };

    updateForm = element => {
        const newFormData = update(element, this.state.formData, "site_info");
        this.setState({
            formError: false,
            formData: newFormData,
        });
    };

    submitForm = event => {
        event.preventDefault();
        let dataToSubmit = generateData(this.state.formData, "site_info");

        let formIsValid = isFormValid(this.state.formData, "site_info");

        if (formIsValid) {
            this.props.dispatch(updateSiteData(dataToSubmit)).then(() => {
                this.setState({ formSuccess: true }, () => {
                    setTimeout(() => {
                        this.setState({ formSuccess: false });
                    }, 2000);
                });
            });
        } else {
            this.setState({
                formError: true,
            });
        }
    };
    componentDidMount() {
        this.props.dispatch(getSiteData()).then(() => {
            const newFormData = populateFields(
                this.state.formData,
                this.props.site.siteData[0]
            );
            this.setState({
                formData: newFormData,
            });
        });
    }
    render() {
        return (
            <div>
                <form onSubmit={event => this.submitForm(event)}>
                    <h1>Store info</h1>
                    <FormField
                        id={"address"}
                        formData={this.state.formData.address}
                        change={element => this.updateForm(element)}
                    />
                    <FormField
                        id={"hours"}
                        formData={this.state.formData.hours}
                        change={element => this.updateForm(element)}
                    />
                    <FormField
                        id={"phone"}
                        formData={this.state.formData.phone}
                        change={element => this.updateForm(element)}
                    />
                    <FormField
                        id={"email"}
                        formData={this.state.formData.email}
                        change={element => this.updateForm(element)}
                    />
                    <div>
                        {this.state.formSuccess ? (
                            <div className="form_success">
                                Store info updated
                            </div>
                        ) : null}
                        {this.state.formError ? (
                            <div className="error_label">
                                Please check your data
                            </div>
                        ) : null}
                        <button onClick={event => this.submitForm(event)}>
                            Update store address
                        </button>
                    </div>
                </form>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        site: state.siteNfo,
    };
};
export default connect(mapStateToProps)(UpdateNfo);
