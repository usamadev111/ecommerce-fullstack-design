import React from "react";
import banner from "../../assets/backgrounds/Banner-board.png";

const HeroBanner = () => {
  return (
    <div
      className="col-span-7 flex min-h-[380px] items-center bg-cover bg-center p-10"
      style={{
        backgroundImage: "url(src/assets/backgrounds/Banner-board.png)",
      }}
    >
      <div>
        <p className="text-2xl">Latest Trending</p>

        <h1 className="mt-2 text-4xl font-bold">Electronic Items</h1>

        <button className="mt-6 rounded bg-white px-6 py-3 font-medium">
          Learn More
        </button>
      </div>
    </div>
  );
};

export default HeroBanner;
