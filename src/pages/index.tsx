import { GetStaticProps } from 'next'
import Head from 'next/head'

import styles from './home.module.scss'

export default function Home() {
  return (
    <>
      <Head>
        <title>Home | ac.devs</title>
      </Head>
      <main className={styles.contentContainer}>
        <section className={styles.hero}>
          <span>👏 Hey, Activer</span>
          <h1>Venha acompanhar e <span>aprender</span>.</h1>
          <p>
          Papo reto e descontraído sobre a rotina dos devs da Active. <span>Dicas</span> sobre carreira e tudo de mais novo que envolve a área de <span>tecnologia</span>. Vamos lá? 
          </p>
        </section>
        <img src="/images/avatar.svg" alt="Girl coding" />
      </main>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {},
    revalidate: 60 * 60 * 24, //24 hours
  }
}