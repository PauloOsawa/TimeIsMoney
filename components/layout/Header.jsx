import { useState } from 'react'
import css from '@/styles/CpHeader.module.css'

export default function Header() {
  
  const [ user, signOut ]  = useState();

  const fnUser = (e) => {
    e.preventDefault(); if (user) { signOut(); }
  }
  
  return (
    <header className={css.header}>
      <div className={css.dvlogo}>

        <div className={css.dimg}>
          <svg className={css.svimg} viewBox="0 0 100 100">
            <polygon points="50 2, 86 80, 14 80, 50 2" />
            <text x="23" y="80" className={css.txta}>4</text>
            <text x="4" y="80" className={css.txtb}>N</text>
          </svg>
        </div>

        <svg className={css.svtit}><text>Next For All</text></svg>
      </div>

      <div className={css.dvuser}>
        <span className={'titb'}>Sejam Bem-Vindos{user && ' ' + user?.nome + '!'}!</span>
      </div> 
    </header>
  )
}