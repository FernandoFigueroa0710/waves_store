import React, { Component } from "react";
import FormField from "../../utils/forms/formField";
import {
    update,
    generateData,
    isFormValid,
    resetFields,
} from "../../utils/forms/formActions";
import { connect } from "react-redux";
import { getBrands, addBrand } from "../../../redux/actions/products_actions";
class ManageBrands extends Component {
    state = {
        formError: false,
        formSuccess: false,
        formData: {
            name: {
                element: "input",
                value: "",
                config: {
                    label: "Brand name",
                    name: "Brand_name_input",
                    type: "text",
                    placeholder: "Enter the brand name",
                },
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
                validationMessage: "",
            },
        },
    };

    showBrands = () =>
        this.props.products.brands
            ? this.props.products.brands.map((brand, i) => (
                  <div className="category_item" key={brand._id}>
                      {brand.name}
                  </div>
              ))
            : null;
    componentDidMount() {
        this.props.dispatch(getBrands());
    }
    updateForm = element => {
        const newFormData = update(element, this.state.formData, "brands");
        this.setState({
            formError: false,
            formData: newFormData,
        });
    };

    resetFieldsHandler = () => {
        const newFormData = resetFields(this.state.formData, "brands");
        this.setState({
            formSuccess: true,
            formData: newFormData,
        });
    };

    submitForm = event => {
        event.preventDefault();

        let dataToSubmit = generateData(this.state.formData, "brands");

        let formIsValid = isFormValid(this.state.formData, "brands");

        let existingBrands = this.props.products.brands;

        if (formIsValid) {
            this.props
                .dispatch(addBrand(dataToSubmit, existingBrands))
                .then(response => {
                    if (response.payload.sucess) {
                        this.resetFieldsHandler();
                    } else {
                        this.setState({
                            formError: true,
                        });
                    }
                });
        } else {
            this.setState({
                formError: true,
            });
        }
    };
    render() {
        return (
            <div className="admin_category_wrapper">
                <h1>Brands</h1>
                <div className="admin_two_column">
                    <div className="left">
                        <div className="brands_container">
                            {this.showBrands()}
                        </div>
                    </div>
                    <div className="right">
                        <form onSubmit={event => this.submitForm(event)}>
                            <FormField
                                id={"name"}
                                formData={this.state.formData.name}
                                change={element => this.updateForm(element)}
                            />
                            {this.state.formSuccess ? (
                                <div className="form_success">
                                    Brand saved sucessfully!
                                </div>
                            ) : null}
                            {this.state.formError ? (
                                <div className="error_label">
                                    Please check your data
                                </div>
                            ) : null}
                            <button onClick={event => this.submitForm(event)}>
                                Add Brand
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        products: state.products,
    };
};

export default connect(mapStateToProps)(ManageBrands);
