import React from "react";

const SearchBar: React.FC = () => {
  return (
    <div className="search-bar">
      <input type="text" placeholder="搜索新闻..." />
      <button>搜索</button>
    </div>
  );
};

export default SearchBar;
