import { getDiaWeek } from "@/libs/dateHelper"
import css from "@/styles/CpResults.module.css";

export default function CpResults({ dados, animStop, animEnd }){
  console.log('CpResults --------- animStop =', animStop);

  const {Anual: gastoAno, Mensal: gastoMes, Diário: gastoDia} = dados.totalGasto;
  const {Anual: lucroAno, Mensal: lucroMes, Diário: lucroDia} = dados.totalLucro;
  const {Anual: saldoAno, Mensal: saldoMes, Diário: saldoDia} = dados.totalSaldos;

  const clfx = !animStop ? `${css.dvfinal} ${css.fx}` : css.dvfinal;

  // --------------------------------------------
  const fxPrc = (p) => parseFloat(p.toFixed(2));

  const getBrPrc = (p) => {
    if(!p || p === 0){ return (p === 0 ? '0,00' : 'xxxxxxxxxx'); }
    if(Number.isInteger(p)){ return p.toLocaleString() + ',00'; }
    return parseFloat(p.toFixed(2)).toLocaleString().replace(/([,][0-9])$/, '$10').replace(/([^,][0-9]{2})$/, "$1,00");
  }

  const getSpanTag = (p) => <span className={css.nobrk}>R$ {getBrPrc(p)}</span>;
  // --------------------------------------------
  const getFrasesCar = () => {
    if(!dados?.hasCar){ return; }
    return (<>
      <hr />
      <p>
        <span>Por ano, você gasta { getSpanTag(dados.gastoCar) } apenas de Ipva e combustível! </span>
        <span>Se contar manutenção, multas, etc, poderia fazer aquela Viagem dos sonhos!</span>
      </p>
    </>);
  }
  // --------------------------------------------
  const hasResult = (tipo) => {
    const restipo = dados?.lastResults?.tipo ?? '';
    if(!dados?.lastCalc || dados?.lastCalc === 0){ console.log('sem calc'); return false; }
    if(restipo !== tipo){ console.log('sem tipo =='); return false; }
    return dados?.lastResults?.resultado;
  }
  // --------------------------------------------
  const getFrasesByVal = () => {
    const lastres = hasResult('byVal');
    if(!lastres){ return; }
    const isNever = (lastres === 'NUNCA');
    const valsearch = dados.lastResults.valor;
    const hasPoup = dados.temPoupanca && dados.result.length > 2;
    return !isNever ? (<>
      <p className={css.pbold}>
        A data que irá conseguir {getSpanTag(valsearch)} é {lastres}!!
      </p>
      <p>{dados.result[1]}</p>
      {!!hasPoup && (
        <p>
          <span>{dados.result[2]}</span>
          <span>{dados.result[3]}</span>
        </p>)
      }
      </>) : (
      <p className={css.pbold}>Infelizmente você NUNCA irá conseguir este valor!!</p>
    );

  }
  // --------------------------------------------
  const getFrasesByDt = () => {
    const lastres = hasResult('byDate');
    if(lastres === false){ return; }
    const dtsearch = dados.lastResults.valor;
    const hasPoup = dados.temPoupanca && dados.result.length > 2;
    return (<>
      <p className={css.pbold}>
        <span>{dados.result[0]}</span>
        <span>terá um saldo TOTAL de {getSpanTag(lastres)} !!</span>
      </p>
      {!!hasPoup && (<>
        <p>
          <span>{dados.result[2]}</span>
          <span>{dados.result[3]}</span>
          <span>{dados.result[4]}</span>
        </p>
        <p>
          <span>{dados.result[5]}</span>
          <span>{dados.result[6]}</span>
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
      {/* {dados?.result?.map((r, i) => ( <p key={i}> <b>{r}</b> </p> ))} */}
      {getFirstP()}
      <hr />

      <p>
        Seus <b>LUCROS</b> totalizam {getSpanTag(lucroAno)} Anuais,
        <span> {getSpanTag(lucroMes)} Mensais,</span>
        <span> e {getSpanTag(lucroDia)} Diários!!</span>
      </p>
      <p>
        Seus <b>GASTOS</b> totalizam {getSpanTag(gastoAno)} Anuais,
        <span> {getSpanTag(gastoMes)} Mensais,</span>
        <span> e {getSpanTag(gastoDia)} Diários!!</span>
      </p>
      <p>
        <span>Os <b>SALDOS</b> resultantes são de </span>
        <span>{getSpanTag(saldoAno)} Anuais, {getSpanTag(saldoMes)} Mensais,</span>
        <span> e {getSpanTag(saldoDia)} Diários!!</span>
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
    </div>
  )
}
