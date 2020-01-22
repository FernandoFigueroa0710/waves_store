import React from "react";
import DashboardLayout from "../../../hoc/dashboardLayout";
import ManageBrands from "./manage_brands";
import ManageWoods from "./manage_woods";

const ManageCategories = () => {
    return (
        <DashboardLayout>
            <ManageBrands />
            <ManageWoods />
        </DashboardLayout>
    );
};

export default ManageCategories;
