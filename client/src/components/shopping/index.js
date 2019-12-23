import React, { Component } from "react";
import PageTop from "../utils/page_top";
import { getBrands, getWoods } from "../../redux/actions/products_actions";
import CollapseCheckBox from "../utils/collapseCheckBox";
import { fretz } from "../utils/forms/fixed_categories";

import { connect } from "react-redux";

class Shop extends Component {
    componentDidMount() {
        this.props.dispatch(getBrands());
        this.props.dispatch(getWoods());
    }

    handlefilfters = (filters, category) => {
        console.log("here", filters);
    };
    render() {
        const products = this.props.products;
        return (
            <div>
                <PageTop title="Browse Products" />
                <div className="container">
                    <div className="shop_wrapper">
                        <div className="left">
                            <CollapseCheckBox
                                initState={true}
                                title="Brands"
                                list={products.brands}
                                handlefilfters={filters =>
                                    this.handlefilfters(filters, "brands")
                                }
                            />
                            <CollapseCheckBox
                                initState={false}
                                title="Fretz"
                                list={fretz}
                                handlefilfters={filters =>
                                    this.handlefilfters(filters, "Fretz")
                                }
                            />
                            <CollapseCheckBox
                                initState={false}
                                title="Woods"
                                list={products.woods}
                                handlefilfters={filters =>
                                    this.handlefilfters(filters, "brands")
                                }
                            />
                        </div>
                        <div className="right">right1</div>
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

export default connect(mapStateToProps)(Shop);
