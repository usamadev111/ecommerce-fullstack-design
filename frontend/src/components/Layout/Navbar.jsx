import React from "react";
import Container from "../common/Container";
import Logo from "../common/Logo.jsx";
import usaFlag from "../../assets/flags/US@2x.png";
import russiaFlag from "../../assets/flags/RU@2x.png";
import itFlag from "../../assets/flags/IT@2x.png";
import ausFlag from "../../assets/flags/icon.png";
import uaeFlag from "../../assets/flags/AE@2x.png";
import chinaFlag from "../../assets/flags/CN@2x.png";
import germanyFlag from "../../assets/flags/DE@2x.png";
import denmarkFlag from "../../assets/flags/DK@2x.png";
import franceFlag from "../../assets/flags/FR@2x.png";
import englandFlag from "../../assets/flags/GB@2x.png";
import SearchBar from "../common/SearchBar";
import { Link } from "react-router-dom";
import {
  FaBars,
  FaEnvelope,
  FaHeart,
  FaShoppingCart,
  FaUserAlt,
} from "react-icons/fa";

const Navbar = () => {
  return (
    <header>
      <Container>
        <div className="flex items-center gap-6 py-4">
          <Logo />
          <div className="flex-1">
            <SearchBar />
          </div>

          <div className="flex items-center gap-6">
            <Link
              to="/login"
              className="flex flex-col items-center text-sm text-gray-600"
            >
              <FaUserAlt size={20} />
              <span>Profile</span>
            </Link>

            <button className="flex flex-col items-center text-sm text-gray-600">
              <FaEnvelope size={20} />
              <span>message</span>
            </button>

            <Link
              to="/orders"
              className="flex flex-col items-center text-sm text-gray-600"
            >
              <FaHeart size={20} />
              <span>Orders</span>
            </Link>

            <Link
              to="/cart"
              className="relative flex flex-col items-center text-sm text-gray-600"
            >
              <FaShoppingCart size={20} />
              <span>cart</span>
              <span className="absolute right-2 top-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white ">
                0
              </span>
            </Link>
          </div>
        </div>
      </Container>

      <div className="border-y border-gray-300">
        <Container>
          <div className="flex items-center justify-between py-3">
            <div className="flex items-center gap-8">
              <button className="flex items-center gap-2 font-medium">
                <FaBars />
                All Category
              </button>

              <Link to="/">Hot Offers</Link>

              <Link to="/">Gift Boxes</Link>

              <Link to="/">Projects</Link>

              <Link to="/">Menu Item</Link>
              <select className="outline-none cursor-pointer">
                <option>Help</option>
              </select>
            </div>

            <div className="flex items-center gap-8">
              <select className="outline-none cursor-pointer">
                <option>Ship to</option>
              </select>
              <select className="outline-none cursor-pointer">
                <option>Help</option>
              </select>
            </div>
          </div>
        </Container>
      </div>
    </header>
  );
};

export default Navbar;
