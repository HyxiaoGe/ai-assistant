import { useState, useEffect } from "react";
import apiClient from "./apiClient";

interface aiSummary {
  id: number;
  title: string;
  link: string;
  keywords: string;
  summary: string;
  publicationDate: string;
}

export const useAISummaryApi = () => {
  const [aiSummary, setAiSummary] = useState<aiSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAiSummary = async () => {
      try {
        const cachedAiSummary = localStorage.getItem("aiSummary");
        const cachedTime = localStorage.getItem("updateTimestamp");

        if (cachedAiSummary && cachedTime) {
          const parsedAiSummary = JSON.parse(cachedAiSummary);
          const timestamp = parseInt(cachedTime);

          if (
            Date.now() - timestamp < 3600000 &&
            Array.isArray(parsedAiSummary)
          ) {
            setAiSummary(parsedAiSummary);
            setLoading(false);
            return;
          }
        }

        const response = await apiClient.get(`/v1/news/ai-summary`);
        if (response.status !== 200) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const aiSummaryData = response.data.data;

        console.log(aiSummaryData);
        if (!Array.isArray(aiSummaryData)) {
          throw new Error("Invalid data format: expected an array");
        }

        setAiSummary(aiSummaryData);
        setLoading(false);
        setError(null);

        localStorage.setItem("aiSummary", JSON.stringify(aiSummaryData));
        localStorage.setItem("updateTimestamp", Date.now().toString());
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to fetch aiSummary"
        );
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAiSummary();
  }, []);

  return { aiSummary, loading, error };
};
