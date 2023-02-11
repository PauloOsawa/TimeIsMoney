import { useState } from "react";

export default function useTimeMoney(hoje) {

  const dthj = new Date(hoje);
  const arDtHj = [dthj.getFullYear(), dthj.getMonth(), dthj.getDate()]

  const userdata = {
    dtHoje: dthj ?? null, dtNasc: null, idade: 0,
  }

  const [dados, setDados] = useState({ ...userdata});

  //#region ======================================== DATE AND PRICE HELPERS
  const arDiasMeses = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
  const mesesMaxDays = [ 0, 2, 4, 6, 7, 9, 11 ]
  const mesesMinDays = [ 1, 3, 5, 8, 10 ]
  const diasSemana = [ 'Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado' ]
  const meses = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho',
    'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ]

  const ehBisexto = ano => ano % 4 === 0;
  const isFevBi = (mes, ano) => (mes === 1 && ano % 4 === 0) ? 1 : 0;

  const getQtdAnosBis = (ano, qtanos) => {
    let qtdAnosbis = ehBisexto(ano) ? 1 : 0;
    const absQtanos = Math.abs(qtanos);
    qtdAnosbis += parseInt(absQtanos/4);
    if (((ano % 4) + (absQtanos % 4)) > 3) {  qtdAnosbis++; }
    return qtdAnosbis;
  }

  const getDiasNoMes = (mes, ano) => {
    if (mes === 1) { return (ano % 4 === 0) ? 29 : 28; }
    return mesesMinDays.includes(mes) ? 30 : 31;
  }

  const getNumDays = (ms) => {
    const totDays = ms / (1000 * 60 * 60 * 24);
    // console.log('totDays = ', totDays );
    return (totDays);
  }

  const fxPrc = (p) => parseFloat(p.toFixed(2));
  //#endregion =======================================

  const setgastos = (gastos) => { setDados({...dados, gastos: gastos}); }

  const addMoney = (tipo, arMoney) => {
    const obj = { nome: arMoney[0], periodo: arMoney[1], valor: arMoney[2] }
    let arDados = (tipo in dados) ? [...dados[tipo], obj]: [obj];
    setDados({...dados, [tipo]: arDados});
  }

  //#region ----------------------------- FIELD NIVER
  const setaIdade = (arNasc) => {
    const [anoNasc, mesNasc, ddNasc] = arNasc;
    let lastAnoNiver = arDtHj[0];
    const lastniver = new Date(lastAnoNiver, mesNasc, ddNasc);
    const fezNiverNoAno = dthj > lastniver;
    const nextniver = !fezNiverNoAno ? new Date(arDtHj[0], mesNasc, ddNasc) : new Date((arDtHj[0]+1), mesNasc, ddNasc);
    const diasRestPniver = getNumDays(nextniver - dthj);
    if(!fezNiverNoAno){ lastAnoNiver--;  lastniver.setFullYear(lastAnoNiver); }
    const diasPosNiver = getNumDays(dthj - lastniver);

    const objIdade = {
      idade: lastAnoNiver - anoNasc,
      diasPosNiver: diasPosNiver.toFixed(1),
      diasRestPniver: diasRestPniver.toFixed(1)
    }
    return objIdade;
  }
  /* ------------------------------- */
  const setbirth = (d) => {
    const dtNasc = new Date(d[0], d[1], d[2], 0);
    if (!(!dados?.dtNasc || dados.dtNasc?.getTime() !== dtNasc.getTime())) { return; }
    const diasVida = parseInt(getNumDays(dthj - dtNasc));
    const objNiver = {  arNasc: d, dtNasc: dtNasc, diasVida: diasVida }
    const objIdade = setaIdade(d);
    setDados({...dados, ...objNiver, ...objIdade});
  }
  //#endregion ----

  //#region ======================================== CALC FIM
  const setFinalResults = () => {
    console.log('setFinalResults',  );
    const results = []
    results.push('linha a');
    results.push('linha b');
    // setDados({...dados, result:[...results]})

  }

  const calcByDt = (dtCalc, saldos) => {
    console.log('calcByDt',  );
    let total = 0;
    const arDtCalc = [dtCalc.getFullYear(), dtCalc.getMonth(), dtCalc.getDate()]
    const {Anual, Mensal, Diário } = saldos.totalSaldos;

    const totDias = parseInt(getNumDays(dtCalc - dthj));
    const valDias = Diário*totDias;
    console.log('totDias = ', totDias, valDias );
    total += valDias;

    const difMesesInAno = arDtCalc[1] >= arDtHj[1] ? arDtCalc[1] - arDtHj[1] : 12 - (arDtHj[1] - arDtCalc[1]);
    const totAnos = parseInt(totDias/365);
    const totMeses = totAnos*12 + difMesesInAno;
    const valMeses = Mensal*totMeses;
    console.log('totMeses = ', totMeses, valMeses );
    total += valMeses;

    const difAnos = arDtCalc[0] - arDtHj[0];
    const valAno = Anual*difAnos;
    console.log('difAnos = ', difAnos, valAno );
    total += valAno;
  }

  const calcByVal = (val, saldos) => {
    console.log('calcByVal',  );
    const {Anual, Mensal, Diário } = saldos.totalSaldos;
    let [ano, mes, dia] = [...arDtHj]
    const getSumDiasMes = (mes, ano) => Diário*getDiasNoMes(mes, ano);
    let totalDias = 0;
    let totalMeses = 0;
    let totalAnos = 0;
    let totalVal = 0;
    const retorna = () => {
      return { totais:[totalAnos, totalMeses, totalDias], arData: [ano + totalAnos, mes, dia ]  }
    }

    let somaDiasInMes = getSumDiasMes(mes, ano);
    if (somaDiasInMes >= val){totalDias = parseInt(val/Diário); retorna(); }

    let somaMes = Mensal + somaDiasInMes;
    if (somaMes >= val) { totalMeses++; totalDias += getDiasNoMes(mes, ano); retorna(); }

    const somaInAno = (Mensal*12) + (Diário*365);
    if (somaInAno >= val) {
      totalMeses = parseInt(val/somaMes);
      totalDias = (totalMeses*30) + (totalMeses/2) + (totalMeses % 30);
      retorna();
    }
    const somaAno = Anual + (Mensal*12) + (Diário*365);
    const mediaMes = somaAno/12;

    if (somaAno >= val) { totalMeses++; totalDias = getDiasNoMes(mes, ano); }

    if (mediaMes < 0) { retorna(); }

    if (val < somaDiasInMes || val < somaMes) {
      totalDias = val < somaDiasInMes ? parseInt(val/Diário) : tdias;
      totalMeses = val < somaDiasInMes ? 0 : 1;
      retorna();
    }

    totalVal = somaMes;
    totalMeses++;
  }

  const somaVals = (tipo) => {
    const obval = {Anual: 0, Mensal: 0, Diário: 0}
    if(!tipo in dados){ console.log('sem', tipo ); return obval; }
    dados[tipo].forEach(val => {  obval[val.periodo] += val.valor; });
    return obval;
  }

  const setSaldos = () => {
    // const obGastos = {Anual: 0, Mensal: 0, Diário: 0}
    const saldos = { totalLucro: somaVals('lucros'), totalGasto: somaVals('gastos') }
    // const obLucros = somaVals('lucros');
    // const obGastos = somaVals('gastos');
    const obSaldos = {}
    for(let k in saldos.totalLucro){  obSaldos[k] = saldos.totalLucro[k] - saldos.totalGasto[k]; }
    saldos.totalSaldos = obSaldos;

    const somaDiasInMes = obSaldos.Diário*30;
    const somaMensalDias = obSaldos.Mensal + somaDiasInMes;
    const somaMesesInAno = somaMensalDias*12;
    const somaAnoMeses = obSaldos.Anual + somaMesesInAno;
    const totalSomas = { somaAnual: somaAnoMeses, somaMensalDias: somaMensalDias, somaDiasInMes: somaDiasInMes }

    return {...saldos, ...totalSomas};
    // setValsDts(obj, saldos);
    // return {totalLucro: obLucros, totalGasto: obGastos, totalSaldos: obSaldos }
    // setDados({...dados, totalLucro: {...obLucros}, totalGasto: {...obGastos}, totalSaldos: {...obSaldos}});
  }

  const calcAll = (obj) => {
    // setDados({...dados, ...obj});
    const saldos = setSaldos();
    if(!!obj?.dtCalc){
      calcByDt(obj.dtCalc, saldos );
    } else {
      calcByVal(obj.saldoCalc, saldos );
    }
    // setCurious();
    setFinalResults();

  }
  //#endregion =======================================

  return {
    dados, setbirth, addMoney, setgastos, setDados, calcAll
  }
}
