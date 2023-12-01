'use-client'
import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { useRouter } from 'next/router'
import Script from 'next/script'

const inter = Inter({ subsets: ['latin'] })

interface Recorrencia {
  frequencia: 'NENHUMA' | 'DIARIA' | 'SEMANAL' | 'MENSAL' | 'ANUAL'
  quantidade: number
}

interface Registro {
  id: number
  valor: number
  data: string
}

export interface Despesa {
  id: number
  nome: string
  definir_lembrete: boolean
  gestor_id: string
  categoria_id: number
  recorrencia: Recorrencia
  registros: Registro[]
}

interface Renda {
  id: number
  descricao: string
  valor: number
  data: string
}

function isLastMonth(dataEmString: string): boolean {
  const [ano, mes, dia] = dataEmString.split('-').map(Number)
  const data = new Date(ano, mes, dia) // Mês é base 0, então subtrai-se 1
  return data.getMonth() == new Date().getMonth()
}

export default function Home() {
  const router = useRouter()
  const { id } = router.query

  const [mesAtual, setMesAtual] = useState('')
  const [saldoTotal, setSaldoTotal] = useState(0)
  const [saldoMensal, setSaldoMensal] = useState(0)

  const [gastoMensal, setGastoMensal] = useState(0)
  const [rendaMensal, setRendaMensal] = useState(0)

  useEffect(() => {
    const obterMesAtual = () => {
      const meses = [
        'Janeiro',
        'Fevereiro',
        'Março',
        'Abril',
        'Maio',
        'Junho',
        'Julho',
        'Agosto',
        'Setembro',
        'Outubro',
        'Novembro',
        'Dezembro',
      ]

      const agora = new Date()
      const nomeMesAtual = meses[agora.getMonth()]

      setMesAtual(nomeMesAtual)
    }

    const fetchSaldoTotal = async () => {
      try {
        const despesasResponse = await fetch(
          `https://mais-financas-api.onrender.com/api/despesas?gestorId=${id}`
        )
        const despesas: Despesa[] = await despesasResponse.json()

        const gastoTotal = despesas
          .flatMap((despesa) => despesa.registros)
          .map((registro) => registro.valor)
          .reduce((acc, valor) => acc + valor, 0)

        const rendasResponse = await fetch(
          `https://mais-financas-api.onrender.com/api/rendas?gestorId=${id}`
        )
        const rendas: Renda[] = await rendasResponse.json()

        const rendaTotal = rendas
          .map((renda) => renda.valor)
          .reduce((acc, valor) => acc + valor, 0)

        setSaldoTotal(rendaTotal - gastoTotal)
      } catch (error: any) {
        console.error('Erro ao obter gastos mensais:', error.message)
      }
    }

    const fetchSaldoMensal = async () => {
      try {
        const despesasResponse = await fetch(
          `https://mais-financas-api.onrender.com/api/despesas?gestorId=${id}`
        )
        const despesas: Despesa[] = await despesasResponse.json()

        const gastoMensal = despesas
          .flatMap((despesa) => despesa.registros)
          .filter((registro) => isLastMonth(registro.data))
          .map((registro) => registro.valor)
          .reduce((acc, valor) => acc + valor, 0)

        const rendasResponse = await fetch(
          `https://mais-financas-api.onrender.com/api/rendas?gestorId=${id}`
        )
        const rendas: Renda[] = await rendasResponse.json()

        const rendaMensal = rendas
          .filter((renda) => isLastMonth(renda.data))
          .map((renda) => renda.valor)
          .reduce((acc, valor) => acc + valor, 0)

        setSaldoMensal(rendaMensal - gastoMensal)
      } catch (error: any) {
        console.error('Erro ao obter gastos mensais:', error.message)
      }
    }

    const fetchGastoMensal = async () => {
      try {
        const response = await fetch(
          `https://mais-financas-api.onrender.com/api/despesas?gestorId=${id}`
        )
        const data: Despesa[] = await response.json()

        const somaGastos = data
          .flatMap((despesa) => despesa.registros)
          .filter((registro) => isLastMonth(registro.data))
          .reduce((acc, registro) => acc + registro.valor, 0)

        setGastoMensal(somaGastos)
      } catch (error: any) {
        console.error('Erro ao obter gastos da semana:', error.message)
      }
    }

    const fetchRendaMensal = async () => {
      try {
        const response = await fetch(
          `https://mais-financas-api.onrender.com/api/rendas?gestorId=${id}`
        )
        const data: Renda[] = await response.json()

        const somaGastos = data
          .filter((renda) => isLastMonth(renda.data))
          .map((renda) => renda.valor)
          .reduce((acc, valor) => acc + valor, 0)

        setRendaMensal(somaGastos)
      } catch (error: any) {
        console.error('Erro ao obter gastos da semana:', error.message)
      }
    }

    fetchSaldoTotal()
    fetchSaldoMensal()
    fetchGastoMensal()
    fetchRendaMensal()
    obterMesAtual()
  }, [id])

  const handleFinancasClick = () => {
    router.push('/financas')
  }

  const handleEstatisticaClick = () => {
    router.push(`/estatistica/${id}`)
  }

  const handleDespesaClick = () => {
    router.push('/novadespesa')
  }

  let divSaldoTotal = styles.DivGastoMensal

  if (saldoTotal < 0) {
    divSaldoTotal += ` ${styles.MaiorQue1000}`
  } else if (saldoTotal <= 1000) {
    divSaldoTotal += ` ${styles.Entre500e1000}`
  } else {
    divSaldoTotal += ` ${styles.MenorQue500}`
  }

  const initBotpress = () => {
    const window: any = Window
    window.botpressWebChat.init({
      composerPlaceholder: 'Chat with bot',
      botConversationDescription:
        'This chatbot was built surprisingly fast with Botpress',
      botId: 'b6cf7b0a-6c47-49c4-893b-3c81b3b479dd',
      hostUrl: 'https://cdn.botpress.cloud/webchat/v0',
      messagingUrl: 'https://messaging.botpress.cloud',
      clientId: 'b6cf7b0a-6c47-49c4-893b-3c81b3b479dd',
    })
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

        <div className={divSaldoTotal}>
          <h3>Saldo Total</h3>
          <h1>R$: {saldoTotal.toFixed(2)}</h1>
        </div>

        <div className={styles.DivCarteiraDisponivel}>
          <div className={styles.Textos}>
            <h5>Carteira Disponível em {mesAtual}</h5>
          </div>
          <div className={styles.Dinheiro}>
            <>
              <h3> R$ {saldoMensal}</h3>
              <button className={styles.btnHamburguer} onClick={() => {}}>
                <div></div>
                <div></div>
                <div></div>
              </button>
            </>
          </div>
        </div>

        <div className={styles.DivObjetivos}>
          <div className={styles.Textos}>
            <h3>Objetivos</h3>
            <h4>Confira seus Objetivos</h4>
          </div>
          <div className={styles.Dinheiro}>
            <a href='#'>
              <Image
                src='/icons8-casa-24.png'
                alt='Home'
                width={24}
                height={24}
              />
            </a>
          </div>
        </div>

        <div className={styles.Container}>
          <div className={styles.TituloDiv}>
            <h2>Transferências do Mês</h2>
          </div>
          <div className={styles.DivCentralizada}>
            <div className={styles.Div1}>
              <div className={styles.BolaVerde}></div>
              <h3>R$ {rendaMensal.toFixed(2)}</h3>
              <h4>Ganhos</h4>
            </div>
            <div className={styles.Div2}>
              <div className={styles.BolaVermelha}></div>
              <h3>R$ {gastoMensal.toFixed(2)}</h3>
              <h4>Despesas</h4>
            </div>
          </div>
        </div>

        <Script
          src='https://cdn.botpress.cloud/webchat/v0/inject.js'
          onLoad={() => {
            initBotpress()
          }}
        />
      </main>
    </>
  )
}
