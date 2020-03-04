import React from "react";
import DashboardLayout from "../../hoc/dashboardLayout";
import UpdatePersonalInfo from "./updatePersonalNfo.component";
const UserProfile = () => {
    return (
        <DashboardLayout>
            <h1>Profile</h1>
            <UpdatePersonalInfo />
        </DashboardLayout>
    );
};

export default UserProfile;
