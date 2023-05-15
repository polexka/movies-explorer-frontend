import './AboutMe.css';
import avatar from '../../images/avatar.png';

function AboutMe() {
  return (
    <section id='student' className='student'>
      <h2 className='student__header'>Студент</h2>
      <div className='student__underscore' />
      <div className='student__profile'>
        <div className='student__info'>
          <p className='student__name'>Полина</p>
          <p className='student__job'>Веб-разработчик, 20 лет</p>
          <p className='student__about'>
            Живу в Санкт-Петербурге, учусь на Факультете компьютерных технологий и информатики в СПБГЭТУ «ЛЭТИ».
            Люблю рисовать. Увлекаюсь программированием ещё со школьных лет.
            После обучения в Практикуме хочу продолжать развиваться как Веб&#8209;разработчик.
          </p>
          <a
            className='link student__link'
            href='https://github.com/polexka'
            target="_blank"
          >Github</a>
        </div>
        <img className='student__photo' src={avatar} alt='Фото студента' />
      </div>
    </section>
  )
}

export default AboutMe;