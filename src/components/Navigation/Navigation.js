import { useMediaQuery } from "react-responsive";
import './Navigation.css';
import avatar from '../../images/avatar.svg';
import { Link } from "react-router-dom";
import { useState } from "react";

function Navigation() {

  const isTablet = useMediaQuery({
    query: "(max-width: 786px)",
  })

  const [menu, setStatus] = useState(false);

  function handleBurger() {
    setStatus(!menu);
  }

  return (
    <>
      {
        isTablet ?
          (
            <div className='navigation'>

              <button type="button" className="button navigation__burger" onClick={handleBurger} />

              <div className={"navigation__block" + (menu ? " navigation__block_active" : "")}>
                <button type="button" className="button navigation__burger navigation__burger_close" onClick={handleBurger} />

                <Link to='/' className='link navigation__link'>
                  <p className='navigation__menu navigation__menu_first'>Главная</p>
                </Link>
                <Link to='/movies' className='link navigation__link'>
                  <p className='navigation__menu navigation__menu_accent'>Фильмы</p>
                </Link>
                <Link to='/saved-movies' className='link navigation__link'>
                  <p className='navigation__menu'>Сохранённые фильмы</p>
                </Link>
                <Link to='/profile' className='link navigation__link'>
                  <div className='navigation__profile-menu'>
                    <p className='navigation__menu navigation__menu_profile'>Аккаунт</p>
                    <img className='navigation__profile navigation__profile_image' src={avatar} alt='avatar' />
                  </div>
                </Link>

              </div>
              <div className={menu ? "navigation__overlay" : "navigation__overlay navigation__overlay_hidden"} />
            </div>
          ) : (
            <div className='navigation'>
              <Link to='/movies' className='link navigation__link'>
                <h2 className='navigation__text navigation__text_accent'>Фильмы</h2>
              </Link>
              <Link to='/saved-movies' className='link navigation__link'>
                <h2 className='navigation__text'>Сохранённые фильмы</h2>
              </Link>
              <Link to='/profile' className='link navigation__link'>
                <div className='navigation__profile'>
                  <h2 className='navigation__text navigation__text_profile navigation__text_accent'>Аккаунт</h2>
                  <img className='navigation__profile-image' src={avatar} alt='avatar' />
                </div>
              </Link>
            </div>
          )
      }
    </>
  )
}

export default Navigation;