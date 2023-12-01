import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import { useRouter } from 'next/router'
import { Inter } from 'next/font/google'
import React, { useEffect, useState } from 'react'
import PieChart from './Piechart'
import LineChart from '@/pages/LineChart'
import { Despesa } from './financas'

const inter = Inter({ subsets: ['latin'] })

interface Categoria {
  id: number
  nome: string
}

interface ValorPorCategoria {
  categoria: string
  valor: number
}

interface ValorPorMes {
  mes: string
  valor: number
}

export interface ChartProps {
  labels: string[]
  values: number[]
}

function getMonth(dataEmString: string): number {
  const [ano, mes, dia] = dataEmString.split('-').map(Number)
  return new Date(ano, mes - 1, dia).getMonth() // Mês é base 0, então subtrai-se 1
}

export default function Home() {
  const router = useRouter()

  const [valoresPorMes, setValoresPorMes] = useState<ValorPorMes[]>([])

  const [categorias, setCategorias] = useState<Categoria[]>([])
  const [valoresPorCategoria, setValoresPorCategoria] = useState<
    ValorPorCategoria[]
  >([])
  // const meses = [
  //   'Janeiro',
  //   'Fevereiro',
  //   'Março',
  //   'Abril',
  //   'Maio',
  //   'Junho',
  //   'Julho',
  //   'Agosto',
  //   'Setembro',
  //   'Outubro',
  //   'Novembro',
  //   'Dezembro',
  // ]

  useEffect(() => {
    const categorias: Categoria[] = [
      { id: 1, nome: 'Essenciais' },
      { id: 2, nome: 'Transporte' },
      { id: 3, nome: 'Alimentação' },
      { id: 4, nome: 'Entretenimento' },
      { id: 5, nome: 'Saúde' },
      { id: 6, nome: 'Educação' },
      { id: 7, nome: 'Dívidas' },
    ]
    setCategorias(categorias)

    // const valoresIniciaisMes: ValorPorMes[] = meses.map((mes) => ({
    //   mes,
    //   valor: 0,
    // }))
    // setValoresPorMes(valoresIniciaisMes)

    const fetchData = async () => {
      try {
        const response = await fetch(
          'http://localhost:8080/api/despesas?gestorId=6da6f626-9590-40c9-bee8-f47a18e61e4b'
        )
        const despesas: Despesa[] = await response.json()

        const valoresAgrupadosCategoria: ValorPorCategoria[] = categorias.map(
          (categoria) => ({
            categoria: categoria.nome,
            valor: 0,
          })
        )
        const valoresAgrupdadosPorMes = [...valoresPorMes]

        despesas.forEach((despesa) => {
          const { categoria_id, registros } = despesa

          valoresAgrupadosCategoria[categoria_id].valor += registros.reduce(
            (acc, registro) => acc + registro.valor,
            0
          )
        })

        setValoresPorCategoria(valoresAgrupadosCategoria)
        // setValoresPorMes(valoresAgrupdadosPorMes)
      } catch (error) {
        console.error('Erro ao buscar dados:', error)
      }
    }

    fetchData()
  }, [])

  const handleFinancasClick = () => {
    router.push('/financas')
  }

  const handleEstatisticaClick = () => {
    router.push('/estatistica')
  }

  const pieChartData: ChartProps = {
    labels: categorias.map((categoria) => categoria.nome) || [],
    values: valoresPorCategoria.map((gastos) => gastos.valor) || [],
  }

  const lineChartData: ChartProps = {
    labels: categorias.map((categoria) => categoria.nome) || [],
    values: valoresPorCategoria.map((gastos) => gastos.valor) || [],
  }

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name='description' content='Generated by create next app' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main className={`${styles.main} ${inter.className}`}>
        <ul className={styles.menu}>
          <li>
            <a onClick={handleFinancasClick}>+Finanças</a>
          </li>
          <li>
            <a onClick={handleEstatisticaClick}>Estatísticas</a>
          </li>
        </ul>

        <div className={styles.GraficoRosca}>
          <h1>Gestão de Gastos</h1>
          <PieChart labels={pieChartData.labels} values={pieChartData.values} />
        </div>

        {/* <div className={styles.GraficoLinha}>
          <h1>Gastos</h1>
          <LineChart
            labels={lineChartData.labels}
            values={lineChartData.values}
          />
        </div> */}
      </main>
    </>
  )
}
