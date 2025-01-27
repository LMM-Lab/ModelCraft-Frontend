'use client'
import { Chart, LineController, LineElement, PointElement, LinearScale, Title, CategoryScale,Legend  } from 'chart.js';
import { useEffect, useRef } from 'react';
import { resultType } from '../../page';
import styled from 'styled-components';

Chart.register(LineController, LineElement, PointElement, LinearScale, Title, CategoryScale,Legend)

const Div = styled.div`
  width:40rem;
  height:30rem;
`
type GraphProps = {
  data: resultType
}

const Graph = ({ data }: GraphProps) => {
  const chartRef = useRef<HTMLCanvasElement | null>(null)
  const chartInstance = useRef<Chart | null>(null)
  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext('2d');
      if (!ctx) return
      if (chartInstance.current) {
        chartInstance.current.destroy()
      }
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
          maintainAspectRatio:false,
          plugins: {
            legend: {
              display: true,
              position:'top',
              align:'end',
            },
          },
          scales:{
            x:{
              title:{
                display:true,
                text:'epoch'
              },
            },
            y:{
              title:{
                display:true,
                text:'Loss'
              }
            }
          }
        }
      });
      return () => {
        if (chartInstance.current) {
          chartInstance.current.destroy()
        }
      }
    }
  }, [data]);
  return (
    <Div><canvas ref={chartRef} /></Div>
  )
}

export default Graph