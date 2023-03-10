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
    const dvtit = document.querySelector('.'+css.dvtitle);
    const hhh = Date.now();
    setSthoje(hhh);
    setCldvTxt(cl);
    dvtit.scrollIntoView({ block:'start', behavior: 'smooth' });
  }

  const iniciar = () => scrola(`${css.dvtxt} ${css.hiden}`);

  const hideFrm = () => {
    if (cldvTxt !== css.dvtxt){ scrola(css.dvtxt); }
  }

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
          <h1> is </h1>
          <div className={css.dvmoney}> </div>
        </div>

        <div className={cldvTxt} >
          <p>Um projeto com cálculos de <b>data e finanças</b>,
            incluindo juros compostos e curiosidades!
          </p>

          <h3>Funciona Basicamente Assim:</h3>

          <p>
            Você pode inserir diversos <b>gastos e lucros </b>
            <span>(anuais, mensais, e até diários)</span>
          </p>
          <p>
            Inclusive uma <b>poupança</b> com juros,
            <span> além de <b>datas</b> para cálculo conjunto!</span>
          </p>
          <p>
            E com apenas esses dados, a proposta é de
            <span> resultados finais/parciais com data e saldo</span>
          </p>
          <p>para QUANDO ou QUANTO quiser!</p>

          <div className={css.dvopts}>
            <p>Poderá escolher e definir qualquer:</p>
            <ul>
              <li>- DATA para calcularmos o SALDO!</li>
              <li>ou qualquer</li>
              <li>- SALDO para calcularmos a DATA!</li>
            </ul>
          </div>

          <p>
            As telas são interativas, projetadas para celular,
            <span> e para não te matar de tédio!</span>
          </p>

          <p><b>Não armazenamos os dados inseridos!!</b></p>

          <p>Você pode inventar tudo, voltar e conferir!</p>

          <p>E abatimentos mês/ano sempre dia 01 OK?</p>

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
