import React, { Component } from "react";
import Dropzone from "react-dropzone";
import axios from "axios";
import { USER_SERVER } from "../../utils/misc";
import { Link } from "react-router-dom";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import * as Icons from "@fortawesome/fontawesome-free-solid";
import CircularProgress from "@material-ui/core/CircularProgress";
import DashboardLayout from "../../../hoc/dashboardLayout";

class AddFile extends Component {
    constructor() {
        super();
        this.state = {
            formSuccess: false,
            formError: false,
            uploading: false,
            files: [],
        };
    }

    onDrop = file => {
        this.setState({ uploading: true });
        let formData = new FormData();
        const config = {
            header: { "content-type": "multipart/form-data" },
        };
        formData.append("file", file[0]);
        axios
            .post(`${USER_SERVER}/uploadfile`, formData, config, {
                withCredentials: true,
            })
            .then(response => {
                if (response.data.success) {
                    this.setState(
                        {
                            formSuccess: true,
                            formError: false,
                            uploading: false,
                        },
                        () => {
                            setTimeout(() => {
                                this.setState({ formSuccess: false });
                            }, 2000);
                        }
                    );
                }
            });
    };

    render() {
        return (
            <DashboardLayout>
                <div>
                    <h1>Upload file</h1>
                    <div>
                        <section>
                            <div className="dropzone clear">
                                <Dropzone
                                    onDrop={e => this.onDrop(e)}
                                    multiple={false}
                                    className="dropzone_box"
                                >
                                    <div className="wrap">
                                        <FontAwesomeIcon
                                            icon={Icons.faPlusCircle}
                                        />
                                    </div>
                                </Dropzone>

                                {this.state.uploading ? (
                                    <div
                                        className="dropzone_box"
                                        style={{
                                            textAlign: "center",
                                            paddingTop: "60px",
                                        }}
                                    >
                                        <CircularProgress
                                            style={{ color: "#00bcd4" }}
                                            thickness={7}
                                        />
                                    </div>
                                ) : null}
                                <div style={{ clear: "both" }}>
                                    {this.state.formSuccess ? (
                                        <div className="form_success">
                                            Your File was uploaded successfully!
                                        </div>
                                    ) : null}
                                    {this.state.formError ? (
                                        <div className="error_label">
                                            There's an error, please check your
                                            data
                                        </div>
                                    ) : null}
                                    <hr />
                                    <div>uploaded files</div>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </DashboardLayout>
        );
    }
}

export default AddFile;
