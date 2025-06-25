// SearchBar.tsx - Updated based on wireframe
import { useState } from "react";
import style from "./SearchBar.module.scss";
import SearchIcon from "@mui/icons-material/Search";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const handleSearch = () => {
    // Implement search functionality
    console.log("Searching for:", searchTerm, "in category:", selectedCategory);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className={style.searchBar}>
      <div className={style.searchContainer}>
        <select
          className={style.categoryDropdown}
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="all">Select Category</option>
          <option value="academic">Academic</option>
          <option value="sports">Sports</option>
          <option value="cultural">Cultural</option>
          <option value="social">Social</option>
          <option value="career">Career</option>
        </select>

        <input
          type="text"
          className={style.searchInput}
          placeholder="Search for events, clubs, activities..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyPress={handleKeyPress}
        />

        <button className={style.searchButton} onClick={handleSearch}>
          <SearchIcon fontSize="small" />
          Search
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
