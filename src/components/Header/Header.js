import './Header.css';
import { Link, Route, Switch } from "react-router-dom";
import Navigation from '../Navigation/Navigation';

function Header() {
  return (
    <header className='header'>
      <Link to='/' className='link header__link header__logo' />
      <Switch>
        <Route exact path='/movies'>
          <Navigation />
        </Route>
        <Route exact path='/saved-movies'>
          <Navigation />
        </Route>
        <Route exact path='/profile'>
          <Navigation />
        </Route>
        <Route exact path='/'>
          <div className='header__nav'>
            <Link to='/signup' className='link header__link'>
              <h2 className='header__text'>Регистрация</h2>
            </Link>
            <Link to='/signin' className='link header__link'>
              <h2 className='header__text header__text_signin'>Войти</h2>
            </Link>
          </div>
        </Route>
      </Switch>

    </header>
  )
}

export default Header;