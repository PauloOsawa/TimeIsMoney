import { useRef } from "react";
import { iLixo } from "../layout/MyIconsSvg";
import css from "@/styles/CpTbMoney.module.css";

export default function CpTbMoney({ title, valores, setaVals, voltar, fecha }) {

  const pmsg = useRef();
  const inptnome = useRef();
  const selfreq = useRef();
  const inptreais = useRef();
  const inptcents = useRef();

  // ---------------------------------------------------
  const showMsg = (msg) => {
    pmsg.current.textContent = msg;
    pmsg.current.classList.remove(css.hiden);
    const tmout = setTimeout(() => {
      pmsg.current?.classList.add(css.hiden);
      clearTimeout(tmout);
    }, 3200)
  }

  const resetInputs = () => {
    inptnome.current.value = '';
    selfreq.current.selectedIndex = 1;
    inptreais.current.value = 0;
    inptcents.current.value = '00';
  }

  const validaInputs = () => {
    let arvals = [];
    [inptnome, inptreais, inptcents].forEach((inpt, idx) => {
      if (!arvals || !inpt.current.validity.valid) { arvals = null; return; }
      const v = inpt.current.value.replace(/([0]+)([1-9])/, '0$2').trim();
      arvals[idx] = idx !== 2 ? v : '0.' + v;
    })
    return !arvals ? false : [arvals[0], parseFloat(arvals[1]) + parseFloat(arvals[2])]
  }

  const addVals = (e) => {
    e.preventDefault();
    const arvals = validaInputs();
    if (!arvals || arvals[1] === 0) {
      showMsg('Corrija os valores vazios ou vermelhos!!');
      return;
    }
    const freq = selfreq.current.item(selfreq.current.selectedIndex).value;
    const val = { nome: arvals[0], periodo: freq, valor: arvals[1] }
    setaVals([...valores, val]);
    resetInputs();
  }

  const deleta = (idx, e) => {
    e.stopPropagation();
    valores.splice(idx, 1);
    setaVals([...valores]);
  }

  const nextField = (e) => {
    if (!valores.length) {
      showMsg("Adicione Algum Valor para Prosseguir...");
      return e.preventDefault();
    }
    return fecha();
  }

  const removeZero = (e) => {
    if(e.target.value === '0'){ e.target.value = ''; }
  }
  // ---------------------------------------------------
  return (
    <div className={css.dvmoney}>
      <h3>MEUS {title}</h3>
      <p>Adicione Todos os <b>{title}</b> que deseja calcular, seja por dia, mês ou ano!</p>
      <p className={`${css.pmsg} ${css.hiden}`} ref={pmsg}></p>
      <table className={css.tbmoney}>
        <thead>
          <tr><th className={css.desc}>DESCRIÇÃO</th><th className={css.periodo}>PERÍODO</th><th className={css.price}>VALOR</th><th>{iLixo}</th></tr>
        </thead>

        <tbody>
          <tr className={css.trexp}>
            <td className={css.desc}>SEUS {title}</td><td className={css.periodo}>Mensal</td><td className={css.price}>0,00</td><td>{iLixo}</td>
          </tr>
          {valores?.map((v, i) => (
            <tr key={i}>
              <td className={css.desc}>{v.nome}</td>
              <td className={css.periodo}>{v.periodo}</td>
              <td className={css.price}>{v.valor.toFixed(2).replace('.', ',')}</td>
              <td onClick={e => deleta(i, e)}>{iLixo}</td>
            </tr>))
          }
        </tbody>
      </table>

      <div className={css.dvsetvals}>
        <input type="text" className={css.desc} placeholder="Descrição:" pattern="([a-zA-Zçãõáéíú]{2,15}[ ]?){1,3}" ref={inptnome} required />

        <select name="selperiodo" className={css.selfreq} defaultValue='Mensal' ref={selfreq}>
          <option value="Diário">Diário</option>
          <option value="Mensal">Mensal</option>
          <option value="Anual">Anual</option>
        </select>

        <div className={css.price}>
          R$ <input type="number" className={css.preco} min={1} max={999999} defaultValue='0' onBeforeInput={removeZero} ref={inptreais} required />
          <span>,</span>
          <input type="number" className={css.cents} min='0' max='99' defaultValue='00' ref={inptcents} required />
        </div>

        <button onClick={addVals} className={css.btadd}>ADICIONAR</button>
      </div>

      {!!voltar && <button onClick={voltar} className='btncor'>VOLTAR</button>}
      <button onClick={nextField} className='btncor'>PRÓXIMO</button>
    </div>
  )
}
