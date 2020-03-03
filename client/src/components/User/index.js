import React from "react";
import DashboardLayout from "../../hoc/dashboardLayout";
import MyButton from "../utils/button";
import UserHistoryBlock from "../utils/user_cart_items/historyBlock.component";

const Userdashboard = ({ user }) => {
    return (
        <DashboardLayout>
            <div>
                <div className="user_nfo_panel">
                    <h1>User information</h1>
                    <div>
                        <span>{user.userData.name}</span>
                        <span>{user.userData.lastName}</span>
                        <span>{user.userData.email}</span>
                    </div>
                    <MyButton
                        type="default"
                        title="Edit account info"
                        linkTo="/user/profile"
                    />
                    {user.userData.history ? (
                        <div className="user_nfo_panel">
                            <h1>Purchase History</h1>
                            <div className="user_product_block_wrapper">
                                <UserHistoryBlock
                                    products={user.userData.history}
                                />
                            </div>
                        </div>
                    ) : null}
                </div>
            </div>
        </DashboardLayout>
    );
};

export default Userdashboard;
