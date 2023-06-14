import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const LineChart = ({ data }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');
    const chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: data.labels,
        datasets: [
          {
            label: 'Gastos',
            data: data.values,
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
      },
    });

    return () => {
      // Limpar o gráfico ao desmontar o componente
      chart.destroy();
    };
  }, []);

  return (
    <div style={{ width: '400px' }}>
      <canvas ref={chartRef} />
    </div>
  );
};

export default LineChart;