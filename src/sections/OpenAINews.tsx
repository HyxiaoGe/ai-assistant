import React, { useState } from "react";
import Pagination from "@/components/Pagination";
import { useAISummaryApi } from "@/components/hooks/useAISummary";
import { formatDateToChinese } from "../utils/dateAFormatters";

const OpenAINews: React.FC = () => {
  const { aiSummary, loading, error } = useAISummaryApi();

  const [currentPage, setCurrentPage] = useState(1);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const itemsPerPage = 1;
  const pageCount = Math.ceil(aiSummary.length / itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const currentAiSummary = aiSummary[currentPage - 1];

  return (
    <div className="p-1 bg-white rounded-lg text-xs">
      <h2 className="text-lg font-bold">AI 最新视角</h2>
      <h3 className="font-semibold">{currentAiSummary.title}</h3>
      <p className="text-red-600">
        <span className="font-bold">时间: </span>
        {formatDateToChinese(currentAiSummary.publicationDate)}
      </p>
      <p>
        <span className="font-bold">关键词: </span>
        {currentAiSummary.keywords}
      </p>
      <div>
        <p className="font-bold">总结:</p>
        {currentAiSummary.summary}
      </div>
      <a
        href={currentAiSummary.link}
        className="text-blue-600 hover:underline"
        target="_blank"
        rel="noopener noreferrer"
        style={{ textDecoration: "none" }}
      >
        原文链接
      </a>
      <Pagination
        currentPage={currentPage}
        pageCount={pageCount}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default OpenAINews;
