import React from "react";

interface HeadlinesProps {
  category: string;
}

const Headlines: React.FC<HeadlinesProps> = ({ category }) => {
  const dummyNews = [
    {
      id: 1,
      title: "标水创办人过利欧：中国存在复工的问题",
      link: "https://www.zaobao.com/realtime/china/story20240918-4763292",
      date: "2024-09-18 11:38:13",
    },
    {
      id: 2,
      title: "台制造商：未制造整巴被爆炸事件中的传呼机",
      link: "https://www.zaobao.com/realtime/china/story20240918-4762839",
      date: "2024-09-18 11:08:01",
    },
    {
      id: 3,
      title: "台风破坏阳澄湖围网 蟹农：有大闸蟹出逃",
      link: "https://www.zaobao.com/realtime/china/story20240918-4762734",
      date: "2024-09-18 10:58:46",
    },
    {
      id: 4,
      title: "九一八93周年沈阳警钟鸣响 中国多家省媒发海报纪念",
      link: "https://www.zaobao.com/realtime/china/story20240918-4762455",
      date: "2024-09-18 10:26:32",
    },
    {
      id: 5,
      title: "中国专家团访俄：中俄应共同应对西方地缘政治竞争压力",
      link: "https://www.zaobao.com/realtime/china/story20240918-4761719",
      date: "2024-09-18 09:59:58",
    },
  ];

  return (
    <ul style={{ listStyleType: "none", padding: "0 20px", margin: 0 }}>
      {dummyNews.map((news) => (
        <li
          key={news.id}
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
              href={news.link}
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
              {news.title}
            </a>
            <span
              style={{
                color: "#999",
                fontSize: "12px",
                whiteSpace: "nowrap",
                flexShrink: 0,
              }}
            >
              {news.date}
            </span>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default Headlines;
