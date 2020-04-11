import React from "react";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import * as Icons from "@fortawesome/fontawesome-free-solid";

const Footer = ({ data }) => {
    return data.siteData ? (
        <footer className="bck_b_dark">
            <div className="container">
                <div className="logo">Waves</div>
                <div className="wrapper">
                    <div className="left">
                        <h2>Contact Information</h2>
                        <div className="business_nfo">
                            <div className="tag">
                                <FontAwesomeIcon
                                    icon={Icons.faCompass}
                                    className="icon"
                                />
                                <div className="nfo">
                                    <div>Address</div>
                                    <div>{data.siteData[0].address}</div>
                                </div>
                            </div>
                            <div className="tag">
                                <FontAwesomeIcon
                                    icon={Icons.faPhone}
                                    className="icon"
                                />
                                <div className="nfo">
                                    <div>Phone</div>
                                    <div>{data.siteData[0].phone}</div>
                                </div>
                            </div>
                            <div className="tag">
                                <FontAwesomeIcon
                                    icon={Icons.faClock}
                                    className="icon"
                                />
                                <div className="nfo">
                                    <div>Working Hours</div>
                                    <div>{data.siteData[0].hours}</div>
                                </div>
                            </div>
                            <div className="tag">
                                <FontAwesomeIcon
                                    icon={Icons.faEnvelope}
                                    className="icon"
                                />
                                <div className="nfo">
                                    <div>Email</div>
                                    <div>{data.siteData[0].email}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="left">
                        <h2>Be the first to know</h2>
                        <div>
                            <div>
                                Get all the lastest information on events, sales
                                and offers. Don't miss out
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    ) : null;
};

export default Footer;
