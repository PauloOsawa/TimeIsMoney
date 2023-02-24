import { useEffect, useRef } from "react";
import css from "@/styles/CpResults.module.css";

export default function CpResults({ dados, stopAnim, animEnd }){
  console.log('CpResults --------- stopAnim =', stopAnim);

  const {Anual: gastoAno, Mensal: gastoMes, Diário: gastoDia} = dados.totalGasto;
  const {Anual: lucroAno, Mensal: lucroMes, Diário: lucroDia} = dados.totalLucro;
  const {Anual: saldoAno, Mensal: saldoMes, Diário: saldoDia} = dados.totalSaldos;

  const cancelAnim = useRef(false);

  // --------------------------------------------
  const fxPrc = (p) => parseFloat(p.toFixed(2));

  const getBrPrc = (p) => {
    if(!p || p === 0){ return (p === 0 ? '0,00' : 'xxxxxxxxxx'); }
    if(Number.isInteger(p)){ return p.toLocaleString() + ',00'; }
    return parseFloat(p.toFixed(2)).toLocaleString().replace(/([,][0-9])$/, '$10').replace(/([^,][0-9]{2})$/, "$1,00");
  }

  // --------------------------------------------

  return (
    <div className={`${css.dvfinal}`}>
      <h3>RESULTADOS</h3>

      {dados?.result?.map((r, i) => ( <p key={i}> <b>{r}</b> </p> ))}
      {/* <p><b> {dados.result[0]} </b></p> */}
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
        <span>Seus <b>LUCROS</b> totalizam <span className={'nobrk'}>R$ {getBrPrc(lucroAno)}</span> Anuais, </span>
        <span>R$ {getBrPrc(lucroMes)} Mensais, e R$ {getBrPrc(lucroDia)} Diários!!</span>
      </p>
      <p>
        <span>Seus <b>GASTOS</b> totalizam <span className={'nobrk'}>R$ {getBrPrc(gastoAno)}</span> Anuais, </span>
        <span>R$ {getBrPrc(gastoMes)} Mensais, e R$ {getBrPrc(gastoDia)} Diários!!</span>
      </p>
      <p>
        <span>Os <b>SALDOS</b> resultantes são de <span className={'nobrk'}>R$ {getBrPrc(saldoAno)}</span> Anuais, </span>
        <span>R$ {getBrPrc(saldoMes)} Mensais, e R$ {getBrPrc(saldoDia)} Diários!!</span>
      </p>
    </div>
  )
}
