import React, { useEffect, useRef } from 'react'
import Chart from 'chart.js/auto'
import { ChartProps } from './estatistica'

const LineChart: React.FC<ChartProps> = ({ labels, values }) => {
  const chartRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    if (!chartRef.current) return
    const ctx = chartRef.current.getContext('2d')

    if (!ctx) return

    const myChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Gastos por Meses',
            data: values,
            backgroundColor: 'rgba(255, 99, 132, 0.2)', // Vermelho mais claro para o preenchimento
            borderColor: 'rgba(255, 99, 132, 1)', // Vermelho mais escuro para a linha
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
      },
    })

    return () => {
      myChart.destroy()
    }
  }, [labels, values])

  return (
    <div style={{ width: '400px' }}>
      <canvas ref={chartRef} />
    </div>
  )
}

export default LineChart
