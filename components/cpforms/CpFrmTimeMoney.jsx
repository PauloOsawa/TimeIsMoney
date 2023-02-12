import { useRef } from "react";
import useTimeMoney from "@/hooks/useTimeMoney";
import css from "@/styles/CpFrmTimeMoney.module.css";
import CpSelsDate from "./CpFrmSelsDate";
import CpTbMoney from "./CpTbMoney";
import CpFrmInptPrice from "./CpFrmInptPrice";

export default function CpFrmTimeMoney({ hoje, hideFrm }){

  const { dados, setbirth, addMoney, setgastos, setlucros, setNiwSaldos, setDados, calcAll, resultados } = useTimeMoney(hoje);
  const sthj = dados.dtHoje.toISOString().slice(0, 10);

  const fldact = useRef();
  const dvresults = useRef();

  //#region ============================== DATA OBJ functions ======
  const checkExistKname = (tipo, nome) => {
    const ob = (tipo in dados) ? dados[tipo].find(obj => obj.nome === nome) : false;
    return !!ob;
  }

  //#endregion ---------

  //#region =========================== HTML RENDER functions ======

  //#region ---------------------- form and global -------
  const submit = (e) => { e.preventDefault(); console.log('submit = ' ); }
  const reseta = (e) => { console.log('reset'); hideFrm(); }
  const goFld = (fld) => {
    if ( !fld || fld.nodeName !== 'FIELDSET') { console.log('noField',  ); return; }
    fldact.current.classList.remove(css.actv);
    fld.classList.add(css.actv);
    fldact.current = fld;
  }
  const showNextFld = (e) => {
    if (e?.target) { e.preventDefault() }
    goFld(fldact.current.nextElementSibling);
  }

  const backfld = (e) => {
    e.preventDefault();
    goFld(fldact.current.previousElementSibling);
    // console.log('backfld', fldact.current.name );
  }

  const viewElm = (cls, toHide) => {
    const el = document.querySelector('.'+cls);
    if (toHide) { el.classList.add(css.hidenb); return; }
    el.classList.remove(css.hidenb);
  }

  const clearResults = () => {
    const alltxts = dvresults.current.querySelectorAll('p');
    console.log('alltxts = ', alltxts );
    if(alltxts.length){ alltxts.forEach((p) => p.remove()) }
  }

  const showDvCalc = (e) => {
    const idx = e.target.value === 'data' ? 0 : 1;
    [css.dvDt, css.dvsaldo].forEach((cl, i) => {
      const toHide = (idx !== i);
      viewElm(cl, toHide);
    })
    viewElm(css.dvfinal, true);
  }
  //#endregion ---------

  //#region ---------------------- FLDSET fldcalc --------

  const endCalc = (e) => {
    let ob;
    if (typeof e === 'number') {
      console.log('calcular A DATA val=', e);
      ob = {saldoCalc: e}
      // calcAll({saldoCalc: e});
      // return;
    } else {
      const inpdt = e.target.previousElementSibling;
      if(inpdt.nodeName !== 'INPUT' || !inpdt?.validity?.valid){ console.log('invalido',  ); return; }
      const strdt = inpdt.value  + ' 00:00';
      ob = {dtCalc: new Date(strdt)}
      // setDados({...dados, dtCalc: new Date(strdt)});
      // calcAll({dtCalc: new Date(strdt)});
      e.preventDefault();
    }
    calcAll(ob);
    viewElm(css.dvfinal);
  }

  //#endregion --------

  //#region ---------------------- FLDSET fldpoupanca --------
  const setPoupanca = () => {
    console.log('setPoupanca',  );

  }
  //#endregion --------

  //#region ------------------------- FLDSET fldlucros ----
  const setaSaldos = () => {
    console.log('setaSaldos',  );
    setNiwSaldos();
    showNextFld();
  }
  //#endregion

  //#region --------------------------- FLDSET fldcar ----
  const setIpva = (ipva, compPrice) => {
    if (!checkExistKname('gastos', 'IPVA')) {
      addMoney('gastos', ['IPVA','Anual', ipva ]);
    }
    if (checkExistKname('gastos', 'Combustível')) {
      goFld(fldact.current.nextElementSibling);
    }
  }

  const getValGas = (valgas, compPrice) => {
    addMoney('gastos', ['Combustível','Mensal', valgas ]);
    compPrice.classList.add(css.hidenb);
  }

  const showdvcar = (e) => {
    e.preventDefault()
    const dvask = e.target.parentNode;
    dvask.classList.add(css.hidenb);
    dvask.nextElementSibling.classList.remove(css.hidenb);
  }
  //#endregion ---------

  //#region ------------------------- FLDSET fldNasc ----
  const setDtbirth = (d) => {
    if (!d || !d.length || d.length != 3) { return; }
    const idade = setbirth(d);
    const nxtFld = !(idade < 18) ? fldact.current.nextElementSibling : document.querySelector('fieldset[name=fldgastos]');
    goFld(nxtFld);
  }
  //#endregion ---------

  //#endregion ---------

  //#region ------------------------------------- DEBUG ---------
  function showDados(e, showdiv){
    console.log('dados:', dados );
    if(showdiv){
      document.querySelector('.'+css.dvdads).classList.toggle(css.hidenb);
    }
  }
  function strFy(data){
    const isAr = Array.isArray(data);
    if(!isAr || !Object.keys(data[0]).length){ return JSON.stringify(data) }
    return data.map((v, ki) => (<span key={ki}><br />  {JSON.stringify(v)}</span>));
  }

  function degubTags(){
    return (
      <div>
        <div className={css.ldvtst}>
          {/* <button onClick={ e => showUserData(e)}>userData</button> */}
          <button onClick={showDados}>DADOS</button>
          <button onClick={hideFrm}>RESET</button>
        </div>
        <div> dtHoje: {dados.dtHoje?.toLocaleString()} </div>
        <div onClick={e => showDados(e,'e')}> dtNasc: {dados.dtNasc?.toLocaleString()} </div>
        <div className={`${css.dvdads} ${css.hidenb}`}>
          <h3>dados</h3>
          {Object.keys(dados).map((k,i) => (
            <p key={i}>{k} : {strFy(dados[k])}</p>
          ))}

          <h3>resultados</h3>
          {Object.keys(resultados).map((rk,ri) => (
            <p key={ri}>{rk} : {strFy(resultados[rk])}</p>
          ))}
        </div>
      </div>
    )
  }
  //#endregion ---------------------------------------------------

  return (
    <>
    <form name='frma' className={css.frma} onSubmit={submit} onReset={reseta}>

      <fieldset name='fldNasc' className={`${css.fld} ${css.actv}`} ref={fldact}>
        <legend htmlFor='fldNasc'>Nascimento</legend>
        <h3>Quando você nasceu?</h3>
        <CpSelsDate setDate={setDtbirth}/>
      </fieldset>

      <fieldset name='fldcar' className={css.fld}>
        <legend>Veículos</legend>
        <div className={css.dvcar}>
          <h3>Você Possui Algum Veículo?</h3>
          <button onClick={showNextFld} className="btncor">NÃO</button>
          <button onClick={showdvcar} className="btncor">SIM</button>
        </div>

        <div className={`${css.dvcar} ${css.hidenb}`}>
          <CpFrmInptPrice title={'Quanto você gasta de combustível por mês?'} getVals={getValGas} />
          <CpFrmInptPrice title={'Quanto você gasta de IPVA por ano?'} getVals={setIpva} />
        </div>
      </fieldset>

      <fieldset name='fldgastos' className={css.fld}>
        <legend>Despesas</legend>
        <CpTbMoney title={'GASTOS'} valores={dados?.gastos ?? []} setaVals={setgastos} fecha={showNextFld} />
      </fieldset>

      <fieldset name='fldpoupanca' className={css.fld}>
        <legend>Poupança</legend>
        <div className={css.dvcar}>
          <h3>Você Possui Alguma Poupança?</h3>
          <button onClick={showNextFld} className="btncor">NÃO</button>
          <button onClick={showNextFld} className="btncor">SIM</button>
        </div>
        <div className={`${css.dvpoup} ${css.hidenb}`}>
          <CpFrmInptPrice title={'Quanto você possui hoje, e quais são os juros?'} getVals={setPoupanca} />
        </div>
      </fieldset>

      <fieldset name='fldlucros' className={css.fld}>
        <legend>Lucros</legend>
        <CpTbMoney title={'LUCROS'} valores={dados?.lucros ?? []} setaVals={setlucros} voltar={backfld} fecha={setaSaldos} />
      </fieldset>

      <fieldset name='fldcalc' className={css.fld}>
        <legend>Cálculo</legend>
        <h3>Escolha uma Data para saber um Saldo, ou Vice-Versa!</h3>
        <div>
          <label>Calcular POR:</label>
          <input type="radio" name='radCalc' value={'data'} onChange={showDvCalc} />DATA
          <input type="radio" name='radCalc' value={'saldo'} onChange={showDvCalc} />SALDO
        </div>

        <div className={`${css.dvDt} ${css.hidenb}`}>
          {/* <h4>Insira uma DATA e saiba QUANTO irá conseguir!</h4> */}
          <input type="date" defaultValue={sthj} min={sthj} max={"2060-11-30"} required />
          <button className="btncor" onClick={endCalc}>CALCULAR</button>
        </div>

        <div className={`${css.dvsaldo} ${css.hidenb}`}>
          {/* <CpFrmInptPrice title={'Insira um VALOR e saiba QUANDO irá conseguir!'} getVals={endCalc} /> */}
          <CpFrmInptPrice getVals={endCalc} action={'CALCULAR'}/>
        </div>

      </fieldset>

      <div className={css.lbtns}>
        <button onClick={backfld}>VOLTAR</button>
        <input type="reset" value="CANCELAR" />
      </div>

    </form>

    <div className={`${css.dvfinal} ${css.hidenb}`} ref={dvresults}>
      <h3>RESULTS</h3>
      {dados?.result?.map((r, i) => (
        <p key={i}>{r}</p>
      ))}
    </div>

    {degubTags()}
    </>
  )
}
