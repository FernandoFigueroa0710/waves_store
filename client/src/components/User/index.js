import React from 'react';
import DashboardLayout from "../../hoc/dashboardLayout";
import MyButton from "../utils/button";
const Userdashboard = () => {
    return (
        <DashboardLayout>
            <div>
                <div className="user_nfo_panel">
                    <h1>User  information</h1>
                    <div>
                        <span>Name</span>
                        <span>Last Name</span>
                        <span>Email</span>
                    </div>
                    <MyButton
                        type="default"
                        title="Edit account info"
                        linkTo="/user/profile"
                    />
                </div>
                <div className="user_nfo_panel">
                    <h1>Purchase History</h1>
                    <div className="user_product_block_wrapper">
                        History
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default Userdashboard;