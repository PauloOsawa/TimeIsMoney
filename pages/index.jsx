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
          <p>Um projeto com cálculos de finanças, juros compostos, datas, e curiosidades!</p>

          <h3>Funciona Basicamente Assim:</h3>
          <p>
            Você insere diversos tipos de gastos e lucros!! (anuais, mensais e até diários)
          </p>
          <p>Poupança e data de nascimento também!!</p>

          <div className={css.dvopts}>
            <p>Depois, poderá escolher e definir qualquer valor desejado e saber:</p>
            <ul>
              <li>- A DATA prevista do SALDO desejado!</li>
              <li>ou</li>
              <li>- O SALDO previsto na DATA desejada!</li>
            </ul>
          </div>

          <p>As telas são interativas, projetadas para seu celular, e para não te matar de tédio!</p>

          <p><b>Não armazenamos cookies nem dados!!</b></p>

          <p>Você pode inventar tudo, mas pra conferir depois fica difícil! <br />(experiência própria rs)</p>

          <p>E abatimentos sempre no dia 01 OK?</p>

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
