  //#region ========= log msg functions ======
  const fxPrc = (p) => parseFloat(p.toFixed(2));
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
  // #endregion

  export { objMsg, adMsg, consLog, cLg, showLogs }
