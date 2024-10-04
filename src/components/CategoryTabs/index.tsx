import React from "react";

import styles from "./index.module.css";

interface CategoryTabsProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

const CategoryTabs: React.FC<CategoryTabsProps> = ({
  activeCategory,
  onCategoryChange,
}) => {
  const categories = ["快讯", "技术", "生活", "AI", "Youtube", "X(原Twitter)"];

  return (
    <div className={styles.categoryTabs}>
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onCategoryChange(category)}
          className={`${styles.tab} ${
            activeCategory === category ? styles.active : ""
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default CategoryTabs;
