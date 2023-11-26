// AdicionarGanho.js

import { useState } from 'react';
import Head from 'next/head';
import { Inter } from 'next/font/google';
import styles from '@/styles/Home.module.css';
import { useRouter } from 'next/router';

const inter = Inter({ subsets: ['latin'] });

export default function AdicionarGanho({ data }) {
  const router = useRouter();

  const [dataForm, setdataForm] = useState({
    Nome: '',
    Valor: '',
    Descricao: '',
    Categoria: '',
  });

  const onChangeInput = (e) => {
    setdataForm({ ...dataForm, [e.target.name]: e.target.value });
  };

  const sendIncome = async (e) => {
    e.preventDefault();

    try {
      await fetch('http://localhost:8080/add-ganho', {
        method: 'POST',
        body: JSON.stringify(dataForm),
        headers: { 'Content-Type': 'application/json' },
      });

      // Limpar os campos do formulário após o envio bem-sucedido
      setdataForm({
        Nome: '',
        Valor: '',
        Descricao: '',
        Categoria: '',
      });

      // Redirecionar o usuário após o cadastro
      router.push('/financas');
    } catch (error) {
      console.log('Erro ao enviar os dados', error);
    }
  };

  const handleCancelarClick = () => {
    router.back();
  };

  return (
    <>
      <Head>
        <title>Registrar Ganho</title>
        <meta name="description" content="Registro de ganhos" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${styles.main} ${inter.className}`}>
        <h1>Registrar Ganho</h1>
        <form className={styles.ContainerDespesa} onSubmit={sendIncome}>
          <div className={styles.form__group}>
            <input
              type="text"
              className={styles.form__field}
              placeholder="Nome"
              name="Nome"
              id="Nome"
              onChange={onChangeInput}
              value={dataForm.Nome}
              required
            />
            <label htmlFor="Nome" className={styles.form__label}>
              Nome
            </label>
          </div>
          <div className={styles.form__group}>
            <input
              type="text"
              className={styles.form__field}
              placeholder="Valor"
              name="Valor"
              id="Valor"
              onChange={onChangeInput}
              value={dataForm.Valor}
              required
            />
            <label htmlFor="Valor" className={styles.form__label}>
              Valor:
            </label>
          </div>
          <div className={styles.form__group}>
            <input
              type="text"
              className={styles.form__field}
              placeholder="Descricao"
              name="Descricao"
              id="Descricao"
              onChange={onChangeInput}
              value={dataForm.Descricao}
              required
            />
            <label htmlFor="Descricao" className={styles.form__label}>
              Descrição:
            </label>
          </div>

          <div className={styles.form__group}>
            <select
              className={styles.form__field}
              name="Categoria"
              id="Categoria"
              onChange={onChangeInput}
              value={dataForm.Categoria}
              required
            >
              <option value="" disabled selected>
                Selecione a Categoria
              </option>
              <option value="salario">Salário</option>
              <option value="freelance">Trabalho Freelance</option>
            </select>
            <label htmlFor="Categoria" className={styles.form__label}>
              Categoria do Ganho
            </label>
          </div>
          <button className={styles.button} onClick={handleCancelarClick}>
            Cancelar
          </button>
          <button className={`${styles.button} ${styles.cancelar}`} type="submit">
            Enviar
          </button>
        </form>
      </main>
    </>
  );
}
