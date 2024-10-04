import React from "react";
import clsx from "clsx";

interface HeadlinesProps {
  category: string;
}

const Headlines: React.FC<HeadlinesProps> = ({ category }) => {
  const dummyNews = [
    { id: 1, title: `${category} 示例新闻1`, date: "2024-09-18 11:38:13" },
    { id: 2, title: `${category} 示例新闻2`, date: "2024-09-18 11:06:01" },
    { id: 3, title: `${category} 示例新闻3`, date: "2024-09-18 10:30:45" },
    { id: 4, title: `${category} 示例新闻4`, date: "2024-09-18 09:55:22" },
  ];

  return (
    <div className={clsx("flex flex-col")}>
      <h2 className={clsx("text-2xl font-bold mb-4")}>{category}新闻</h2>
      <ul className={clsx("space-y-4")}>
        {dummyNews.map((news) => (
          <li key={news.id} className={clsx("pb-2")}>
            <h3 className={clsx("text-lg font-semibold text-blue-600")}>
              {news.title}
            </h3>
            <p className={clsx("text-sm text-gray-500")}>{news.date}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Headlines;
