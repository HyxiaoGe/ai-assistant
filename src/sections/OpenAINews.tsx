import React, { useState } from "react";
import clsx from "clsx";
import Pagination from "@/components/Pagination";

const OpenAINews: React.FC = () => {
  const newsArray = [
    {
      title: "一年狂赚 66 亿美元，比 OpenAI 还要赚的成人网站，为什么拒绝 AI?",
      time: "2024-09-18 11:35:43",
      tags: ["OnlyFans", "创作者经济", "付费模式", "用户互动", "AI技术"],
      content: [
        "1. OnlyFans作为一个成人内容平台，2022年收入达66亿美元，创作者分得53亿美元，显示了其成功的粉丝经济模式。",
        "2. 平台的成功归功于其独特的用户互动模式和创作者激励机制。",
        "3. 尽管AI技术发展迅速，OnlyFans选择不使用AI，以保持其人性化和个性化的特点。",
      ],
      source: "https://www.36kr.com/p/2954987450212489",
    },
    {
      title: "二年狂赚 66 亿美元，比 OpenAI 还要赚的成人网站，为什么拒绝 AI?",
      time: "2024-09-18 11:35:43",
      tags: ["OnlyFans", "创作者经济", "付费模式", "用户互动", "AI技术"],
      content: [
        "1. OnlyFans作为一个成人内容平台，2022年收入达66亿美元，创作者分得53亿美元，显示了其成功的粉丝经济模式。",
        "2. 平台的成功归功于其独特的用户互动模式和创作者激励机制。",
        "3. 尽管AI技术发展迅速，OnlyFans选择不使用AI，以保持其人性化和个性化的特点。",
      ],
      source: "https://www.36kr.com/p/2954987450212489",
    },
    {
      title: "三年狂赚 66 亿美元，比 OpenAI 还要赚的成人网站，为什么拒绝 AI?",
      time: "2024-09-18 11:35:43",
      tags: ["OnlyFans", "创作者经济", "付费模式", "用户互动", "AI技术"],
      content: [
        "1. OnlyFans作为一个成人内容平台，2022年收入达66亿美元，创作者分得53亿美元，显示了其成功的粉丝经济模式。",
        "2. 平台的成功归功于其独特的用户互动模式和创作者激励机制。",
        "3. 尽管AI技术发展迅速，OnlyFans选择不使用AI，以保持其人性化和个性化的特点。",
      ],
      source: "https://www.36kr.com/p/2954987450212489",
    },
    {
      title: "三年狂赚 66 亿美元，比 OpenAI 还要赚的成人网站，为什么拒绝 AI?",
      time: "2024-09-18 11:35:43",
      tags: ["OnlyFans", "创作者经济", "付费模式", "用户互动", "AI技术"],
      content: [
        "1. OnlyFans作为一个成人内容平台，2022年收入达66亿美元，创作者分得53亿美元，显示了其成功的粉丝经济模式。",
        "2. 平台的成功归功于其独特的用户互动模式和创作者激励机制。",
        "3. 尽管AI技术发展迅速，OnlyFans选择不使用AI，以保持其人性化和个性化的特点。",
      ],
      source: "https://www.36kr.com/p/2954987450212489",
    },
    {
      title: "三年狂赚 66 亿美元，比 OpenAI 还要赚的成人网站，为什么拒绝 AI?",
      time: "2024-09-18 11:35:43",
      tags: ["OnlyFans", "创作者经济", "付费模式", "用户互动", "AI技术"],
      content: [
        "1. OnlyFans作为一个成人内容平台，2022年收入达66亿美元，创作者分得53亿美元，显示了其成功的粉丝经济模式。",
        "2. 平台的成功归功于其独特的用户互动模式和创作者激励机制。",
        "3. 尽管AI技术发展迅速，OnlyFans选择不使用AI，以保持其人性化和个性化的特点。",
      ],
      source: "https://www.36kr.com/p/2954987450212489",
    },
    {
      title: "三年狂赚 66 亿美元，比 OpenAI 还要赚的成人网站，为什么拒绝 AI?",
      time: "2024-09-18 11:35:43",
      tags: ["OnlyFans", "创作者经济", "付费模式", "用户互动", "AI技术"],
      content: [
        "1. OnlyFans作为一个成人内容平台，2022年收入达66亿美元，创作者分得53亿美元，显示了其成功的粉丝经济模式。",
        "2. 平台的成功归功于其独特的用户互动模式和创作者激励机制。",
        "3. 尽管AI技术发展迅速，OnlyFans选择不使用AI，以保持其人性化和个性化的特点。",
      ],
      source: "https://www.36kr.com/p/2954987450212489",
    },
    {
      title: "三年狂赚 66 亿美元，比 OpenAI 还要赚的成人网站，为什么拒绝 AI?",
      time: "2024-09-18 11:35:43",
      tags: ["OnlyFans", "创作者经济", "付费模式", "用户互动", "AI技术"],
      content: [
        "1. OnlyFans作为一个成人内容平台，2022年收入达66亿美元，创作者分得53亿美元，显示了其成功的粉丝经济模式。",
        "2. 平台的成功归功于其独特的用户互动模式和创作者激励机制。",
        "3. 尽管AI技术发展迅速，OnlyFans选择不使用AI，以保持其人性化和个性化的特点。",
      ],
      source: "https://www.36kr.com/p/2954987450212489",
    },
    {
      title: "三年狂赚 66 亿美元，比 OpenAI 还要赚的成人网站，为什么拒绝 AI?",
      time: "2024-09-18 11:35:43",
      tags: ["OnlyFans", "创作者经济", "付费模式", "用户互动", "AI技术"],
      content: [
        "1. OnlyFans作为一个成人内容平台，2022年收入达66亿美元，创作者分得53亿美元，显示了其成功的粉丝经济模式。",
        "2. 平台的成功归功于其独特的用户互动模式和创作者激励机制。",
        "3. 尽管AI技术发展迅速，OnlyFans选择不使用AI，以保持其人性化和个性化的特点。",
      ],
      source: "https://www.36kr.com/p/2954987450212489",
    },
    {
      title: "三年狂赚 66 亿美元，比 OpenAI 还要赚的成人网站，为什么拒绝 AI?",
      time: "2024-09-18 11:35:43",
      tags: ["OnlyFans", "创作者经济", "付费模式", "用户互动", "AI技术"],
      content: [
        "1. OnlyFans作为一个成人内容平台，2022年收入达66亿美元，创作者分得53亿美元，显示了其成功的粉丝经济模式。",
        "2. 平台的成功归功于其独特的用户互动模式和创作者激励机制。",
        "3. 尽管AI技术发展迅速，OnlyFans选择不使用AI，以保持其人性化和个性化的特点。",
      ],
      source: "https://www.36kr.com/p/2954987450212489",
    },
    {
      title: "三年狂赚 66 亿美元，比 OpenAI 还要赚的成人网站，为什么拒绝 AI?",
      time: "2024-09-18 11:35:43",
      tags: ["OnlyFans", "创作者经济", "付费模式", "用户互动", "AI技术"],
      content: [
        "1. OnlyFans作为一个成人内容平台，2022年收入达66亿美元，创作者分得53亿美元，显示了其成功的粉丝经济模式。",
        "2. 平台的成功归功于其独特的用户互动模式和创作者激励机制。",
        "3. 尽管AI技术发展迅速，OnlyFans选择不使用AI，以保持其人性化和个性化的特点。",
      ],
      source: "https://www.36kr.com/p/2954987450212489",
    },
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 1;
  const pageCount = Math.ceil(newsArray.length / itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const currentNews = newsArray[currentPage - 1];

  return (
    <div className="p-1 bg-white rounded-lg text-xs">
      <h2 className="text-lg font-bold">AI 最新视角</h2>
      <h3 className="font-semibold">{currentNews.title}</h3>
      <p className="text-red-600">
        <span className="font-bold">时间:</span> {currentNews.time}
      </p>
      <p>
        <span className="font-bold">关键词:</span> {currentNews.tags.join("、")}
      </p>
      <div>
        <p className="font-bold">总结:</p>
        {currentNews.content.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>
      <a
        href={currentNews.source}
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
