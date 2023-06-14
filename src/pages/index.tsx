import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { useRouter } from 'next/router';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  const router = useRouter();

  const handleButtonClick = () => {
    router.push('/financas');
  };

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${styles.main} ${inter.className}`}>
          <Image src="/Dinheiro.png" alt="Cartiera de Dinheiro" width={300} height={300} className={styles.image} />
          
          <h1 className={styles.h1}>Gerencie Suas Finanças</h1>
          
          <button className={styles.Button} onClick={handleButtonClick}>Começe Aqui</button>

          <h5 className={styles.h5}>Não tem uma Conta? <a href="/Cadastro" className={styles.loginLink}>Se Cadastre</a></h5>


      </main>
    </>
  );
}
