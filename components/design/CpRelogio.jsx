import { useRef, useEffect } from "react";
import css from "@/styles/CpDsgRelogio.module.css";

export default function CpRelogio({ hoje }){

  let don = false;
  const drel = useRef();

  useEffect(() => {
    if (!don) {
      const dr = drel.current;
      const dt = new Date();
      dr.style.setProperty('--hours', dt.getHours());
      dr.style.setProperty('--mins', dt.getMinutes());
      dr.style.setProperty('--secs', dt.getSeconds());
      don = true;
    }
  }, [])

  return (
  <div className={css.dvrelogio} ref={drel}>
    <div className={css.ptMinut}></div>
    <div className={css.ptSecond}></div>
    <div className={css.ptHour}></div>
  </div>
  )
}
