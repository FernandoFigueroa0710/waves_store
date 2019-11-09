import React from "react";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import * as Icons from "@fortawesome/fontawesome-free-solid";

const Footer = () => {
  return (
    <footer className="bck_b_dark">
      <div className="container">
        <div className="logo">Waves</div>
        <div className="wrapper">
          <div className="left">
            <h2>Contact Information</h2>
            <div className="business_nfo">
              <div className="tag">
                <FontAwesomeIcon icon={Icons.faCompass} className="icon" />
                <div className="nfo">
                  <div>Address</div>
                  <div>Yost Blvd. 1234</div>
                </div>
              </div>
              <div className="tag">
                <FontAwesomeIcon icon={Icons.faPhone} className="icon" />
                <div className="nfo">
                  <div>Phone</div>
                  <div>734-734009</div>
                </div>
              </div>
              <div className="tag">
                <FontAwesomeIcon icon={Icons.faClock} className="icon" />
                <div className="nfo">
                  <div>Working Hours</div>
                  <div>M-F 10am-7pm</div>
                </div>
              </div>
              <div className="tag">
                <FontAwesomeIcon icon={Icons.faEnvelope} className="icon" />
                <div className="nfo">
                  <div>Email</div>
                  <div>cotact.waves@gmail.com</div>
                </div>
              </div>
            </div>
          </div>
          <div className="left">
            <h2>Be the first to know</h2>
            <div>
              <div>
                Get all the lastest information on events, sales and offers.
                Don't miss out
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
