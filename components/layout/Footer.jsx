import Image from 'next/image'
import { igit, ilkdin } from './MyIconsSvg'
import css from '@/styles/CpFooter.module.css'

export default function Footer() {
  
  return (
    <footer className={css.footer}>
      <p className={css.pright}><b>&copy; 2023 Time is Money</b> - <span role="doc-credits" aria-label="criador do site"> Criado por Paulo Osawa</span></p>
      <div className={css.dvfooter}>
        <div className={css.dnext}>
          <a href="https://nextjs.org/" target="_blank" rel="noopener noreferrer">
            <Image
              src="/next.svg" alt="Next Logo"
              className={css.vercelLogo}
              width={120} height={24} priority={false}
            />
          </a>
        </div>

        <div className={css.dvercel}>
          <a href="https://vercel.com/" target="_blank" rel="noopener noreferrer">
            <Image
              src="/vercel.svg" alt="Vercel Logo"
              className={css.vercelLogo}
              width={120} height={24} priority={false}
            />
          </a>
        </div>

        <div className={css.dgit}>
          <a href='https://github.com/' target="_blank" rel="noopener noreferrer">
            { igit }<h2>/Paulo</h2>
          </a>
        </div>

        <div className={css.dlkd}>
          <a href='https://linkedin.com/' target="_blank" rel="noopener noreferrer">
            { ilkdin }<h2>/Paulo</h2>
          </a>
        </div>
      </div>
    </footer>
  )
}
