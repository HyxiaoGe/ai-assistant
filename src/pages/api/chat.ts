import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { prompt, history = [] } = await req.body;

  const data = {
    payload: {
      model: "gpt-4o",
      stream: false,
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant.",
        },
        ...history,
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.8,
      max_tokens: 800,
    },
    proxyUrl: `${process.env.OPENAI_API_PROXYURL}/v1/chat/completions`,
    apiKeys: process.env.OPENAI_API_KEY,
  };

  try {
    const response = await fetch(`${process.env.OPENAI_API_AWS_PROXYURL}`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    console.log("result", result);

    res.status(200).json(result);
  } catch (error) {
    console.error("Error:", error);
  }
}
