import { useState } from 'react'
import Head from 'next/head'
import css from '@/styles/Home.module.css'
import CpRelogio from '@/components/design/CpRelogio'
import CpFrmTimeMoney from '@/components/cpforms/CpFrmTimeMoney'

export default function Home(){

  const [cldvTxt, setCldvTxt] = useState(css.dvtxt)
  const [sthoje, setSthoje] = useState()
  const frmView = !(cldvTxt === css.dvtxt)

  // ---------------------------------------------------
  const scrola = (cl) => {
    const hhh = Date.now();
    setSthoje(hhh);
    setCldvTxt(cl);
    document.querySelector('.'+css.dvtitle).scrollIntoView({ block:'start', behavior: 'smooth'});
  }
  const iniciar = () => scrola(`${css.dvtxt} ${css.hiden}`);
  function hideFrm(){ if (cldvTxt !== css.dvtxt) { scrola(css.dvtxt); } }

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
          <CpRelogio />
          <h1>Time Is Money</h1>
          <div className={css.dvmoney}> </div>
        </div>

        <div className={cldvTxt} >
          <p>
            Um projeto interativo, que realiza diversos cálculos financeiros, de datas, juros
            <br /> e curiosidades diversas, tudo junto e com várias opções de escolha!
          </p>
          <h3>Funciona Basicamente Assim:</h3>
          <p>Você insere diversos tipos de gastos e lucros (anuais, mensais e até diários)!!
          <br />Além disso, aniversários e até poupança também entram na brincadeira!!</p>

          <div className={css.dvopts}>
            <p>Depois de escolher e inserir tudo que tiver vontade, você poderá escolher:</p>
            <ul>
              <li>- Qualquer DATA futura, e saber quanto de SALDO terá naquela data!</li>
              <li>ou</li>
              <li>- Qualquer SALDO, e saber a DATA exata que irá conseguir (ou não)!</li>
            </ul>
          </div>

          <p>
            Para a brincadeira ficar legal, os campos são exibidos e intercalados progressivamente
            <br />com curiosidades, projetados para uso de celular, e também para não te matar de tédio!
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

        {!!frmView && <CpFrmTimeMoney hoje={sthoje} hideFrm={hideFrm} />}

      </main>
    </>
  )
}
