import React, { Component } from "react";
import FormField from "../../utils/forms/formField";
import {
    update,
    generateData,
    isFormValid,
    resetFields,
} from "../../utils/forms/formActions";
import { connect } from "react-redux";
import { getWoods, addWood } from "../../../redux/actions/products_actions";
class ManageWoods extends Component {
    state = {
        formError: false,
        formSuccess: false,
        formData: {
            name: {
                element: "input",
                value: "",
                config: {
                    label: "Wood name",
                    name: "Wood_name_input",
                    type: "text",
                    placeholder: "Enter the wood type",
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
    resetFieldsHandler = () => {
        const newFormData = resetFields(this.state.formData, "woods");
        this.setState({
            formSuccess: true,
            formData: newFormData,
        });
    };
    updateForm = element => {
        const newFormData = update(element, this.state.formData, "woods");
        this.setState({
            formError: false,
            formData: newFormData,
        });
    };
    submitForm = event => {
        event.preventDefault();

        let dataToSubmit = generateData(this.state.formData, "woods");

        let formIsValid = isFormValid(this.state.formData, "woods");

        let existingWoods = this.props.products.woods;

        if (formIsValid) {
            this.props
                .dispatch(addWood(dataToSubmit, existingWoods))
                .then(response => {
                    if (response.payload.success) {
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
    showWoods = () =>
        this.props.products.woods
            ? this.props.products.woods.map((wood, index) => (
                  <div key={wood._id} className="category_item">
                      {wood.name}
                  </div>
              ))
            : null;

    componentDidMount() {
        this.props.dispatch(getWoods());
    }
    render() {
        return (
            <div className="admin_category_wrapper">
                <h1>Woods</h1>
                <div className="admin_two_column">
                    <div className="left">
                        <div className="brands_container">
                            {this.showWoods()}
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
                                    Wood type saved sucessfully!
                                </div>
                            ) : null}
                            {this.state.formError ? (
                                <div className="error_label">
                                    Please check your data
                                </div>
                            ) : null}
                            <button onClick={event => this.submitForm(event)}>
                                Add Wood type
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
export default connect(mapStateToProps)(ManageWoods);
