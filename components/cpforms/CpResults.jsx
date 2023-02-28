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

  return (
    <div className={clfx}>
      <h3>RESULTADOS</h3>

      {dados?.result?.map((r, i) => ( <p key={i}> <b>{r}</b> </p> ))}
      <hr />

      <p>
        Você nasceu em { dados.diaNasc }, tem {dados.idade} anos de idade,
        totalizando {dados.diasVida.toLocaleString()} dias de vida até hoje!!
      </p>
      <p>
        Se passaram {dados.diasPosNiver} dias do seu último aniversário,
        restando {dados.diasRestPniver} dias para o próximo!!
      </p>
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
    </div>
  )
}
