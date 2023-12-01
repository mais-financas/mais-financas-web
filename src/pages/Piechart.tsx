import React, { useEffect, useRef } from 'react'
import Chart, { ChartConfiguration } from 'chart.js/auto'
import { ChartProps } from './estatistica/[id]'

const PieChart: React.FC<ChartProps> = ({ labels, values }) => {
  const chartRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    if (!chartRef.current) return
    const ctx = chartRef.current.getContext('2d')

    if (!ctx) return

    const colors = [
      '#FF6633',
      '#FFB399',
      '#FF33FF',
      '#FFFF99',
      '#00B3E6',
      '#E6B333',
      '#3366E6',
      '#999966',
      '#99FF99',
      '#B34D4D',
      '#80B300',
      '#809900',
      '#E6B3B3',
      '#6680B3',
      '#66991A',
      '#FF99E6',
      '#CCFF1A',
      '#FF1A66',
      '#E6331A',
      '#33FFCC',
      '#66994D',
      '#B366CC',
      '#4D8000',
      '#B33300',
      '#CC80CC',
      '#66664D',
      '#991AFF',
      '#E666FF',
      '#4DB3FF',
      '#1AB399',
      '#E666B3',
      '#33991A',
      '#CC9999',
      '#B3B31A',
      '#00E680',
    ]

    const chart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: labels,
        datasets: [
          {
            data: values,
            backgroundColor: colors.slice(0, values.length), // Ajusta para o número de valores
          },
        ],
      },
      options: {
        responsive: true,
      },
    })

    return () => {
      chart.destroy()
    }
  }, [labels, values])

  return (
    <div style={{ width: '400px' }}>
      <canvas ref={chartRef} />
    </div>
  )
}

export default PieChart
