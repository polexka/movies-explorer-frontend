import './Footer.css';

function Footer() {
  return (
    <footer className='footer'>
      <p className='footer__line'>
        Учебный проект Яндекс.Практикум х BeatFilm.
      </p>
      <div className='footer__links'>
        <p className='footer__copyright'>© 2023</p>
        <div className='footer__list'>
          <a className='link footer__link' href='https://practicum.yandex.ru/'>Яндекс.Практикум</a>
          <a className='link footer__link' href='https://github.com/polexka'>Github</a>
        </div>

      </div>
    </footer>
  )
}

export default Footer;
