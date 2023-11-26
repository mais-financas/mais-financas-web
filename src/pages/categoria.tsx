import { useState, useEffect } from 'react';
import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { useRouter } from 'next/router';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
    const router = useRouter();
    const [nomeCategoria, setNomeCategoria] = useState("");

    const handleCancelarClick = () => {
        router.back();
    };

    const handleEnviarClick = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:8080/add-home", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ Nome: nomeCategoria }),
            });

            const data = await response.json();

            if (!data.erro) {
                // Se a categoria foi adicionada com sucesso, redirecione ou faça algo apropriado
                router.push("/novadespesa");
            } else {
                console.error("Erro ao adicionar a categoria:", data.mensagem);
            }
        } catch (error) {
            console.error("Erro ao adicionar a categoria:", error.message);
        }
    };
  
      return (
        <>
            {/* ... (cabeçalho) */}
            <main className={`${styles.main} ${inter.className}`}>
                <h1>Adicionar Categoria</h1>
                <form className={styles.ContainerDespesa}>
                    <div className={styles.form__group}>
                        <input
                            type="text"
                            className={styles.form__field}
                            placeholder="Nome"
                            name="Nome"
                            id="Nome"
                            value={nomeCategoria}
                            onChange={(e) => setNomeCategoria(e.target.value)}
                            required
                        />
                        <label htmlFor="Nome" className={styles.form__label}>
                            Nome
                        </label>
                    </div>

                    <button className={styles.button} onClick={handleCancelarClick}>
                        Cancelar
                    </button>
                    <button
                        className={`${styles.button} ${styles.cancelar}`}
                        type="submit"
                        onClick={handleEnviarClick}
                    >
                        Enviar
                    </button>
                </form>
            </main>
        </>
      );
    }



export async function getServerSideProps() {
    
    const response = await fetch(`http://localhost:8080/`);
    const data = await response.json();
    return { props: { data } };
  }
  
  