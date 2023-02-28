import { useRef } from "react";
import useTimeMoney from "@/hooks/useTimeMoney";
import css from "@/styles/CpFrmTimeMoney.module.css";
import CpSelsDate from "./CpFrmSelsDate";
import CpTbMoney from "./CpTbMoney";
import CpFrmInptPrice from "./CpFrmInptPrice";
import CpResults from "./CpResults";

export default function CpFrmTimeMoney({ hoje, hideFrm }){

  const {
    dados, setbirth, addMoney, setgastos, setlucros, setSaldos,
    setPoupData, calcAll, showresult, setShowresult, animStop, setAnimStop } = useTimeMoney(hoje);

  const stDtTomorow = new Date(dados.dtHoje.getFullYear(), dados.dtHoje.getMonth(), dados.dtHoje.getDate() + 1).toISOString().slice(0, 10);

  const forma = useRef();
  const fldact = useRef();
  const dvresults = useRef();
  // const stopAnim = useRef(false);

  //#region ============================== DATA OBJ functions ======
  const checkExistKname = (tipo, nome) => {
    const ob = (tipo in dados) ? dados[tipo].find(obj => obj.nome === nome) : false;
    return !!ob;
  }

  const isSameResult = (val) => {
    if(!dados?.lastCalc){ console.log('sem DADOS'); return false; }
    const same = ((val - dados.lastCalc) === 0);
    return (same && dados.result?.length);
  }
  //#endregion ---------

  //#region =========================== HTML RENDER functions ======

  const scrolto = (elm) => {
    const xxx = 'xxx';

  }
  //#region ---------------------- form and global -------
  const blockForm = (toBlock) => {
    if(toBlock){
      fldact.current?.setAttribute('disabled','true');
      console.log('block form');
      return;
    }
    console.log('UNBLOCK form');
    fldact.current?.removeAttribute('disabled');
  }

  const isShowRes = () => !!dvresults.current && !dvresults.current?.classList.contains(css.hidenb);

  const submit = (e) => { e.preventDefault(); console.log('submit = ' ); }
  const reseta = (e) => {
    if(fldact.current.getAttribute('disabled')){
      console.log('Showing Results');
      if(animStop === false){ setAnimStop(true); }
      blockForm();
      return e.preventDefault();
    }
    console.log('reset');
    return hideFrm(e);
  }
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
    if(isShowRes()){
      blockForm();
      if(animStop === false){ setAnimStop(true); }
      console.log('NO backfld --- Showing Results stopAnim=', animStop);
      return;
    }
    goFld(fldact.current.previousElementSibling);
  }

  const viewElm = (cls, toHide) => {
    const el = document.querySelector('.'+cls);
    if (toHide) { el.classList.add(css.hidenb); return; }
    el.classList.remove(css.hidenb);
  }
  //#endregion ---------

  const showDvResults = () => {
    if(animStop !== false){ setAnimStop(false); }
    if(showresult !== true){ setShowresult(true); }
    blockForm(true);
    const timeshow = setTimeout(() =>{
      const dvrs = document.querySelector('.'+css.dvfinal);
      if(dvrs){
        dvrs.classList.remove(css.hidenb);
        dvrs.scrollIntoView({ block:'start', behavior: 'smooth'});
        dvrs.scrollTo({ top:0, behavior: 'smooth'});
      }
      clearTimeout(timeshow);
    }, 100);
  }

  const hideDvResults = () => {
    const dvr = document.querySelector('.'+css.dvfinal);
    if(dvr){ dvr.classList.add(css.hidenb); }
    blockForm();
    if(showresult === true){
      const timehide = setTimeout(() =>{
        setShowresult(false);
        clearTimeout(timehide);
      }, 300)
    }
  }
  //#region ----------------- CP RESULTS functions ---------
  const animEnd = (clearAnim) => {
    blockForm();
    console.log('animEnd',  animStop,  clearAnim);
    // clearAnim();
    // if(animStop){ clearAnim(); }

  }

  //#endregion ---------

  //#region --------------------- FLDSET fldcalc ----------
  const enabBtnCalc = (btn, toEnable) => {
    if(!btn){ return; }
    const isDisab = btn.classList.contains('disable');
    if(!toEnable && !isDisab){ btn.classList.add('disable'); return; }
    if(!!toEnable && !!isDisab){ btn.classList.remove('disable'); return; }
  }

  const showDvCalc = (e) => {
    console.log('showDvCalc',  );
    const isDvDtShow = e.target.value === 'data';
    const idx = isDvDtShow ? 0 : 1;

    [css.dvDt, css.dvsaldo].forEach((cl, i) => {
      const toHide = (idx !== i);
      viewElm(cl, toHide);
    })
    hideDvResults();
  }

  const endCalc = (e) => {
    let ob, btncalc;
    if (typeof e === 'number') {
      btncalc = fldact.current?.querySelector('.'+css.dvsaldo+' .btncor');
      btncalc.classList.add('disable');
      if(isSameResult(e)){ console.log('isSameResult'); return showDvResults(); }
      console.log('calcular A DATA val=',e);
      ob = {saldoCalc: e}
    } else {
      btncalc = e.target;
      const inpdt = btncalc.previousElementSibling;
      if(inpdt.nodeName !== 'INPUT' || !inpdt?.validity?.valid){ console.log('invalido'); return; }
      btncalc.classList.add('disable');
      const strdt = inpdt.value  + ' 00:00';
      const niuDt = new Date(strdt)
      if(isSameResult(niuDt)){ console.log('isSameResult'); return showDvResults(); }
      ob = {dtCalc: niuDt}
      e.preventDefault();
    }
    calcAll(ob);
    showDvResults();
  }

  const handleChangeDtCalc = (e) => {
    const targ = e.target;
    const isValid = targ?.validity?.valid;
    const btnCalc = targ.nextElementSibling;
    enabBtnCalc(btnCalc, isValid);
    if(isShowRes() && isValid){ hideDvResults(); return; }
    // const strDt = targ.value + ' 0:0'; const isDisab = btnCalc.classList.contains('disable');
    // const dat = new Date(strDt);  console.log('niudt =', strDt, isDisab, dat.toLocaleString(), isShowRes() );
  }
  //#endregion --------

  //#region --------------------- FLDSET fldpoupanca ------
  const validaPoupanca = (montante) => {
    // const objPoupanca = { montante:0, capital:0, juros:0, tempo:0, periodo:false, isAm:false }
    const inputjuros = document.querySelector('.'+css.inptjuros);
    if(!inputjuros.validity.valid){ return false; }
    const juros = parseFloat(inputjuros.value.replace(',', '.'));

    const selperiodo = inputjuros.nextElementSibling;
    const periodo = selperiodo.item(selperiodo.selectedIndex).value;

    const isam = (periodo === 'mensal');
    const objPoupanca = { montante: montante, juros: juros, periodo: periodo, isAm: isam }

    return objPoupanca;
  }

  const setaPoupanca = (montante) => {
    if(!montante){ setPoupData(); return; }
    const objPoup = validaPoupanca(montante);
    if(objPoup){ setPoupData(objPoup); showNextFld(); return; }
    console.log('sem objPoup',  );
  }

  const resetPoup = (e) => {
    console.log('resetPoup',  );
    const inputjuros = document.querySelector('.'+css.inptjuros);
    if(inputjuros){ inputjuros.value = 1; }
    const dvhidepoup = document.querySelector('.'+css.dvpoup);
    const dvshowpoup = document.querySelector('.'+css.dvinptspoup).parentElement;
    dvshowpoup.classList.add(css.hidenb);
    dvhidepoup.classList.remove(css.hidenb);
    setaPoupanca();
    showNextFld();
  }

  const showDvPoup = (e) => {
    e.preventDefault();
    const dvask = e.target.parentNode;
    dvask.classList.add(css.hidenb);
    dvask.nextElementSibling.classList.remove(css.hidenb);
  }
  //#endregion --------

  //#region --------------------- FLDSET fldlucros -------
  const setaSaldos = (e) => {
    e.preventDefault();
    console.log('setaSaldos', );
    setSaldos();
    showNextFld();
  }
  //#endregion

  //#region --------------------- FLDSET fldcar ----------
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

  //#region --------------------- FLDSET fldNasc ---------
  const setDtbirth = (d) => {
    if (!d || !d.length || d.length != 3) { return; }
    const idade = setbirth(d);
    const nxtFld = !(idade < 18) ? fldact.current.nextElementSibling : document.querySelector('fieldset[name=fldgastos]');
    goFld(nxtFld);
  }
  //#endregion ---------

  //#endregion ---------

  //#region ---------------------------------- DEBUG ---------
  function showDados(e, showdiv){
    console.log('dados:', dados );
    if(showdiv){
      document.querySelector('.'+css.dvdads).classList.toggle(css.hidenb);
    }
  }
  function strFy(data){
    const isAr = Array.isArray(data);
    if(!isAr || !data.length || !Object.keys(data[0]).length){ return JSON.stringify(data) }
    return data.map((v, ki) => (<span key={ki}> <br />  {JSON.stringify(v)} </span>));
  }

  function degubTags(){
    return (
      <div>
        <div className={css.ldvtst}>
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
        </div>
      </div>
    )
  }
  //#endregion ---------------------------------------------------

  return (
    <>
    <form name='frma' className={css.frma} onSubmit={submit} onReset={reseta} ref={forma}>

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

      <fieldset name='fldlucros' className={css.fld}>
        <legend>Lucros</legend>
        <CpTbMoney title={'LUCROS'} valores={dados?.lucros ?? []} setaVals={setlucros} voltar={backfld} fecha={setaSaldos} />
      </fieldset>

      <fieldset name='fldpoupanca' className={css.fld}>
        <legend>Poupança</legend>
        <div className={css.dvpoup}>
          <h3>Você Possui Alguma Poupança?</h3>
          <button onClick={showNextFld} className="btncor">NÃO</button>
          <button onClick={showDvPoup} className="btncor">SIM</button>
        </div>

        <div className={`${css.dvpoup} ${css.hidenb}`}>
          <h3>Informe os JUROS e MONTANTE atuais da poupança!</h3>
          <p>Obs: Os cálculos interpretarão tais valores como <b>iniciais</b>(capital e data de hoje)!</p>
          <div className={css.dvinptspoup}>
            <div className={css.dvjuros}>
              <label>Juros:</label>
              <input type="text" className={css.inptjuros} defaultValue={1} pattern={"[0-9]{1,2}([,.]{1}[0-9]{1,2}){0,1}"} />

              <select name="seljuros" className={css.seljuros}>
                <option value="mensal">% ao Mês</option>
                <option value="anual">% ao Ano</option>
              </select>
            </div>
            <CpFrmInptPrice getVals={setaPoupanca} onCancel={resetPoup} />
          </div>

        </div>
      </fieldset>

      <fieldset name='fldcalc' className={css.fld}>
        <legend>Cálculo</legend>
        <h3>Escolha uma Data para saber um Saldo, ou Vice-Versa!</h3>
        <div>
          <label>Calcular POR:</label>
          <label><input type="radio" name='radCalc' value={'data'} onChange={showDvCalc} />DATA</label>
          <label><input type="radio" name='radCalc' value={'saldo'} onChange={showDvCalc} />SALDO</label>
        </div>

        <div className={`${css.dvDt} ${css.hidenb}`}>
          <input type="date" defaultValue={stDtTomorow} min={stDtTomorow} max={"2060-11-30"} onChange={handleChangeDtCalc} required />
          <button className="btncor" onClick={endCalc}>CALCULAR</button>
        </div>

        <div className={`${css.dvsaldo} ${css.hidenb}`}>
          <CpFrmInptPrice getVals={endCalc} action={'CALCULAR'}/>
        </div>

      </fieldset>

      <div className={css.lbtns}>
        <button onClick={backfld}>VOLTAR</button>
        <input type="reset" value="CANCELAR" />
      </div>

    </form>

    {!!showresult && (
      <div className={`${css.dvfinal} ${css.hidenb}`} ref={dvresults}>
        <CpResults dados={dados} animStop={animStop} animEnd={animEnd} />
      </div>
    )}

    {degubTags()}
    </>
  )
}
