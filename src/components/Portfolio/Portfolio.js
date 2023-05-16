import './Portfolio.css';

function Portfolio() {
  return (
    <div className='portfolio'>
      <p className='portfolio__header'>Портфолио</p>
      <ul className='portfolio__links'>
        <li className='portfolio__li'>
          <a
            className='link portfolio__link'
            href='https://github.com/polexka/how-to-learn'
            target="_blank"
          >
            <p className='portfolio__name'>Статичный сайт</p>
            <p className='portfolio__name'>↗</p>
          </a>
          <div className='portfolio__underscore' />
        </li>

        <li className='portfolio__li'>
          <a
            className='link portfolio__link'
            href='https://github.com/polexka/russian-travel'
            target="_blank"
          >
            <p className='portfolio__name'>Адаптивный сайт</p>
            <p className='portfolio__name'>↗</p>
          </a>
          <div className='portfolio__underscore' />
        </li>

        <li className='portfolio__li'>
          <a
            className='link portfolio__link'
            href='https://github.com/polexka/react-mesto-api-full'
            target="_blank"
          >
            <p className='portfolio__name'>Одностраничное приложение</p>
            <p className='portfolio__name'>↗</p>
          </a>
        </li>
      </ul>



    </div>
  )
}

export default Portfolio;