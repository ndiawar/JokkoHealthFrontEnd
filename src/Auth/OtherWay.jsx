import React from "react";
// import { Facebook, Linkedin, Twitter } from "react-feather";
// import { Link } from "react-router-dom";
import { ForgotPassword } from "../Constant";


const OtherWay = () => {
  return (
    <>
      {/* <div className="login-social-title">
        <H6 attrH6={{ className: "text-muted or mt-4" }}>Or Sign up with</H6>
      </div>
      <div className="social my-4 ">
        <div className="btn-showcase">
          <a className="btn btn-light" href="https://www.linkedin.com/login" rel="noreferrer" target="_blank">
            <Linkedin className="txt-linkedin" /> LinkedIn
          </a>
          <a className="btn btn-light" href="https://twitter.com/login?lang=en" rel="noreferrer" target="_blank">
            <Twitter className="txt-twitter" />
            twitter
          </a>
          <a className="btn btn-light" href="https://www.facebook.com/" rel="noreferrer" target="_blank">
            <Facebook className="txt-fb" />
            facebook
          </a>
        </div>
      </div> */}
      <p className="text-right mt-3">
        <a href="#javascript">
          {ForgotPassword}
        </a>
      </p>

    </>
  );
};

export default OtherWay;
