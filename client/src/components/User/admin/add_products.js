import React, { Component } from "react";
import DashboardLayout from "../../../hoc/dashboardLayout";

import FormField from "../../utils/forms/formField";
import {
    update,
    generatData,
    isFormValid,
    populateOptionFields,
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

    updateFields = newFormData => {
        this.setState({
            formData: newFormData,
        });
    };
    componentDidMount() {
        const formData = this.state.formData;

        this.props.dispatch(getBrands()).then(response => {
            const newFormData = populateOptionFields(
                formData,
                this.props.products.brands,
                "brand"
            );
            this.updateFields(newFormData);
        });
        this.props.dispatch(getWoods()).then(response => {
            const newFormData = populateOptionFields(
                formData,
                this.props.products.woods,
                "wood"
            );
            this.updateFields(newFormData);
        });
    }

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
                        <FormField
                            id={"description"}
                            formData={this.state.formData.description}
                            change={element => this.updateForm(element)}
                        />
                        <FormField
                            id={"price"}
                            formData={this.state.formData.price}
                            change={element => this.updateForm(element)}
                        />
                        <div className="form_devider">
                            <FormField
                                id={"brand"}
                                formData={this.state.formData.brand}
                                change={element => this.updateForm(element)}
                            />
                            <FormField
                                id={"shipping"}
                                formData={this.state.formData.shipping}
                                change={element => this.updateForm(element)}
                            />
                            <FormField
                                id={"available"}
                                formData={this.state.formData.available}
                                change={element => this.updateForm(element)}
                            />
                        </div>
                        <div className="form_devider">
                            <FormField
                                id={"wood"}
                                formData={this.state.formData.wood}
                                change={element => this.updateForm(element)}
                            />
                            <FormField
                                id={"frets"}
                                formData={this.state.formData.frets}
                                change={element => this.updateForm(element)}
                            />
                        </div>
                        <div className="form_devider">
                            <FormField
                                id={"publish"}
                                formData={this.state.formData.publish}
                                change={element => this.updateForm(element)}
                            />
                            {this.state.formSuccess ? (
                                <div className="form_success">
                                    Guitar uploaded sucessfully!
                                </div>
                            ) : null}
                            {this.state.formError ? (
                                <div className="error_label">
                                    Please check your data
                                </div>
                            ) : null}
                            <button onClick={event => this.submitForm(event)}>
                                Upload your guitar
                            </button>
                        </div>
                    </form>
                </div>
            </DashboardLayout>
        );
    }
}

const mapStateToProps = state => {
    return {
        products: state.products,
    };
};
export default connect(mapStateToProps)(AddProduct);
