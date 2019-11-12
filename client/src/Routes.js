import React from "react";
import { Switch, Route } from "react-router-dom";
import Layout from "./hoc/layout";
import Home from "./components/Home/index";
import RegisterLogIn from "./components/register_log_in/index";

const Routes = () => {
  return (
    <Layout>
      <Switch>
         <Route path="/register_log_in" component={RegisterLogIn} />
        <Route path="/" exact component={Home} />
      </Switch>
    </Layout>
  );
};

export default Routes;
