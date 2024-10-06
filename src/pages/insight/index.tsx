import React, { useState } from "react";
import SearchBar from "@/components/SearchBar";
import CategoryTabs from "@/components/CategoryTabs";
import Headlines from "@/sections/Headlines";
import DataVisualization from "@/components/DataVisualization";
import OpenAINews from "@/sections/OpenAINews";

import styles from "./index.module.css";

const InsightPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState("快讯");
  return (
    <div className={styles.insightPage}>
      {/* <header className={styles.header}>
        <SearchBar />
      </header> */}

      <nav className={styles.categoryNav}>
        <CategoryTabs
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />
      </nav>

      <main className={styles.contentLayout}>
        <div className={styles.newsColumn}>
          <Headlines category={activeCategory} />
        </div>
        <div className={styles.sideColumn}>
          <OpenAINews />
          {/* <AIHelper /> */}
        </div>
      </main>
      {/* 
      <section className={styles.visualizationSection}>
        <DataVisualization />
      </section> */}
    </div>
  );
};

export default InsightPage;
