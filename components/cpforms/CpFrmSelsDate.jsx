import { useRef, useState } from "react";
import css from "@/styles/CpFrmCpSelsDate.module.css";

export default function CpSelsDate({ setDate }){

  const mesesMaxDays = [ 0, 2, 4, 6, 7, 9, 11 ]
  const dt = useRef([1990, 6, 15])
  const [dias, setDias] = useState(31)

  const checkDias = (d) => { if(dt.current[2] > d){ dt.current[2] = 1; } }

  const setaDt = (sel) => {
    const v = sel.item(sel.selectedIndex).value;
    if (sel.name === 'selDia') { dt.current[2] = parseInt(v); return; }
    const idt = sel.name === 'selAno' ? 0 : 1;
    dt.current[idt] = parseInt(v);
    if (mesesMaxDays.includes(dt.current[1])) { setDias(31); return checkDias(31); }
    if (dt.current[1] !== 1) { setDias(30); return checkDias(30); }
    const d = dt.current[0] % 4 === 0 ? 29 : 28;
    setDias(d);
    return checkDias(d);
  }

  const setaData = (e) => { e.preventDefault(); setDate(dt.current); }

  return (
    <div className={css.dvSelsDt}>
      <div>
        <label htmlFor="selAno">Ano:</label>
        <select name="selAno" className={css.selAno} defaultValue='1990' onChange={e => setaDt(e.target)}>
          <option value="1950">1950</option>
          <option value="1951">1951</option>
          <option value="1952">1952</option>
          <option value="1953">1953</option>
          <option value="1954">1954</option>
          <option value="1955">1955</option>
          <option value="1956">1956</option>
          <option value="1957">1957</option>
          <option value="1958">1958</option>
          <option value="1959">1959</option>
          <option value="1960">1960</option>
          <option value="1961">1961</option>
          <option value="1962">1962</option>
          <option value="1963">1963</option>
          <option value="1964">1964</option>
          <option value="1965">1965</option>
          <option value="1966">1966</option>
          <option value="1967">1967</option>
          <option value="1968">1968</option>
          <option value="1969">1969</option>
          <option value="1970">1970</option>
          <option value="1971">1971</option>
          <option value="1972">1972</option>
          <option value="1973">1973</option>
          <option value="1974">1974</option>
          <option value="1975">1975</option>
          <option value="1976">1976</option>
          <option value="1977">1977</option>
          <option value="1978">1978</option>
          <option value="1979">1979</option>
          <option value="1980">1980</option>
          <option value="1981">1981</option>
          <option value="1982">1982</option>
          <option value="1983">1983</option>
          <option value="1984">1984</option>
          <option value="1985">1985</option>
          <option value="1986">1986</option>
          <option value="1987">1987</option>
          <option value="1988">1988</option>
          <option value="1989">1989</option>
          <option value="1990">1990</option>
          <option value="1991">1991</option>
          <option value="1992">1992</option>
          <option value="1993">1993</option>
          <option value="1994">1994</option>
          <option value="1995">1995</option>
          <option value="1996">1996</option>
          <option value="1997">1997</option>
          <option value="1998">1998</option>
          <option value="1999">1999</option>
          <option value="2000">2000</option>
          <option value="2001">2001</option>
          <option value="2002">2002</option>
          <option value="2003">2003</option>
          <option value="2004">2004</option>
          <option value="2005">2005</option>
          <option value="2006">2006</option>
          <option value="2007">2007</option>
          <option value="2008">2008</option>
          <option value="2009">2009</option>
          <option value="2010">2010</option>
          <option value="2011">2011</option>
          <option value="2012">2012</option>
          <option value="2013">2013</option>
          <option value="2014">2014</option>
        </select>
      </div>
      <div>
        <label htmlFor="selMes">Mês:</label>
        <select name="selMes" className={css.selMes} defaultValue='6' onChange={e => setaDt(e.target)}>
          <option value="0">Janeiro</option>
          <option value="1">Fevereiro</option>
          <option value="2">Março</option>
          <option value="3">Abril</option>
          <option value="4">Maio</option>
          <option value="5">Junho</option>
          <option value="6">Julho</option>
          <option value="7">Agosto</option>
          <option value="8">Setembro</option>
          <option value="9">Outubro</option>
          <option value="10">Novembro</option>
          <option value="11">Dezembro</option>
        </select>
      </div>
      <div>
        <label htmlFor="selDia">Dia:</label>
        <select name="selDia" className={css.selDia} defaultValue='15' onChange={e => setaDt(e.target)}>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
          <option value="11">11</option>
          <option value="12">12</option>
          <option value="13">13</option>
          <option value="14">14</option>
          <option value="15">15</option>
          <option value="16">16</option>
          <option value="17">17</option>
          <option value="18">18</option>
          <option value="19">19</option>
          <option value="20">20</option>
          <option value="21">21</option>
          <option value="22">22</option>
          <option value="23">23</option>
          <option value="24">24</option>
          <option value="25">25</option>
          <option value="26">26</option>
          <option value="27">27</option>
          <option value="28">28</option>
          {dias > 28 && <option value="29">29</option>}
          {dias > 29 && <option value="30">30</option>}
          {dias > 30 && <option value="31">31</option>}
        </select>
      </div>

      <button onClick={setaData} className='btncor'>OK</button>
    </div>
  )
}
