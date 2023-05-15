import './NavTab.css';

function NavTab() {
  return (
    <nav className='nav'>
      <a className='link nav__link' href="#about">О&nbsp;проекте</a>
      <a className='link nav__link' href="#techs">Технологии</a>
      <a className='link nav__link' href="#student">Студент</a>
    </nav>
  )
}

export default NavTab;