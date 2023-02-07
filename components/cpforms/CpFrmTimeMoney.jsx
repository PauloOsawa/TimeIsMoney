import { useRef } from "react";

import css from "@/styles/CpFrmTimeMoney.module.css";
import CpSelsDate from "./CpFrmSelsDate";

export default function CpFrmTimeMoney({ hoje, hideFrm }){

  const fldact = useRef();
  //#region ---------------------------- HTML ------------
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
  //#endregion ---------------------
  
  //#region ------------------------------------ NIVER ----
  const setDtbirth = (d) => {
    if (!d || !d.length || d.length != 3) { return; }
    console.log('d = ', d );
    // setbirth(d);
    // showNextFld();
  }
  //#endregion ---------------------------------------

  return (
    <>
    <form name='frma' className={css.frma} onSubmit={submit} onReset={reseta}>

      <fieldset name='fldNasc' className={`${css.fld} ${css.actv}`} ref={fldact}>
        <legend htmlFor='fldNasc'>Nascimento</legend>
        <h3>Quando você nasceu?</h3>
        <CpSelsDate setDate={setDtbirth}/>
      </fieldset>

      <div className={css.lbtns}>
        <button onClick={backfld}>VOLTAR</button>
        <input type="reset" value="CANCELAR" />
      </div>

    </form>
    </>
  )
}
