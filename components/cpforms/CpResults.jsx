import css from "@/styles/CpResults.module.css";

export default function CpResults({ arrFrases }){

  return (
    <div className={`${css.dvfinal} ${css.hidenb}`}>
      <h3>RESULTADOS</h3>
      {/* {isShowRes() && console.log('render' )} */}
      {/* {isShowRes() && dados?.result?.map((r, i) => ( */}
        {/* <p key={i}>{r}</p> */}
        {/* // <p key={i}>{renderTags(r)}</p> */}
      {/* ))} */}
    </div>
  )
}
