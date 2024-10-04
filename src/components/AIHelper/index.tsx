import React from "react";

const AIHelper: React.FC = () => {
  return (
    <div className="ai-helper">
      <h2>AI助手</h2>
      <div className="chat-window">{/* 聊天界面将在这里实现 */}</div>
      <input type="text" placeholder="询问AI助手..." />
      <button>发送</button>
    </div>
  );
};

export default AIHelper;
