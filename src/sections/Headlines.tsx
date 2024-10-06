import React from "react";
import { useNewsApi } from "../components/hooks/useNewsApi";
import { categoryPlatformMap } from "../components/CategoryTabs";
import { formatDateToChinese } from "../utils/dateAFormatters";

interface HeadlinesProps {
  category: string;
}

const Headlines: React.FC<HeadlinesProps> = ({ category }) => {
  const { news, loading, error } = useNewsApi();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const platforms =
    categoryPlatformMap[category as keyof typeof categoryPlatformMap] || [];
  const newsArray = news.filter((item) => platforms.includes(item.platform));

  return (
    <ul style={{ listStyleType: "none", padding: "0 20px", margin: 0 }}>
      {newsArray.map((item) => (
        <li
          key={item.id}
          style={{ borderBottom: "1px solid #e5e5e5", padding: "12px 0" }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <a
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: "#0066cc",
                textDecoration: "none",
                fontSize: "14px",
                flexGrow: 1,
                marginRight: "30px",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                transition: "color 0.3s ease, text-decoration 0.3s ease",
              }}
              onMouseEnter={(e) => {
                const target = e.target as HTMLElement;
                target.style.color = "#d93025";
                target.style.textDecoration = "underline";
              }}
              onMouseLeave={(e) => {
                const target = e.target as HTMLElement;
                target.style.color = "#0066cc";
                target.style.textDecoration = "none";
              }}
            >
              {item.title}
            </a>
            <span
              style={{
                color: "#999",
                fontSize: "12px",
                whiteSpace: "nowrap",
                flexShrink: 0,
              }}
            >
              {formatDateToChinese(item.publicationDate)}
            </span>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default Headlines;
