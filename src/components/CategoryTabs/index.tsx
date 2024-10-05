import React from "react";

import styles from "./index.module.css";

interface CategoryTabsProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

export const categoryPlatformMap = {
  快讯: ["zaobao"],
  技术: ["chlinlearn"],
  生活: ["oeeee"],
  AI: ["deeplearning"],
  Youtube: ["Youtube"],
  "X(原Twitter)": ["Twitter"],
};

const CategoryTabs: React.FC<CategoryTabsProps> = ({
  activeCategory,
  onCategoryChange,
}) => {
  const categories = Object.keys(categoryPlatformMap);

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
