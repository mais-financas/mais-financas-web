import Head from 'next/head';
import { useEffect, useState } from 'react';
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css';
import { useRouter } from 'next/router';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const router = useRouter();
  const [despesas, setDespesas] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [totalValue, setTotalValue] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 2; // Define quantos itens deseja mostrar por página

  const fetchCategories = () => {
    fetch('http://localhost:8080/categories')
      .then((response) => response.json())
      .then((data) => setCategories(data.categories))
      .catch((error) => console.error('Erro ao obter categorias:', error));
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetch('http://localhost:8080/despesas')
      .then((response) => response.json())
      .then((data) => setDespesas(data.despesas))
      .catch((error) => console.error('Erro ao obter despesas:', error));
  }, []);

  useEffect(() => {
    // Calcular o valor total quando as despesas ou a categoria selecionada mudam
    const filteredExpenses = despesas.filter((despesa) =>
      selectedCategory ? despesa.Categoria === selectedCategory : true
    );
    const total = filteredExpenses.reduce((acc, despesa) => acc + despesa.Valor, 0);
    setTotalValue(total);
  }, [despesas, selectedCategory]);

  const handleFinancasClick = () => {
    router.push('/financas');
  };

  const handlerelatoriosClick = () => {
    router.push('/relatorio');
  };

  const handleEstatisticaClick = () => {
    router.push('/estatistica');
  };

  const handleConsultoriaClick = () => {
    router.push('/consultoria');
  };

  // Função para avançar para a próxima página
  const nextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  // Função para retroceder para a página anterior
  const prevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  // Índice do primeiro e último item a ser exibido na página atual
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  // Itens a serem exibidos na página atual
  const currentExpenses = despesas
    .filter((despesa) =>
      selectedCategory ? despesa.Categoria === selectedCategory : true
    )
    .slice(indexOfFirstItem, indexOfLastItem);

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${styles.main} ${inter.className}`}>
        <ul className={styles.menu}>
          <li>
            <a onClick={handleFinancasClick}>+Finanças</a>
          </li>
          <li>
            <a onClick={handlerelatoriosClick}>relatorios</a>
          </li>
          <li>
            <a onClick={handleEstatisticaClick}>Estátistica</a>
          </li>
          <li>
            <a onClick={handleConsultoriaClick}>Consultoria</a>
          </li>
        </ul>
        <div className={styles.Bot}>

          {/* Valor total das despesas em destaque */}
          <div className={styles.totalContainer}>
            <p className={styles.totalExpenses}>Total das despesas: R$ {totalValue.toFixed(2)}</p>
          </div>

          {/* Select para filtrar as categorias */}
          <div className={styles.selectContainer}>
            <select
              onChange={(e) => setSelectedCategory(e.target.value)}
              value={selectedCategory || ''}
              className={styles.select}
            >
              <option value="">Todas as categorias</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>


          <ul className={styles.expensesList}>
            {currentExpenses.map((despesa) => (
              <li key={despesa.id} className={styles.expenseCard}>
                <div className={styles.upperSection}>
                  <div className={styles.typeAndValue}>
                    <p className={styles.expenseType}>{despesa.Categoria}</p>
                    <p className={styles.expenseValue}>R$ {despesa.Valor}</p>
                  </div>
                </div>
                <div className={styles.lowerSection}>
                  <div className={styles.info}>
                    <div className={styles.infoRow}>
                      <label>Recorrência:</label>
                      <input type='text' disabled value={despesa.Recorrencia} />
                    </div>
                    <div className={styles.infoRow}>
                      <label>Nome:</label>
                      <input type='text' disabled value={despesa.Nome} />
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          {/* Controles de paginação */}
          <div className={styles.pagination}>
            <button onClick={prevPage} disabled={currentPage === 1}>Anterior</button>
            <button onClick={nextPage} disabled={indexOfLastItem >= despesas.length}>Próxima</button>
          </div>
          
        </div>
      </main>
    </>
  );
}