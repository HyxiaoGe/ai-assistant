import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import clsx from "clsx";

const DataVisualization = () => {
  const salesChartRef = useRef(null);
  const userChartRef = useRef(null);

  useEffect(() => {
    // 销售数据图表
    if (salesChartRef.current) {
      const salesChart = new Chart(salesChartRef.current, {
        type: "line",
        data: {
          labels: ["一月", "二月", "三月", "四月", "五月", "六月"],
          datasets: [
            {
              label: "月度销售额（万元）",
              data: [120, 190, 300, 250, 280, 340],
              borderColor: "rgb(75, 192, 192)",
              tension: 0.1,
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            title: {
              display: true,
              text: "月度销售趋势",
            },
          },
        },
      });

      // 用户增长图表
      const userChartCanvas = userChartRef.current;
      if (userChartCanvas) {
        const userChart = new Chart(userChartCanvas, {
          type: "bar",
          data: {
            labels: ["Q1", "Q2", "Q3", "Q4"],
            datasets: [
              {
                label: "新增用户数",
                data: [1200, 1900, 2300, 2800],
                backgroundColor: "rgba(255, 99, 132, 0.5)",
              },
            ],
          },
          options: {
            responsive: true,
            plugins: {
              title: {
                display: true,
                text: "季度用户增长",
              },
            },
          },
        });

        // 清理函数
        return () => {
          salesChart.destroy();
          userChart.destroy();
        };
      }
    }
  }, []);

  return (
    <div className={clsx("relative", "w-full", "pt-10")}>
      <h2
        className={clsx(
          "absolute",
          "top-0",
          "left-0",
          "text-xl",
          "font-bold",
          "p-2"
        )}
      >
        数据可视化
      </h2>
      <div className={clsx("flex", "flex-wrap", "justify-between", "mt-4")}>
        <div className={clsx("w-full", "md:w-[48%]", "mb-5")}>
          <canvas ref={salesChartRef}></canvas>
        </div>
        <div className={clsx("w-full", "md:w-[48%]", "mb-5")}>
          <canvas ref={userChartRef}></canvas>
        </div>
      </div>
    </div>
  );
};

export default DataVisualization;
