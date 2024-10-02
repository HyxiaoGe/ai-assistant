export const MESSAGE_STORE = "ai_assistant_message";
export const SESSION_STORE = "ai_assistant_session";
export const ASSISTANT_STORE = "ai_assistant";

export const MAX_TOKENS = 1000;
export const TEMPERATURE = 0.8;

export const ASSISTANT_INIT = [
  {
    name: "AI 问答助手",
    prompt: "你是一个智能 AI 问答助手，可以回答一些问题，也可以和用户聊天。",
    temperature: 0.7,
    max_log: 4,
    max_tokens: 800,
  },
  {
    name: "AI 编程助理",
    prompt:
      "你是一个AI编程助理，精通多门语言编程并且熟读计算机网络知识、数据库、算法等领域。",
    temperature: 0.9,
    max_log: 4,
    max_tokens: 1500,
  },
  {
    name: "AI 玩梗高手",
    prompt:
      "你是一个玩梗高手，能总结和解释全网新鲜、热门、有趣的流行语和热梗。",
    temperature: 0.5,
    max_log: 4,
    max_tokens: 500,
  },
  {
    name: "AI 外语导师",
    prompt:
      "你是一个外语导师，可以帮助提升用户的外语水平，并耐心讲解遇到的一些问题。",
    temperature: 0.6,
    max_log: 4,
    max_tokens: 600,
  },
];

export const USERMAP = {
  user: "👨‍💻‍",
  assistant: "🤖",
  system: "🕸",
};

export const OPENAI_END_POINT = "https://api.openai.com";
