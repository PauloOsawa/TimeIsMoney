import css from '@/styles/CpHeader.module.css'

export default function Header() {

  return (
    <header className={css.header}>
      <div className={css.dvlogo}>

        <div className={css.dimg}>
          <svg className={css.svimg} viewBox="0 0 100 100">
            <polygon points="50 2, 86 80, 14 80, 50 2" />
            <path className={css.pthtxa} d='m 67,31.6 q -2.42,2.4 -5.13,5.18 -2.56,2.78 -5.33,5.85 -2.7,2.97 -5.33,6.14 -2.517,3.07 -4.78,6.05 H 61.01 Z M 83.57,14.3 73.99,54.43 h 6.91 l -2.75,11.5 H 71.14 L 67.55,80.81 H 53.8 L 57.248,65.93 H 29.11 l 2.37,-10.56 q 2.96,-4.2 7.39,-9.5 4.34,-5.376 9.478,-10.94 5.12,-5.57 10.61,-10.95 5.5,-5.376 10.8,-9.69 z' />
            <path className={css.pthtxb} d='M 57.8,80.8 Q 51.6,69.47 46.67,58.14 41.82,46.81 36.1,36.744 l -10.45,44.06 H 11.13 l 15.77,-66.52 h 11.3 q 2.18,3.36 4.65,7.97 2.56,4.51 5.2,9.79 2.66,5.28 5.32,11.04 2.66,5.6 5.04,11.23 l 9.4,-40.03 H 82.586 L 66.72,80.8 Z' />
          </svg>
        </div>

        <svg className={css.svtit}><text>Next For All</text></svg>
      </div>

      <div className={css.dvuser}>
        <span className={'titb'}>Sejam Bem-Vindos!</span>
      </div>
    </header>
  )
}
