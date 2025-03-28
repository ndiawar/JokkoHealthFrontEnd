import React, { Fragment, useState, useLayoutEffect, useContext } from "react";
import { Col } from "reactstrap";
import { AlignCenter } from "react-feather";
import { Link } from "react-router-dom";
import { Image } from "../../../AbstractElements";
import CustomizerContext from "../../../_helper/Customizer";
// import NotificationSlider from "./NotificationSlider";

const Leftbar = () => {
  const { layoutURL, setToggleIcon, toggleSidebar } = useContext(CustomizerContext);
  const [sidebartoggle] = useState(true);
  const width = useWindowSize();

  function useWindowSize() {
    const [size, setSize] = useState([0, 0]);
    useLayoutEffect(() => {
      function updateSize() {
        setSize([window.innerWidth, window.innerHeight]);
        if (window.innerWidth <= 991) {
          setToggleIcon(true);
        } else {
          setToggleIcon(false);
        }
      }
      window.addEventListener("resize", updateSize);
      updateSize();
      return () => window.removeEventListener("resize", updateSize);
    }, []);
    return size;
  }

  const responsive_openCloseSidebar = (toggle) => {
    if (width <= 991) {
      toggleSidebar(!toggle);
      document.querySelector(".sidebar-wrapper").className = "sidebar-wrapper ";
      document.querySelector(".bg-overlay1").classList.add("active");
    } else {
      if (toggle) {
        toggleSidebar(!toggle);
        document.querySelector(".sidebar-wrapper").className = "sidebar-wrapper close_icon ";
      } else {
        console.log("991 54 else", toggle);
        toggleSidebar(!toggle);
        document.querySelector(".sidebar-wrapper").className = "sidebar-wrapper ";
      }
    }
  };

  return (
    <Fragment>
      <Col className="header-logo-wrapper col-auto p-0" id="out_side_click">
        <div className="logo-wrapper">
          <Link to={`${process.env.PUBLIC_URL}/dashboard/default/${layoutURL}`}>
          <Image
            attrImage={{
              className: "",
              src: `${require("../../../assets/images/logo/logo_dark.png")}`,
              alt: "",
              width: 110,  // Définir la largeur à 150px
              height: 50,  // Définir la hauteur à 50px
            }}
          />

          </Link>
        </div>
        <div className="toggle-sidebar" onClick={() => responsive_openCloseSidebar(sidebartoggle)} style={window.innerWidth <= 991 ? { display: "block" } : { display: "none" }}>
          <AlignCenter className="status_toggle middle sidebar-toggle" id="sidebar-toggle" />
        </div>
      </Col>
      {/* <Col xxl="5" xl="6" lg="5" md="4" sm="3" className="left-header p-0">
        <NotificationSlider />
      </Col> */}
    </Fragment>
  );
};

export default Leftbar;
