import './Header.css';
import { Link } from "react-router-dom";
import Navigation from '../Navigation/Navigation';

function Header({ loggedIn }) {
  return (
    <header className='header'>
      <Link to='/' className='link header__link header__logo' />
      {loggedIn ? (
        <Navigation />
      ) :
        (
          <div className='header__nav'>
            <Link
              to='/signup'
              className='link header__link'
            >
              <h2 className='header__text'>Регистрация</h2>
            </Link>
            <Link
              to='/signin'
              className='link header__link'
            >
              <h2 className='header__text header__text_signin'>Войти</h2>
            </Link>
          </div>
        )
      }
    </header>
  )
}

export default Header;