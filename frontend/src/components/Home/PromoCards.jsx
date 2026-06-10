import React from "react";
import { FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

const PromoCards = () => {
  return (
    <div className="col-span-3 flex flex-col gap-4">
      <div className="rounded bg-blue-100 p-4">
        <div className="flex items-center gap-4">
          <FaUserCircle size={60} />

          <h3 className="text-xl ">
            {" "}
            Hi, User <br /> Lets get started
          </h3>
        </div>

        <button className="mt-3 w-full cursor-pointer rounded bg-blue-600 py-2 text-white">
          <Link to="/register" target="_blank">
            Join Now
          </Link>
        </button>

        <button className="mt-2 w-full cursor-pointer rounded border py-2">
          <Link to="/register" target="_blank">
            Login
          </Link>
        </button>
      </div>

      <div className="rounded bg-orange-400 p-4 text-white">
        <h3 className="font-semibold">Get US $10 Off</h3>

        <p className="mt-2 text-sm">With a new supplier</p>
      </div>

      <div className="rounded bg-teal-500 p-4 text-white">
        <h3 className="font-semibold">Send Quotes</h3>

        <p className="mt-2 text-sm">With supplier preferences</p>
      </div>
    </div>
  );
};

export default PromoCards;
