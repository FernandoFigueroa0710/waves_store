import React, { Component } from "react";
import Dropzone from "react-dropzone";

import axios from "axios";
import { USER_SERVER } from "../misc";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import * as Icons from "@fortawesome/fontawesome-free-solid";
import CircularProgress from "@material-ui/core/CircularProgress";

class FileUpload extends Component {
    constructor() {
        super();
        this.state = {
            uploadedFiles: [],
            uploading: false,
        };
    }
    onDrop = files => {
        this.setState({ uploading: true });
        let formData = new FormData();
        const config = {
            header: { "content-type": "multipart/form-data" },
        };
        formData.append("file", files[0]);
        axios
            .post(`${USER_SERVER}/uploadimage`, formData, config, {
                withCredentials: true,
            })
            .then(response => {
                this.setState(
                    {
                        uploading: false,
                        uploadedFiles: [
                            ...this.state.uploadedFiles,
                            response.data,
                        ],
                    },
                    () => {
                        this.props.imagesHandler(this.state.uploadedFiles);
                    }
                );
            });
    };

    onRemove = id => {
        axios
            .get(`${USER_SERVER}/removeimage?public_id=${id}`)
            .then(response => {
                let images = this.state.uploadedFiles.filter(item => {
                    return item.public_id !== id;
                });
                this.setState(
                    { uploadedFiles: images },
                    this.props.imagesHandler(images)
                );
            });
    };
    showUploadedImages = () =>
        this.state.uploadedFiles.map(item => (
            <div
                key={item.public_id}
                className="dropzone_box"
                onClick={() => this.onRemove(item.public_id)}
            >
                <div
                    className="wrap"
                    style={{ background: `url(${item.url}) no-repeat` }}
                ></div>
            </div>
        ));
    render() {
        return (
            <div>
                <section>
                    <div className="dropzone clear">
                        <Dropzone
                            onDrop={e => this.onDrop(e)}
                            multiple={false}
                            className="dropzone_box"
                        >
                            <div className="wrap">
                                <FontAwesomeIcon icon={Icons.faPlusCircle} />
                            </div>
                        </Dropzone>
                        {this.showUploadedImages()}
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
                    </div>
                </section>
            </div>
        );
    }
}

export default FileUpload;
