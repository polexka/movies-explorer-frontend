import './Portfolio.css';

function Portfolio() {
  return (
    <div className='portfolio'>
      <p className='portfolio__header'>Портфолио</p>
      <a className='link portfolio__link' href='https://github.com/polexka/how-to-learn'>
        <p className='portfolio__name'>Статичный сайт</p>
        <p className='portfolio__name'>↗</p>
      </a>
      <a className='link portfolio__link' href='https://github.com/polexka/russian-travel'>
        <p className='portfolio__name'>Адаптивный сайт</p>
        <p className='portfolio__name'>↗</p>
      </a>
      <a className='link portfolio__link' href='https://github.com/polexka/react-mesto-api-full'>
        <p className='portfolio__name'>Одностраничное приложение</p>
        <p className='portfolio__name'>↗</p>
      </a>
    </div>
  )
}

export default Portfolio;