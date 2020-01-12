import React, { Component } from "react";
import DashboardLayout from "../../../hoc/dashboardLayout";

import FormField from "../../utils/forms/formField";
import {
    update,
    generatData,
    isFormValid,
} from "../../utils/forms/formActions";
import { connect } from "react-redux";
import { getBrands, getWoods } from "../../../redux/actions/products_actions";

class AddProduct extends Component {
    state = {
        formError: false,
        formSuccess: false,
        formData: {
            name: {
                element: "input",
                value: "",
                config: {
                    label: "Product name",
                    name: "product_name_input",
                    type: "text",
                    placeholder: "Enter guitar name/model",
                },
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
                validationMessage: "",
                showLabel: true,
            },
            description: {
                element: "textarea",
                value: "",
                config: {
                    label: "Product Description",
                    name: "description_input",
                    type: "text",
                    placeholder: "Enter guitar description",
                },
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
                validationMessage: "",
                showLabel: true,
            },
            price: {
                element: "input",
                value: "",
                config: {
                    label: "Product price",
                    name: "product_price_input",
                    type: "number",
                    placeholder: "Enter guitar price",
                },
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
                validationMessage: "",
                showLabel: true,
            },
            brand: {
                element: "select",
                value: "",
                config: {
                    label: "Product brand",
                    name: "product_brand_input",
                    options: [],
                },
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
                validationMessage: "",
                showLabel: true,
            },
            shipping: {
                element: "select",
                value: "",
                config: {
                    label: "Product shipping",
                    name: "product_shipping_input",
                    options: [
                        { key: true, value: "YES" },
                        { key: false, value: "NO" },
                    ],
                },
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
                validationMessage: "",
                showLabel: true,
            },
            available: {
                element: "select",
                value: "",
                config: {
                    label: "Product in stock",
                    name: "product_available_input",
                    options: [
                        { key: true, value: "YES" },
                        { key: false, value: "NO" },
                    ],
                },
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
                validationMessage: "",
                showLabel: true,
            },
            wood: {
                element: "select",
                value: "",
                config: {
                    label: "Guitar woods",
                    name: "product_woods_input",
                    options: [],
                },
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
                validationMessage: "",
                showLabel: true,
            },
            frets: {
                element: "select",
                value: "",
                config: {
                    label: "Guitar frets",
                    name: "product_woods_input",
                    options: [
                        { key: 20, value: 20 },
                        { key: 21, value: 21 },
                        { key: 22, value: 22 },
                        { key: 23, value: 23 },
                    ],
                },
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
                validationMessage: "",
                showLabel: true,
            },
            publish: {
                element: "select",
                value: "",
                config: {
                    label: "Publish product",
                    name: "product_publish_input",
                    options: [
                        { key: true, value: "Public" },
                        { key: false, value: "Hidden" },
                    ],
                },
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
                validationMessage: "",
                showLabel: true,
            },
        },
    };
    render() {
        return (
            <DashboardLayout>
                <div>
                    <h1>ADD PRODUCT</h1>
                    <form onSubmit={event => this.submitForm(event)}>
                        <FormField
                            id={"name"}
                            formData={this.state.formData.name}
                            change={element => this.updateForm(element)}
                        />
                    </form>
                </div>
            </DashboardLayout>
        );
    }
}

const mapStateToProps = state => {
    return {
        products: state.props,
    };
};
export default connect(mapStateToProps)(AddProduct);
