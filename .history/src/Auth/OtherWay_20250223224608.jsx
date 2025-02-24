import React from "react";
// import { Facebook, Linkedin, Twitter } from "react-feather";
// import { Link } from "react-router-dom";
import { P } from "../AbstractElements";
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
      <P attrPara={{ className: "text-center " }}>
        Don't have account?
        <a className="" href="#javascript">
          {ForgotPassword}
        </a>
      </P>
    </>
  );
};

export default OtherWay;
