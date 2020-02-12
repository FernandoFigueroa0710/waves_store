import React from "react";
import { Switch, Route } from "react-router-dom";
import Layout from "./hoc/layout";
import Home from "./components/Home/index";
import RegisterLogIn from "./components/register_log_in/index";
import Register from "./components/register_log_in/register";
import Userdashboard from "./components/User/index";
import AddProduct from "./components/User/admin/add_products";
import Shop from "./components/shopping/index";
import AddFile from "./components/User/admin/add_file";
import ManageCategories from "./components/User/admin/manage_categories";
import ProductDetail from "./components/product/index";
import Auth from "./hoc/auth";

const Routes = () => {
    return (
        <Layout>
            <Switch>
                <Route
                    path="/user/dashboard"
                    component={Auth(Userdashboard, true)}
                />
                <Route
                    path="/admin/add_product"
                    component={Auth(AddProduct, true)}
                />
                <Route
                    path="/admin/upload_file"
                    component={Auth(AddFile, true)}
                />
                <Route
                    path="/admin/manage_categories"
                    component={Auth(ManageCategories, true)}
                />
                <Route
                    path="/product_detail/:id"
                    component={Auth(ProductDetail, null)}
                />
                <Route path="/register" component={Auth(Register, false)} />
                <Route
                    path="/register_log_in"
                    component={Auth(RegisterLogIn, false)}
                />
                <Route path="/shop" exact component={Auth(Shop, null)} />
                <Route path="/" exact component={Auth(Home, null)} />
            </Switch>
        </Layout>
    );
};

export default Routes;
