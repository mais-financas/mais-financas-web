import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const LineChart = ({ data }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (!chartRef.current || !data) return;

    const ctx = chartRef.current.getContext('2d');
    const myChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: data.labels || [],
        datasets: [
          {
            label: 'Gastos por Meses',
            data: data.values || [],
            backgroundColor: 'rgba(255, 99, 132, 0.2)', // Vermelho mais claro para o preenchimento
            borderColor: 'rgba(255, 99, 132, 1)', // Vermelho mais escuro para a linha
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
      myChart.destroy();
    };
  }, [data]);

  return (
    <div style={{ width: '400px' }}>
      <canvas ref={chartRef} />
    </div>
  );
};

export default LineChart;
