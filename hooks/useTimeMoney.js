import { useState } from "react";

export default function useTimeMoney(hoje) {

  const dthj = new Date(hoje);
  const arDtHj = [dthj.getFullYear(), dthj.getMonth(), dthj.getDate()]

  const userdata = {
    dtHoje: dthj ?? null, dtNasc: null, idade: 0, diasVida: 0, diasPosNiver: 0, diasRestPniver: 0,
    totalLucro: {Anual: 0, Mensal: 0, Diário: 0},
    totalGasto: {Anual: 0, Mensal: 0, Diário: 0},
    totalSaldos: {Anual: 0, Mensal: 0, Diário: 0}
  }

  const [dados, setDados] = useState({ ...userdata});

  const resultados = {
    idade: [
      `Você tem ${dados.idade} anos de idade, totalizando ${dados.diasVida} dias de vida até hoje!!`,
      `Restam ${dados.diasRestPniver} dias para seu próximo aniversário!!`,
      `Se passaram ${dados.diasPosNiver} dias do seu último aniversário!!`,
    ],
    saldos: [
      `Seus GASTOS totalizam R$ ${dados.totalGasto.Anual.toFixed(2)} Anuais, R$ ${dados.totalGasto.Mensal.toFixed(2)} Mensais, e R$ ${dados.totalGasto.Diário.toFixed(2)} Diários`,
      `Seus LUCROS totalizam R$ ${dados.totalLucro.Anual.toFixed(2)} Anuais, R$ ${dados.totalLucro.Mensal.toFixed(2)} Mensais, e R$ ${dados.totalLucro.Diário.toFixed(2)} Diários`,
      `Os SALDOS resultantes são de R$ ${dados.totalSaldos.Anual.toFixed(2)} Anuais, R$ ${dados.totalSaldos.Mensal.toFixed(2)} Mensais, e R$ ${dados.totalSaldos.Diário.toFixed(2)} Diários`,

    ]
  }

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
  const setlucros = (lucros) => { setDados({...dados, lucros: lucros});}

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
      // diasPosNiver: diasPosNiver.toFixed(1),
      diasPosNiver: Math.floor(diasPosNiver),
      diasRestPniver: Math.ceil(diasRestPniver)
      // diasRestPniver: diasRestPniver.toFixed(1)
    }
    return objIdade;
  }
  /* ------------------------------- */
  const setbirth = (d) => {
    const dtNasc = new Date(d[0], d[1], d[2], 0);
    if (!(!dados?.dtNasc || dados.dtNasc?.getTime() !== dtNasc.getTime())) { return; }
    const diasVida = parseInt(getNumDays(dthj - dtNasc));
    const objNiver = { arNasc: d, dtNasc: dtNasc, diasVida: diasVida }
    const objIdade = setaIdade(d);
    setDados({...dados, ...objNiver, ...objIdade});
    return objIdade.idade;
  }
  //#endregion ----


  //#region ================================= FINAL FUNCTIONS
  const setFinalResults = (arTxts) => {
    console.log('setFinalResults',  );
    const results = []
    results.push('linha a');
    results.push('linha b');
    // setDados({...dados, result:[...results]})
    setDados({...dados, result:[...arTxts, ...resultados.idade, ...resultados.saldos]})
  }

  //#region ================================= CALC FUNCTIONS
  const calcByDt = (dtCalc, saldos) => {
    console.log('calcByDt',  );
    let total = 0;
    const arDtCalc = [dtCalc.getFullYear(), dtCalc.getMonth(), dtCalc.getDate()]
    const {Anual, Mensal, Diário } = dados.totalSaldos;

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

    const txt = "Até esta data, você irá conseguir o valor de R$ " + total.toFixed(2) + "!!";
    console.log('CÁLCULOS DE POUPANÇA AINDA NÃO IMPLEMENTADOS',  );
    setFinalResults([txt]);
  }

  //#region =============================  setDtsByVal ======

  //#region ========= log msg functions ======
  let objMsg = []
  const adMsg = (m) => objMsg.push(m);
  const consLog = (...obs) => { (obs ?? objMsg).forEach(ob => console.log( ob, '\n' ))  }
  const cLg = (...obs) => console.log(...obs);

  const showLogs = (val, subval, obval, somaTAno, somaMes, somaDias) => {
    cLg('val=',val, 'subval=', fxPrc(subval));
    cLg(obval);
    let somas = {sTAno: somaTAno, sMes: somaMes, sDias: somaDias}
    cLg(somas, '\n');
  }
  const showPoup = () => {
    const m = fxPrc(objPoupanca.montante);
    let { capital: c , juros: jj, tempo: tt, periodo: p, isAm } = objPoupanca
    // c = parseFloat(c.toFixed(2));
    const arp = isAm ? ['Meses','% ao Mês'] : ['Anos','% ao Ano'];
    jj = parseInt((jj-1)*100);
    cLg('Capital: R$', c,'com Juros de', jj, arp[1],'em',tt, arp[0], '= R$', m,'(Montante)');
    // cLg( {...objPoupanca, montante: m} );

  }
  const setMsg = (arTudo, obval) => {
    console.log('setMsg',  );
  }
  // #endregion

  //#region ================ BY VAL helper functions
  const setFinalDts = (arDts) => {
    const [anosBisextos, qtAnos, qtMeses, qtDias, ano, mes, dia, anoIni, mesIni, diaIni] = arDts;
    const qdts = { qtDias: qtDias, qtMeses:qtMeses, qtAnos:qtAnos, anosBi:anosBisextos }
    // const qdts = { qtAnos:qtAnos, qtMeses:qtMeses, qtDias: qtDias, anosBi:anosBisextos }
    const dtIni = { anoHj: anoIni ?? arDtHj[0], mesHj: mesIni ?? arDtHj[1], diaHj: diaIni ?? arDtHj[2] }
    // const dtBini = dthj.toLocaleDateString()
    const dtBini = new Date(dtIni.anoHj, dtIni.mesHj, dtIni.diaHj).toLocaleDateString()
    // const dt = { ano:arDts[4], mes:arDts[5], dia:arDts[6] }
    const dbt = new Date(arDts[4], arDts[5], arDts[6]).toLocaleDateString()
    // consLog( qdts, dtIni, dt);
    consLog( qdts, (dtBini + '  --  ' + dbt));
    const txt = "A data que irá conseguir este valor é " + dbt;
    setFinalResults([txt])
    // consLog( qdts, dt, (dtBini + '  --  ' + dbt));
    // console.log('dt = ', dt );
  }

  const getValsPeriodo = (Anual, Mensal, Diário, ano, mes) => {
    const somaPAno = (Diário*365) + (Mensal*12);
    const sdias = Diário*30;
    return [somaPAno + Anual, somaPAno, (sdias + Mensal), sdias ];
  }

  const valEhMaior = (va, vb, eq) => {
    eq = eq ?? false;
    const [a, b] = vb >= 0 ? [va, vb] : [vb, va];
    return !eq ? a > b : a >= b;
  }
  //#endregion

  //#region ========================== POUPANÇA
  const objPoupanca = { montante:0, capital:0, juros:0, tempo:0, periodo:false, isAm:false }

  const setPoupanca = (poupanca) => {
    for (const k in poupanca) { objPoupanca[k] = poupanca[k]; }
    if(!('montante' in poupanca)){ objPoupanca.montante = poupanca?.capital ?? objPoupanca.capital}
    if('juros' in poupanca){
      const jj = poupanca.juros;
      objPoupanca.juros = Number.isInteger(jj) ? (1+ jj / 100 ) : jj;
    }
    if('periodo' in poupanca){ objPoupanca.isAm = (objPoupanca.periodo === 'mensal') }
  }

  const getMontantePoupanca = (tempo, isAno) => {
    tempo = !!isAno && objPoupanca.isAm ? tempo * 12 : tempo;
    const montante = objPoupanca.capital * Math.pow(objPoupanca.juros, tempo);
    return montante;
  }

  const getTempoParaMontante = (m, c, j) => {
    let {montante, capital, juros} =(m && c && j && {montante:m, capital:c, juros:j}) ?? objPoupanca;
    juros = Number.isInteger(juros) ? 1 + juros / 100 : juros;
    // let tempo = Math.log2(montante / capital) / Math.log2(1 + juros / 100);
    let tempo = Math.log2(montante / capital) / Math.log2(juros);
    tempo = Math.round(tempo);
    return tempo;
  }

  const somaMontante = (toSet) => {
    const obm = objPoupanca.montante > 0 ? objPoupanca.montante : objPoupanca.capital;
    const mont = obm*objPoupanca.juros;
    if(toSet){ objPoupanca.montante = mont; objPoupanca.tempo++; }
    return ( mont - obm);
  }
  // #endregion

  // ------------------------------------------------
  const getYearsByVal = (ano, val, somaAno, valDiario, poupanca) => {
    let [restoVal, vtotalAno, vmont, vsum, qtdAnos, qtdAnosBis] = [val, somaAno, 0, 0, 0, 0];
    if(poupanca){ vmont = getMontantePoupanca(1, 'isAno'); vtotalAno += vmont; }
    if(valEhMaior(vtotalAno, val)){ return [0, 0, val]; }

    const setaResto = () => {
      qtdAnosBis = getQtdAnosBis(ano, qtdAnos);
      vsum = somaAno*qtdAnos + vmont + qtdAnosBis*valDiario;
      restoVal = val - vsum;
    }

    qtdAnos = parseInt(val / vtotalAno);
    setaResto();

    if(!poupanca){
      if(restoVal >= vtotalAno){ cLg('-------- add +1 ano, restval > tano'); qtdAnos++; setaResto(); }
      return [qtdAnos, qtdAnosBis, restoVal];
    }
    // ------------------------------------
    const retEnd = () => {
      if(poupanca && qtdAnos >= 1){
        const tempo = objPoupanca.isAm ? qtdAnos*12 : qtdAnos;
        objPoupanca.tempo += tempo;
        objPoupanca.montante = getMontantePoupanca(objPoupanca.tempo);
        // setPoupanca({montante:vmont, tempo: tempo});
      }
      return [qtdAnos, qtdAnosBis, restoVal];
    }
    // ------------------------------------
    if(qtdAnos === 0 || qtdAnos === 1){ return retEnd(); }
    const isNeg = qtdAnos < 0;

    const passouVal = () => {
      vmont = getMontantePoupanca(qtdAnos, 'isAno'); setaResto(); return vsum > val;
      // cLg('qtdAnos = ', qtdAnos, 'vmont + somaAno*qtdAnos=',vmont + somaAno*qtdAnos );
    }

    if(isNeg){
      const {capital, juros } = poupanca;
      qtdAnos = parseInt( getTempoParaMontante(val, capital, juros)/12);
      let somval = val - qtdAnos*somaAno;
      qtdAnos = parseInt( getTempoParaMontante(somval, capital, juros)/12);
    }

    let passou = passouVal();
    while (!passou) { qtdAnos++; passou = passouVal(); }

    if(isNeg){ restoVal = vsum - val; return retEnd(); }

    while (passou) { qtdAnos--; passou = passouVal(); }

    return retEnd();
  }

  // ------------------------ retorna data, qtds, val e valresto  ----

  const setDtsByVal = (val, obval, poupanca, arDtIni) => {
    // #region ------------- variaveis internas
    arDtIni = arDtIni ?? (Array.isArray(poupanca) ? poupanca : arDtHj);
    if (val === 0) { return setFinalDts([0, 0, 0, 0, ...arDtIni]); }
    const temPoupanca = !!poupanca && !(Array.isArray(poupanca));
    if (temPoupanca) { setPoupanca(poupanca) }
    const [hasPoupMes, hasPoupAno] = temPoupanca ? [objPoupanca.isAm, !objPoupanca.isAm] : [false,false];
    const vmontUm = temPoupanca ? getMontantePoupanca(1) : 0;
    let [vmontMes, vmontAno] = hasPoupMes ? [vmontUm, getMontantePoupanca(12)] : [0, vmontUm]

    const [valPos, valNeg, { Anual, Mensal, Diário }] = [(val > 0), (val > 0 ? 1 : -1), obval];
    const isDaysCount = Diário*valNeg > 0 && Diário !== 0;
    let [ano, mes, dia, subval] = [...arDtIni, val]
    let[qtAnos, qtMeses, qtDias, anosBisextos, viraAno, viraMes] = [0, 0, 0, 0, 0, 0]
    let [ somaTAno, somaPAno, somaMes, somaDias ] =  getValsPeriodo(Anual, Mensal, Diário, ano, mes);
    // #endregion
    const arVals = [ Diário, somaDias, somaMes, (somaMes + vmontMes), somaPAno, somaTAno, (somaTAno + vmontAno)];
    let arValMeses = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
    arValMeses.forEach((dias, i) => { arValMeses[i] = Mensal + Diário * dias; })
    const last = arVals[arVals.length - 1];
    const zerouVal = (vtemp) => valPos ? (vtemp ?? subval) <= 0 : (vtemp ?? subval) >= 0;
    const endSetDts = (msge) => {
      cLg('\n',' --------------------------------- endSetDts----ZEROUVAL =',zerouVal() );
      showLogs(val, subval, obval, somaTAno, somaMes, somaDias);
      setFinalDts([anosBisextos, qtAnos, qtMeses, qtDias, ano, mes, dia, ...arDtIni]);
      if (temPoupanca) { showPoup(); }
    }
    const getNextMaxVal = (vals) => (vals ?? arVals).find(v => valEhMaior(v, subval, true));
    let nextMaxVal = getNextMaxVal();
    cLg('val =',val, obval );
    cLg('arvals=',...arVals);
    // ------------------------------------------
    console.log('nextMaxVal = ', nextMaxVal );
    if (!nextMaxVal) {
      const sameSign = valEhMaior(last, valNeg, true)
      const notPossible = (!valPos && last > 0) || (!sameSign && !temPoupanca)
      if (notPossible) { console.log('----------IMPOSSIVEL'); return endSetDts(); }
    }

    let qdiasMes = getDiasNoMes(mes, ano);
    let [diasRest, sumdays] = [qdiasMes - dia, Diário*(qdiasMes -1)];
    // ---------------------------------------------------
    const passouAno = () => {
      const va = Anual + (hasPoupAno ? somaMontante(true) : 0);
      viraAno++; ano++;
      if(ano % 4 === 0){ anosBisextos++; }
      cLg('\n ===== passou ANO ======= ',ano,'subval=',fxPrc(subval) ,'-', va,'=',fxPrc(subval-va)  ,'PoupAoano', hasPoupAno);
      subval -= va;
    }

    const passouMes = (vmes) => {
      const dif = hasPoupMes ? somaMontante(true) : 0;
      const msg = !vmes ? 'SÓ MENSAL' : 'MES FULL';
      if(!vmes){ viraMes++; } else { qtMeses++; }
      vmes = vmes ?? Mensal + dif + (mes !== 1 ? 0 : isFevBi(mes, ano)*Diário);
      mes++;
      cLg('dif =',fxPrc(dif),'qtm=',qtMeses,'---- passou Mes=',mes,msg, fxPrc(vmes - dif), 'subval=',fxPrc(subval),'-',fxPrc(vmes),'=', fxPrc(subval-vmes));
      subval -= vmes;
      if(mes > 11){ mes = 0; passouAno(); }
    }

    const setNiuDays = () => {
      qdiasMes = getDiasNoMes(mes, ano); [diasRest, sumdays] = [(qdiasMes - dia), (Diário*(qdiasMes -1))];
    }

    const somaDays = (qd) => {
      cLg(qd,'+(somaDays dia=', dia, 'qtDias=',qtDias,') subv=',subval, '-', qd*Diário, subval-qd*Diário)
      dia += qd; qtDias += qd;
      subval -= qd*Diário;
      if(dia > qdiasMes){ dia -= qdiasMes; passouMes(); }
    }

    const sumMeses = (isLoop) => {
      let i = mes;
      for (i; i < 12; i++){
        let v = arValMeses[i] + (hasPoupMes ? somaMontante() : 0);
        if(i === 1 && ano % 4 === 0){v += Diário; }
        if(valEhMaior(v, subval)){ break; }
        passouMes(v);
        if(zerouVal()){ break; }
        if(i === 11){ i = !isLoop ? i : -1; }
      }
      return (!zerouVal() && mes === 0);
    }
    // #region ========================== FECHA ANO
    const fechaMes = () => {
      if (dia === 1) { return true; }
      if(valEhMaior(diasRest*Diário, subval)){ somaDays(Math.ceil(subval/Diário)); return false; }
      somaDays(diasRest + 1); return !zerouVal();
    }
    if (!fechaMes()) { cLg('NAO FECHOU MES'); return endSetDts(); }

    const fechaAno = () => {
      if (mes === 0) { return true; }
      if (!sumMeses()){
        console.log('!sumMeses',  );
        if (zerouVal()) { return false; }
        setNiuDays();
        if(!isDaysCount || !valEhMaior(sumdays, subval)){
          passouMes(); return (!zerouVal() && mes === 0);
        }
        if(valEhMaior(diasRest*Diário, subval)){ somaDays(Math.ceil(subval/Diário)); return false; }
      }
      return zerouVal();
    }
    if (!fechaAno() && zerouVal()) {
      cLg('NAO FECHOU fechaAno MAS zerouVal e subval =' , subval);
      return endSetDts();
    }
    // #endregion ========================== MIN

    if(!valEhMaior(last, subval)){
      const oldMont = temPoupanca ? objPoupanca.montante : 0;
      [qtAnos, anosBisextos, subval] = getYearsByVal(ano, subval, somaTAno, Diário, poupanca);
      ano += qtAnos;
      let sumt = qtAnos*somaTAno;
      let sumb = anosBisextos*Diário;
      let msgs = ['\n val>sTAno, ano=', ano,'qtanos=',qtAnos, '*', somaTAno,'(somTano) + anosBi(',anosBisextos,')*diario =']
      let mont = !temPoupanca ? 'semPoup' : '+ poup=';
      cLg(...msgs, sumt,'+', sumb,'=',sumt+sumb, mont, oldMont,(temPoupanca && fxPrc(objPoupanca.montante)), 'subval=',fxPrc(subval) );
    }
    cLg('FIM DO ANO - Parou em ', ano, mes,dia,'qtMes=',qtMeses,'subval=',fxPrc(subval),'sumdays', sumdays);
    cLg(' ---------------------------------- MESES ----------------------- ');
    const endMeses = () => {
      if(!valEhMaior(arValMeses[mes], subval)){
        sumMeses(true); if (zerouVal()){ return true; }
      }
      setNiuDays();
      if(!isDaysCount || !valEhMaior(sumdays, subval)){
        cLg('sumdays',sumdays,'nao chega',subval,'ou diario neg',Diário,'---- subdias add mes FULL');
        subval -= (arValMeses[mes] - Mensal);
        passouMes();
        qtMeses++;
        if(zerouVal()){ return true; }
        setNiuDays();
      }
      return zerouVal();
    }

    if(endMeses()){ return endSetDts(); }

    if(valEhMaior(Diário)){ somaDays(1); return endSetDts(); }

    if(!valEhMaior(sumdays, subval) && endMeses()){ return endSetDts(); }

    cLg(' ---------------------------------- dias ----------------------- ');
    const tempQtdias = Math.ceil(subval/Diário);
    somaDays(tempQtdias);

    cLg('dia=',dia ,'mes',mes,'qtDias=', qtDias, 'diasRest=',diasRest, 'qdiasMes',qdiasMes,'subval', fxPrc(subval) )
    if (zerouVal()) { return endSetDts(); }
    cLg('DIA FIM NÃO PAROU ------------------------')
    if(valEhMaior(Diário)){ somaDays(1); return endSetDts(); }
    if(!valEhMaior(sumdays, subval) && endMeses()){ return endSetDts(); }
    return endSetDts();
  }
  // #endregion


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
  //#endregion ==========

  //#endregion ==========
  const somaVals = (tipo) => {
    const obval = {Anual: 0, Mensal: 0, Diário: 0}
    if(!tipo in dados){ console.log('sem', tipo ); return obval; }
    dados[tipo].forEach(val => { obval[val.periodo] += val.valor; });
    return obval;
  }

  const setNiwSaldos = () => {
    const saldos = { totalLucro: somaVals('lucros'), totalGasto: somaVals('gastos') }
    const obSaldos = {}
    for(let k in saldos.totalLucro){ obSaldos[k] = saldos.totalLucro[k] - saldos.totalGasto[k]; }
    saldos.totalSaldos = obSaldos;
    setDados({...dados, ...saldos});
  }

  const setSaldos = () => {

    const saldos = { totalLucro: somaVals('lucros'), totalGasto: somaVals('gastos') }
    const obSaldos = {}
    for(let k in saldos.totalLucro){ obSaldos[k] = saldos.totalLucro[k] - saldos.totalGasto[k]; }
    saldos.totalSaldos = obSaldos;

    const somaDiasInMes = obSaldos.Diário*30;
    const somaMensalDias = obSaldos.Mensal + somaDiasInMes;
    const somaMesesInAno = somaMensalDias*12;
    const somaAnoMeses = obSaldos.Anual + somaMesesInAno;
    const totalSomas = { somaAnual: somaAnoMeses, somaMensalDias: somaMensalDias, somaDiasInMes: somaDiasInMes }

    return {...saldos, ...totalSomas};
  }

  const calcAll = (obj) => {
    // const saldos = setSaldos();

    if(!!obj?.dtCalc){
      // calcByDt(obj.dtCalc, saldos );
      calcByDt(obj.dtCalc );
    } else {
      // obval = {Anual: -1000, Mensal: 650, Diário: -10}
      const val = obj.saldoCalc;
      const obval = {...dados.totalSaldos}
      setDtsByVal(val, obval )
      // console.log('obval', obval, val );
      // calcByVal(obj.saldoCalc, saldos );
    }
    // setCurious();
    // setFinalResults();

  }
  //#endregion =======================================

  return {
    dados, setbirth, addMoney, setgastos, setlucros, setNiwSaldos, setDados, calcAll, resultados
  }
}
