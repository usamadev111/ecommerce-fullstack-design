import React from "react";
import { Link } from "react-router-dom";
import LogoImage from "../../assets/logo/logo-colored.png";

const Logo = () => {
  return (
    <Link to="/">
      <img src={LogoImage} alt="Logo image" />
    </Link>
  );
};

export default Logo;
