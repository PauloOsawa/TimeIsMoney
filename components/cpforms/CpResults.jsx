import css from "@/styles/CpResults.module.css";

export default function CpResults({ dados, animStop }){
  // console.log('CpResults --------- animStop =', animStop);

  const {Anual: gastoAno, Mensal: gastoMes, Diário: gastoDia} = dados.totalGasto;
  const {Anual: lucroAno, Mensal: lucroMes, Diário: lucroDia} = dados.totalLucro;
  const {Anual: saldoAno, Mensal: saldoMes, Diário: saldoDia} = dados.totalSaldos;

  const clfx = !animStop ? `${css.dvfinal} ${css.fx}` : css.dvfinal;
  const resultType = dados?.lastResults?.tipo;
  const resultLength = dados.result.length;

  // --------------------------------------------
  const getBrPrc = (p) => {
    if(!p || p === 0){ return (p === 0 ? '0,00' : 'xxxxxxxxxx'); }
    if(Number.isInteger(p)){ return p.toLocaleString() + ',00'; }
    return parseFloat(p.toFixed(2)).toLocaleString().replace(/([,][0-9])$/, '$10').replace(/([^,][0-9]{2})$/, "$1,00");
  }

  const getSpanPrcTag = (p) => <span className={css.nobrk}>R$ {getBrPrc(p)}</span>;

  const getArSpns = (txt) => txt.split('#').map((spn, i) => {
    const isnb = (spn[0] === '@');
    return (spn[0] === '@') ? (<span key={i} className={css.nobrk}>{spn.slice(1)}</span>) : (<span key={i}>{spn}</span>);
  });
  // --------------------------------------------
  const getFrasesCar = () => {
    if(!dados?.hasCar){ return; }
    return (<>
      <hr />
      <p>
        <span>Por ano, você gasta { getSpanPrcTag(dados.gastoCar) } com seu veículo! </span>
        <span>Se somar manutenção, multas, etc, poderia fazer aquela Viagem dos sonhos!</span>
      </p>
    </>);
  }
  // --------------------------------------------
  const hasResult = (tipo) => {
    if(!dados?.lastCalc || dados?.lastCalc === 0){ console.log('sem calc'); return false; }
    if(resultType !== tipo){ return false; }
    return dados?.lastResults?.resultado;
  }
  // --------------------------------------------
  const getFrasesByVal = () => {
    const lastres = hasResult('byVal');
    if(!lastres){ return; }
    const isNever = (lastres === 'NUNCA');
    const valsearch = dados.lastResults.valor;
    const hasPoup = dados.temPoupanca && resultLength > 2;

    return !isNever ? (<>
      <p className={css.pbold}>{getArSpns(dados.result[0])}</p>
      <p>{getArSpns(dados.result[1])}</p>
      {!!hasPoup && (<p> { getArSpns(dados.result[2]) }</p>) }
      </>) : (
      <p className={css.pbold}>Infelizmente você NUNCA irá conseguir este valor!!</p>
    );
  }
  // --------------------------------------------
  const getFrasesByDt = () => {
    const lastres = hasResult('byDate');
    if(lastres === false){ return; }
    const dtsearch = dados.lastResults.valor;
    const hasPoup = dados.temPoupanca && resultLength > 3;
    return (<>
      <p className={css.pbold}>
        <span>{dados.result[0]}</span>
        <span>{dados.result[1][0] !=='t' && <>você </>}terá um saldo TOTAL de {getSpanPrcTag(lastres)} !!</span>
      </p>
      <p>{getArSpns(dados.result[2])}</p>
      {!!hasPoup && (<>
      <p>
        <span>{dados.result[3]}</span>
        <span>{dados.result[4]}</span>
        <span>{dados.result[5]}</span>
      </p>
      <p>
        <span>{dados.result[6]}</span>
        <span>{dados.result[7]}</span>
      </p>
      </>)}
    </>);
  }
  // --------------------------------------------
  const getFirstP = () => {
    const tipo = dados?.lastResults?.tipo;
    if(!tipo || !['byDate', 'byVal'].includes(tipo)){ console.log('sem tipo'); return; }
    return (tipo === 'byDate') ? getFrasesByDt() : getFrasesByVal();
  }
  // --------------------------------------------

  return (
    <div className={clfx}>
      <h3>RESULTADOS</h3>
      {getFirstP()}
      <hr />

      <p>
        Seus <b>LUCROS</b> totalizam {getSpanPrcTag(lucroAno)} Anuais,
        <span> {getSpanPrcTag(lucroMes)} Mensais,</span>
        <span> e {getSpanPrcTag(lucroDia)} Diários!!</span>
      </p>
      <p>
        Seus <b>GASTOS</b> totalizam {getSpanPrcTag(gastoAno)} Anuais,
        <span> {getSpanPrcTag(gastoMes)} Mensais,</span>
        <span> e {getSpanPrcTag(gastoDia)} Diários!!</span>
      </p>
      <p>
        <span>Os <b>SALDOS</b> resultantes são de </span>
        <span>{getSpanPrcTag(saldoAno)} Anuais, {getSpanPrcTag(saldoMes)} Mensais,</span>
        <span> e {getSpanPrcTag(saldoDia)} Diários!!</span>
      </p>
      <hr />

      <p>
        Você nasceu em { dados.diaNasc }, tem {dados.idade} anos de idade,
        totalizando {dados.diasVida.toLocaleString()} dias de vida até hoje!!
      </p>
      <p>
        Se passaram {dados.diasPosNiver} dias do seu último aniversário,
        restando {dados.diasRestPniver} dias para o próximo!!
      </p>
      {getFrasesCar()}
      <hr />
      <p className={css.pbold}>OBRIGADO PELA PARTICIPAÇÃO!!!</p>
    </div>
  )
}
