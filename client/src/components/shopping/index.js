import React, { Component } from "react";
import PageTop from "../utils/page_top";
import {
    getProductsToShop,
    getBrands,
    getWoods,
} from "../../redux/actions/products_actions";
import CollapseCheckBox from "../utils/collapseCheckBox";
import CollapseRadio from "../utils/colapseRadio";
import { fretz, price } from "../utils/forms/fixed_categories";

import { connect } from "react-redux";

class Shop extends Component {
    state = {
        grid: " ",
        limit: 6,
        skip: 0,
        filters: {
            brands: [],
            fretz: [],
            woods: [],
            price: [],
        },
    };
    componentDidMount() {
        this.props.dispatch(getBrands());
        this.props.dispatch(getWoods());

        this.props.dispatch(
            getProductsToShop(
                this.state.skip,
                this.state.limit,
                this.state.filters
            )
        );
    }
    handlePrice = value => {
        const data = price;
        let pricesArray = [];
        for (let key in data) {
            if (data[key]._id === parseInt(value, 10)) {
                pricesArray = data[key].array;
            }
        }
        return pricesArray;
    };

    handlefilters = (filters, category) => {
        const newFilters = { ...this.state.filters };
        newFilters[category] = filters;
        if (category === "price") {
            let priceValues = this.handlePrice(filters);
            newFilters[category] = priceValues;
        }
        this.setState({
            filters: newFilters,
        });
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
                                handlefilters={filters =>
                                    this.handlefilters(filters, "brands")
                                }
                            />
                            <CollapseCheckBox
                                initState={false}
                                title="Fretz"
                                list={fretz}
                                handlefilters={filters =>
                                    this.handlefilters(filters, "Fretz")
                                }
                            />
                            <CollapseCheckBox
                                initState={false}
                                title="Woods"
                                list={products.woods}
                                handlefilters={filters =>
                                    this.handlefilters(filters, "woods")
                                }
                            />
                            <CollapseRadio
                                initState={true}
                                title="Price"
                                list={price}
                                handlefilters={filters =>
                                    this.handlefilters(filters, "price")
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
