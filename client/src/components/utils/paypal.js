import React, { Component } from "react";
import PaypalExpressBtn from "react-paypal-express-checkout";

export default class Paypal extends Component {
    render() {
        const onSuccess = payment => {
            console.log(JSON.stringify(payment));
        };

        const onCancel = data => {
            console.log(JSON.stringify(data));
        };

        const onError = err => {
            console.log(JSON.stringify(err));
        };

        let env = "sandbox";
        let currency = "USD";
        let total = this.props.toPay;
        const client = {
            sandbox:
                "AfbA2-qjz92KhC5IDxvx2UpiIDBmSD7PdlKkZk1-OndNwg7Wc5wVAJKlPWQJcHwioMFz0kn4zOXnbqGW",
            production: "",
        };
        return (
            <div>
                <div>
                    <PaypalExpressBtn
                        env={env}
                        client={client}
                        currency={currency}
                        total={total}
                        onError={onError}
                        onSuccess={onSuccess}
                        onCancel={onCancel}
                        style={{
                            size: "large",
                            color: "blue",
                            shape: "rect",
                            label: "checkout",
                        }}
                    />
                </div>
            </div>
        );
    }
}
