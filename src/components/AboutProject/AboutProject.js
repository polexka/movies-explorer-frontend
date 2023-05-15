import './AboutProject.css';

function AboutProject() {
  return (
    <section id="about" className='about'>
      <h2 className='about__header'>О&nbsp;проекте</h2>
      <div className='about__underscore' />
      <div className='about__paragraphs'>
        <div className='about__paragraph'>
          <p className='about__paragraph-header'>Дипломный проект включал 5 этапов</p>
          <p className='about__paragraph-text'>
            Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.
          </p>
        </div>
        <div className='about__paragraph'>
          <p className='about__paragraph-header'>На выполнение диплома ушло 5 недель</p>
          <p className='about__paragraph-text'>
            У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.
          </p>
        </div>
      </div>
      <div className='about__paragraphs about__paragraphs_calendar'>
        <div className='about__calendar about__calendar_blue'>
          <p className='about__calendar-header about__calendar-header_blue'>1 неделя</p>
          <p className='about__calendar-text'>Back-end</p>
        </div>
        <div className='about__calendar about__calendar_gray'>
          <p className='about__calendar-header about__calendar-header_gray'>4 недели</p>
          <p className='about__calendar-text'>Front-end</p>
        </div>
      </div>
    </section>
  )
}

export default AboutProject;