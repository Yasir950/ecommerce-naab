import React from "react";
import "./SearchFilter.css";

const SearchFilter = ({
  searchTerm,
  setSearchTerm,
  selectedCategory,
  setSelectedCategory,
  priceRange,
  setPriceRange,
  categories,
}) => {
  return (
    <div className="search-filter">
      {/* 🔍 Search */}
      <input
        type="text"
        placeholder="Search products..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* 🏷️ Category */}
      <select
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
      >
        <option value="">All Categories</option>
        {categories?.map((cat) => (
          <option key={cat._id} value={cat._id}>
            {cat.name}
          </option>
        ))}
      </select>

      {/* 💰 Price Range */}
      <select
        value={priceRange}
        onChange={(e) => setPriceRange(e.target.value)}
      >
        <option value="">All Price Ranges</option>
        <option value="low">Under PKR 3000</option>
        <option value="medium">PKR 3000 - 4000</option>
        <option value="high">Above PKR 4000</option>
      </select>
    </div>
  );
};

export default SearchFilter;
