
const getSaldos = (keySaldos) => {
  const arTxt = []
  if(!dados[keySaldos]) return;

  for (const k in dados[keySaldos]) {
    if (dados[keySaldos][k] > 0) {
      const valor = `R$ ${dados[keySaldos][k].toFixed(2)} ${k}`
      arTxt.push(valor)
    }
  }
  return arTxt.join(', ');
}

// let qtdChamadas = 0;
const fxPrc = (p) => parseFloat(p.toFixed(2));

const getBrPrc = (p) => {
  // qtdChamadas++;
  // console.log('qtdChamadas = ', qtdChamadas, 'valor=', p );
  if(!p || p === 0){ return (p === 0 ? '0,00' : 'xxxxxxxxxx'); }
  if(Number.isInteger(p)){ return p.toLocaleString() + ',00'; }
  return parseFloat(p.toFixed(2)).toLocaleString().replace(/([,][0-9])$/, '$10').replace(/([^,][0-9]{2})$/, "$1,00");
}

const getSpanPrc = (p) => (<span className={'nobrk'}>R$ {getBrPrc(p)}</span>);

export {
  fxPrc, getBrPrc, getSpanPrc
}
