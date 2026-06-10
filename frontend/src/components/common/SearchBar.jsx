import React from "react";
import { FaSearch } from "react-icons/fa";

const SearchBar = () => {
  return (
    <div className="flex w-full">
      <input
        type="text"
        placeholder="Search"
        className="flex-1 border border-gray-300 px-4 py-2 outline-none rounded"
      />

      <select className="border-y border-r border-gray-300 px-3 outline-none cursor-pointer">
        <option>All Category</option>
      </select>

      <button className="bg-blue-600 px-6 text-white rounded-r cursor-pointer">
        <FaSearch />
      </button>
    </div>
  );
};

export default SearchBar;
