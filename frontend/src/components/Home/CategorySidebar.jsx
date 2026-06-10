import React from "react";

const CategorySidebar = () => {
  const categories = [
    "Automobiles",
    "Clothes and Wear",
    "Home Interiors",
    "Computer and Tech",
    "Tools and Equipment",
    "Sports and Outdoor",
    "Animal and Pets",
    "Machinery Tools",
    "More Categories",
  ];

  return (
    <div className="col-span-2 rounded-l-2xl bg-white">
      <div className="space-y-2">
        {categories.map((category) => (
          <li
            className="cursor-pointer rounded px-2 py-2 active:bg-blue-100 list-none"
            key={category}
          >
            {category}
          </li>
        ))}
      </div>
    </div>
  );
};

export default CategorySidebar;
