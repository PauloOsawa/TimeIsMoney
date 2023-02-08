import { useState } from 'react'
import Head from 'next/head'
import css from '@/styles/Home.module.css'
import CpRelogio from '@/components/design/CpRelogio'
import CpFrmTimeMoney from '@/components/cpforms/CpFrmTimeMoney'

export default function Home({ hoje }) {

  const [cldvTxt, setCldvTxt] = useState(css.dvtxt)
  const frmView = !(cldvTxt === css.dvtxt)

  // ---------------------------------------------------
  const iniciar = () => setCldvTxt(`${css.dvtxt} ${css.hiden}`);
  function hideFrm(){ if (cldvTxt !== css.dvtxt) { setCldvTxt(css.dvtxt); } }

  return (
    <>
      <Head>
        <title>Time is Money</title>
        <meta name="description" content="App de entretenimento com ênfase em cálculos de data e finanças" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="noindex, nofollow" />
        <meta name="author" content="Paulo Osawa" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={css.main}>
        <div className='metalbox'> <h1 className='tita'>Time Is Money</h1> </div>
        <div className={css.dvtitle}>
          <CpRelogio hoje={hoje} />
          <h1>Time Is Money</h1>
          <div className={css.dvmoney}> </div>
        </div>

        <div className={cldvTxt} >
          <p>
            Um projeto divertido e interativo, que realiza diversos cálculos financeiros em
            <br />conjunto com datas, além de curiosidades diversas, com várias opções de ecolha!
          </p>
          <h3>Funciona Basicamente Assim:</h3>
          <p>Você insere diversos tipos de gastos e lucros (anuais, mensais e até diários)!!
          <br />Além disso, cálculo de poupança com juros compostos estão inclusos!!</p>

          <div className={css.dvopts}>
            <p>Depois de inserir tudo, desde salário até conta de luz, você poderá escolher:</p>
            <ul>
              <li>- Qualquer data futura, e saber o saldo resultante naquela data!</li>
              <li>ou</li>
              <li>- Qualquer valor, e saber a data exata que irá conseguir (ou não)!</li>
            </ul>
          </div>

          <p>
            Pra começar a brincadeira, perguntaremos informações básicas,
            <br />para calcular curiosidades além de uma simples planilha!
          </p>
          <p>
            OBS.: <b>Não armazenamos cookies nem quaisquer informações</b> suas OK?
            <br />Você pode inventar tudo, mas pra conferir depois será mais difícil!
          </p>
          <p>Lembrando que todo abatimento será sempre no 1o dia do mês ok?</p>
          
          <div className={css.dvinit}>
            <h2>VAMOS COMEÇAR???</h2>
            <button className='btncor' onClick={iniciar}>SIM</button>
          </div>
        </div>

        {!!frmView && <CpFrmTimeMoney hoje={hoje} hideFrm={hideFrm} />}

      </main>
    </>
  )
}
// ---------------------------------------------------
export async function getStaticProps(){
  return { props: { hoje: Date.now() }}
}
