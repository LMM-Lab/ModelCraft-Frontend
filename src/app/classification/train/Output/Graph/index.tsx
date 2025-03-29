'use client'
import { Chart, LineController, LineElement, PointElement, LinearScale, Title, CategoryScale, Legend } from 'chart.js';
import { useEffect, useRef } from 'react';
import styled from 'styled-components';

Chart.register(LineController, LineElement, PointElement, LinearScale, Title, CategoryScale, Legend);

const Div = styled.div`
  width:40rem;
  height:30rem;
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
  const chartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    // Chart インスタンスがまだ作られていない場合のみ初期化
    if (!chartInstance.current) {
      const ctx = chartRef.current.getContext('2d');
      if (!ctx) return;

      chartInstance.current = new Chart(ctx, {
        type: 'line',
        data: {
          labels: data.epoch,
          datasets: [
            {
              label: 'train',
              data: data.train,
              borderColor: 'rgba(75, 192, 192, 1)',
            },
            {
              label: 'val',
              data: data.val,
              borderColor: '#759898',
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: true,
              position: 'bottom',
              align: 'end',
            },
          },
          scales: {
            x: {
              title: {
                display: true,
                text: 'epoch',
              },
            },
            y: {
              title: {
                display: true,
                text: 'Loss',
              },
            },
          },
        },
      });
    } else {
      // すでに生成済みの場合は、新しいデータだけを追加して update() する
      const chart = chartInstance.current;

      /**
       * 今回届いたデータすべてを再描画するなら:
       * chart.data.labels = data.epoch;
       * chart.data.datasets[0].data = data.train;
       * chart.data.datasets[1].data = data.val;
       */
      
      // 新規に追加された分だけ push したい場合 (例)
      // 直近のラベル (epoch) と値をチャートに追加していくイメージ
      const latestLabel = data.epoch[data.epoch.length - 1];
      const latestTrain = data.train[data.train.length - 1];
      const latestVal = data.val[data.val.length - 1];

      chart.data.labels?.push(latestLabel);
      chart.data.datasets[0].data.push(latestTrain);
      chart.data.datasets[1].data.push(latestVal);

      chart.update();
    }
  }, [data]);

  return (
    <Div>
      <canvas ref={chartRef} />
    </Div>
  );
};

export default Graph;
