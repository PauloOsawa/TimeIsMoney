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
          <p>Um projeto com cálculos de <b>finanças e datas</b>, incluindo juros compostos e curiosidades!</p>

          <h3>Funciona Basicamente Assim:</h3>

          <p>Você terá opção desses 2 tipos de cálculo, além de definir seus valores!</p>

          <p>
            Só precisamos de 01 data (nascimento), e 01 tipo de cada gasto e lucro para isso, <br />
            podendo inserir quantos desejar.
          </p>
          <p>Além de opções anuais, mensais e até diárias, poderá definir uma poupança!</p>

          <div className={css.dvopts}>
            <p>Depois, escolher e definir qualquer:</p>
            <ul>
              <li>- DATA para calcular o SALDO!</li>
              <li>ou qualquer</li>
              <li>- SALDO para calcular a DATA!</li>
            </ul>
          </div>

          <p>As telas são interativas, projetadas para seu celular, e para não te matar de tédio!</p>

          <p><b>Não armazenamos os dados inseridos!!</b></p>

          <p>Você pode inventar tudo, mas pra conferir depois fica difícil!</p>

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
