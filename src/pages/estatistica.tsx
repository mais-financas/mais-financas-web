import Head from 'next/head';
import styles from '@/styles/Home.module.css';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import PieChart from '@/pages/PieChart';
import LineChart from '@/pages/LineChart';

export default function Home() {
  const router = useRouter();

  const [meses, setMeses] = useState([]);
  const [valoresPorMes, setValoresPorMes] = useState([]);

  const [categorias, setCategorias] = useState([]);
  const [gastosPorCategoria, setGastosPorCategoria] = useState([]);

  useEffect(() => {
  const fetchData = async () => {
    try {
      // Substitua pela sua URL correta
      const response = await fetch('http://localhost:8080/gastos-por-categoria');
      const data = await response.json();

      // Extraia as categorias e os valores da resposta
      const labels = data.gastosPorCategoria.map(item => item.categoria);
      const values = data.gastosPorCategoria.map(item => parseFloat(item.total_gasto));

      // Atualiza os estados
      setCategorias(labels);
      setGastosPorCategoria(values);
    } catch (error) {
      console.error('Erro ao buscar dados:', error);
    }
  };

  const fetchDataLine = async () => {
    try {
      // Substitua pela sua URL correta
      const response = await fetch('http://localhost:8080/gastos-por-meses');
      const data = await response.json();
  
      // Extraia os meses e os valores da resposta
      const labels = data.gastosPorMeses.map(item => item.mes);
      const values = data.gastosPorMeses.map(item => parseFloat(item.total_gasto));
  
      // Atualiza os estados
      setMeses(labels);
      setValoresPorMes(values);
    } catch (error) {
      console.error('Erro ao buscar dados:', error);
    }
  };

    fetchData();
    fetchDataLine();
  }, []);

  const handleFinancasClick = () => {
    router.push('/financas');
  };

  const handleMenuClick = () => {
    router.push('/menu');
  };

  const handleEstatisticaClick = () => {
    router.push('/estatistica');
  };

  const handleConsultoriaClick = () => {
    router.push('/consultoria');
  };

  // Exemplo de como os dados podem ser obtidos na página Home
  const chartData = {
    labels: categorias || [],
    values: gastosPorCategoria || [],
  };

  const LineData = {
    labels: meses || [],
    values: valoresPorMes || [],
  };
  
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${styles.main}`}>
        <ul className={styles.menu}>
          <li>
            <a onClick={handleFinancasClick}>+Finanças</a>
          </li>
          <li>
            <a onClick={handleMenuClick}>Menu</a>
          </li>
          <li>
            <a onClick={handleEstatisticaClick}>Estátistica</a>
          </li>
          <li>
            <a onClick={handleConsultoriaClick}>Consultoria</a>
          </li>
        </ul>

        <div className={styles.GraficoRosca}>
          <h1>Gestão de Gastos</h1>
          <PieChart data={chartData} />
        </div>

        <div className={styles.GraficoLinha}>
          <h1>Gastos</h1>
          {/* Passa meses e valoresPorMes diretamente */}
          <LineChart data={LineData} />
        </div>
      </main>
    </>
  );
}
