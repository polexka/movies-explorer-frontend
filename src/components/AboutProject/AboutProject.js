import './AboutProject.css';

function AboutProject() {
  return (
    <section id="about" className='about'>
      <h2 className='section__header'>О&nbsp;проекте</h2>
      <div className='section__underscore' />
      <div className='about__paragraphs'>
        <div className='about__paragraph'>
          <p className='about__paragraph__header'>Дипломный проект включал 5 этапов</p>
          <p className='about__paragraph__text'>
            Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.
          </p>
        </div>
        <div className='about__paragraph'>
          <p className='about__paragraph__header'>На выполнение диплома ушло 5 недель</p>
          <p className='about__paragraph__text'>
            У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.
          </p>
        </div>
      </div>
      <div className='about__paragraphs about__paragraphs_calendar'>
        <div className='about__calendar about__calendar_blue'>
          <p className='about__calendar__header about__calendar__header_blue'>1 неделя</p>
          <p className='about__calendar__text'>Back-end</p>
        </div>
        <div className='about__calendar about__calendar_gray'>
          <p className='about__calendar__header about__calendar__header_gray'>4 недели</p>
          <p className='about__calendar__text'>Front-end</p>
        </div>
      </div>
    </section>
  )
}

export default AboutProject;