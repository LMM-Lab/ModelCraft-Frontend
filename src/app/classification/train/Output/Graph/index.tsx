"use client";
import {
  Chart as ChartJS,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
  Legend,
} from "chart.js";
import { useEffect, useRef } from "react";
import styled from "styled-components";

ChartJS.register(LineController, LineElement, PointElement, LinearScale, Title, CategoryScale, Legend);

const Div = styled.div`
  width: 40rem;
  height: 30rem;
`;

type resultType = {
  epoch: number[];
  train: number[];
  val: number[];
};

type GraphProps = {
  data: resultType;
};

const Graph = ({ data }: GraphProps) => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstance = useRef<ChartJS | null>(null);

  useEffect(() => {
    if (!chartRef.current) return;
  
    // 初期化
    const ctx = chartRef.current.getContext("2d");
    if (!ctx) return;
  
    // チャート初期化（初回だけ）
    if (!chartInstance.current) {
      chartInstance.current = new ChartJS(ctx, {
        type: "line",
        data: {
          labels: [],
          datasets: [
            {
              label: "train",
              data: [],
              borderColor: "rgba(75, 192, 192, 1)",
            },
            {
              label: "val",
              data: [],
              borderColor: "#759898",
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: true,
              position: "bottom",
              align: "end",
            },
          },
          scales: {
            x: {
              title: {
                display: true,
                text: "epoch",
              },
            },
            y: {
              title: {
                display: true,
                text: "Value",
              },
            },
          },
        },
      });
    }
  
    const chart = chartInstance.current;
    if (!chart) return;
  
    if (data.epoch.length === 0) {
      chart.data.labels = [];
      chart.data.datasets[0].data = [];
      chart.data.datasets[1].data = [];
      chart.update();
      return;
    }
  
    const currentLen = chart.data.labels?.length ?? 0;
    for (let i = currentLen; i < data.epoch.length; i++) {
      chart.data.labels?.push(data.epoch[i]);
      chart.data.datasets[0].data.push(data.train[i]);
      chart.data.datasets[1].data.push(data.val[i]);
    }
  
    chart.update();
  }, [data]);

  return (
    <Div>
      <canvas ref={chartRef} />
    </Div>
  );
};

export default Graph;