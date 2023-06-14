import { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const PieChart = ({ data }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');
    const chart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: data.labels,
        datasets: [
          {
            data: data.values,
            backgroundColor: [
              '#00FF00',
              '#FFFF00',
              '#0000FF',
            ],
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

export default PieChart;