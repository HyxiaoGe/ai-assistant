import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-600 to-purple-700 text-white relative overflow-hidden">
      <div className="stars"></div>
      <div className="twinkling"></div>
      <div className="text-center z-10">
        <h1 className="text-6xl font-bold mb-8 animate-pulse">
          欢迎来到 XiaoHub
        </h1>
        <p className="text-xl mb-12 max-w-md mx-auto">
          探索无限可能，开启 AI 智能之旅
        </p>
        <Link
          href="/chat"
          style={{ textDecoration: "none" }}
          className="bg-white text-blue-600 font-bold py-3 px-8 rounded-full text-lg transition-all duration-300 hover:bg-blue-100 hover:scale-105 shadow-lg"
        >
          AI 聊天
        </Link>
      </div>
      <style jsx>{`
        .stars {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: #000
            url(http://www.script-tutorials.com/demos/360/images/stars.png)
            repeat top center;
          z-index: 0;
        }

        .twinkling {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: transparent
            url(http://www.script-tutorials.com/demos/360/images/twinkling.png)
            repeat top center;
          z-index: 1;
          animation: move-twink-back 200s linear infinite;
        }

        @keyframes move-twink-back {
          from {
            background-position: 0 0;
          }
          to {
            background-position: -10000px 5000px;
          }
        }
      `}</style>
    </main>
  );
}
