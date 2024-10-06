import { useState, useEffect } from "react";
import apiClient from "./apiClient";

interface NewsItem {
  id: number;
  title: string;
  link: string;
  publicationDate: string;
  platform: string;
}

export const useNewsApi = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const cachedNews = localStorage.getItem("news");
        const cachedTime = localStorage.getItem("updateTimestamp");

        if (cachedNews && cachedTime) {
          const parsedNews = JSON.parse(cachedNews);
          const timestamp = parseInt(cachedTime);

          if (Date.now() - timestamp < 3600000 && Array.isArray(parsedNews)) {
            setNews(parsedNews);
            setLoading(false);
            return;
          }
        }

        const response = await apiClient.get(`/v1/news`);
        if (response.status !== 200) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const newsData = response.data.data;

        if (!Array.isArray(newsData)) {
          throw new Error("Invalid data format: expected an array");
        }

        setNews(newsData);
        setLoading(false);
        setError(null);

        localStorage.setItem("news", JSON.stringify(newsData));
        localStorage.setItem("updateTimestamp", Date.now().toString());
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch news");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  return { news, loading, error };
};
