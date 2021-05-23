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
          <span>👏 Hey, activer</span>
          <h1>Venha acompanhar e <span>aprender</span>.</h1>

          <p>
            Descubra as maluquisses que os <span>devs</span> estão aprontando e viage nessa loucura.
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