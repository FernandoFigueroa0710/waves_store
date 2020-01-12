import React from "react";
import { Switch, Route } from "react-router-dom";
import Layout from "./hoc/layout";
import Home from "./components/Home/index";
import RegisterLogIn from "./components/register_log_in/index";
import Register from "./components/register_log_in/register";
import Userdashboard from "./components/User/index";
import AddProduct from "./components/User/admin/add_products";
import Shop from "./components/shopping/index";
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
