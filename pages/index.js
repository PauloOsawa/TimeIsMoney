import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/Home.module.css'

export default function Home() {
  return (
    <>
      <Head>
        <title>Time is Money</title>
        <meta name="description" content="App de entretenimento com ênfase em cálculos de data e finanças" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="author" content="Paulo Osawa"/>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <h1>App em Desenvolvimento</h1>
      </main>
    </>
  )
}
