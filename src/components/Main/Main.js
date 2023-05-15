import './Main.css';
import { Switch, Route } from 'react-router';
import AboutMe from "../AboutMe/AboutMe";
import AboutProject from "../AboutProject/AboutProject";
import NavTab from "../NavTab/NavTab";
import Promo from "../Promo/Promo";
import Techs from "../Techs/Techs";
import Portfolio from '../Portfolio/Portfolio';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import cards from '../../utils/mock';
import More from '../More/More';
import SavedDevider from '../SavedDevider/SavedDevider';
import saved from '../../utils/mockSaved';

function Main() {
  return (
    <main className="main">
      <Switch>
        <Route path='/movies'>
          <SearchForm />
          <MoviesCardList
            cards={cards} 
            saved={false}
            key='movies' 
            />
          <More />
        </Route>

        <Route path='/saved-movies'>
          <SearchForm />
          <MoviesCardList
            cards={saved}
            saved={true}
            key='saved-movies'
          />
          <SavedDevider />
        </Route>

        <Route path='/'>
          <Promo />
          <NavTab />
          <AboutProject />
          <Techs />
          <AboutMe />
          <Portfolio />
        </Route>
      </Switch>

    </main>
  )
}

export default Main;