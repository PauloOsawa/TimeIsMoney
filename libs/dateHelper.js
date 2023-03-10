
//#region ======================================== DATE AND PRICE HELPERS
const mesesMinDays = [ 1, 3, 5, 8, 10 ];
const diasSemana = [ 'Domingo', 'Segunda-Feira', 'Terça-Feira', 'Quarta-Feira', 'Quinta-Feira', 'Sexta-Feira', 'Sábado' ];
const meses = [
  'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho',
  'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
]

const getArDt = dt => [dt.getFullYear(), dt.getMonth(), dt.getDate()];

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
  return (totDays);
}

const getDiaWeek = (dt) => {
  const diaWeek = dt.getDay();
  const txtDia = ([0, 6].includes(diaWeek) ? 'um ': 'uma ') + diasSemana[diaWeek];
  return txtDia;
}

const getDtsRestante = (dta, dtb) => {
  let totanos, totMeses, totDias;
  const dtGt = dta > dtb ? dta : dtb;
  const dtMin = dtb > dta ? dta : dtb;
  const arDtGt = getArDt(dtGt);
  const arDtMin = getArDt(dtMin);
  const [ anoGt, mesGt, diaGt ] = arDtGt;
  const [ anoMin, mesMin, diaMin ] = arDtMin;

  const retEnd = () => {
    return { totAnos: totanos, totMeses: totMeses, totDias: totDias };
  }

  totanos = anoGt - anoMin;
  let testDt = new Date(anoGt, mesMin, diaMin);

  if(dtGt >= testDt){
    totMeses = mesGt - mesMin;
    if(diaGt < diaMin){ totMeses--; }
    totDias = diaGt - diaMin;
    return retEnd();
  }

  if(testDt > dtGt){ totanos--; testDt = new Date((anoGt - 1), mesMin, diaMin); }
  let [ anoTest, mesTest, diaTest ] = getArDt(testDt);
  totMeses = mesGt >= mesTest ? mesGt - mesTest : 12 - (mesTest - mesGt);
  testDt = new Date(anoGt, mesGt, diaMin);

  if(testDt > dtGt){ totMeses--; testDt.setMonth(mesGt - 1); }
  totDias = parseInt(getNumDays(dtGt - testDt));
  return retEnd();
}
//#endregion =======================================

//#region ----------------------------- FIELD NIVER
const setaIdade = (arNasc, dthj) => {
  const arDtHj = getArDt(dthj);
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
    diasPosNiver: Math.floor(diasPosNiver),
    diasRestPniver: Math.ceil(diasRestPniver)
  }
  return objIdade;
}
/* ------------------------------- */

export {
  mesesMinDays, diasSemana, getDiaWeek, meses, ehBisexto, isFevBi, getQtdAnosBis,
  getDiasNoMes, getNumDays, getDtsRestante, setaIdade
}
