import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LogIn, User } from "react-feather";
import man from "../../../assets/images/dashboard/profile.png";
import { LI, UL, Image, P } from "../../../AbstractElements";
import CustomizerContext from "../../../_helper/Customizer";
import { Account, Admin, LogOut } from "../../../Constant";
import axios from 'axios';
import Cookies from 'js-cookie';
import UserContext from "../../../_helper/UserContext"; // Importez le contexte utilisateur

const UserHeader = () => {
  const navigate = useNavigate();
  const { layoutURL } = useContext(CustomizerContext);
  const { user, setUser } = useContext(UserContext); // Utilisez le contexte utilisateur

  useEffect(() => {
    axios.get('users/me', { withCredentials: true })
      .then(response => {
        setUser(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, [setUser]);

  const Logout = async () => {
    try {
      await axios.post('users/logout', {}, { withCredentials: true });
      Cookies.remove('jwt');
      localStorage.removeItem("profileURL");
      localStorage.removeItem("token");
      localStorage.removeItem("auth0_profile");
      localStorage.removeItem("Name");
      localStorage.setItem("authenticated", false);
      navigate(`${process.env.PUBLIC_URL}/login`);
    } catch (error) {
      console.error("Erreur lors de la déconnexion:", error);
    }
  };

  const UserMenuRedirect = (redirect) => {
    navigate(redirect);
  };

  return (
    <li className="profile-nav onhover-dropdown pe-0 py-0">
      <div className="media profile-media">
        <Image
          attrImage={{
            className: "b-r-10 m-0",
            src: user ? user.picture || man : man,
            alt: "",
          }}
        />
        <div className="media-body">
          <span>{user ? `${user.nom} ${user.prenom}` : "Emay Walter"}</span>
          <P attrPara={{ className: "mb-0 font-roboto" }}>
            {user ? user.role : Admin} <i className="middle fa fa-angle-down"></i>
          </P>
        </div>
      </div>
      <UL attrUL={{ className: "simple-list profile-dropdown onhover-show-div" }}>
        <LI
          attrLI={{
            onClick: () => UserMenuRedirect(`${process.env.PUBLIC_URL}/app/users/profile/${layoutURL}`),
          }}>
          <User />
          <span>{Account} </span>
        </LI>
        <LI attrLI={{ onClick: Logout }}>
          <LogIn />
          <span>{LogOut}</span>
        </LI>
      </UL>
    </li>
  );
};

export default UserHeader;