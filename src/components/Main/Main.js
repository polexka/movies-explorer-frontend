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
import SavedDevider from '../SavedDevider/SavedDevider';
import Preloader from '../Preloader/Preloader';

function Main({
  initials,
  initialSaved,
  isEnd,
  handleSave,
  cardsLoading,
  loadMore,
  handleCheckbox,
  handleSearchMovie
}) {

  return (
    <main className="main">
      <Switch>
        <Route path='/movies'>
          <SearchForm
            handleCheckbox={handleCheckbox}
            handleSearchMovie={handleSearchMovie}
            // key='movies-search'
          />
          {
            cardsLoading ?
              <Preloader />
              :
              <MoviesCardList
                cards={initials}
                handleSave={handleSave}
                savedPage={false}
                isEnd={isEnd}
                loadMore={loadMore}
                key='movies'
              />
          }
        </Route>

        <Route path='/saved-movies'>
          <SearchForm
            handleCheckbox={handleCheckbox}
            handleSearchMovie={handleSearchMovie}
            // key='saved-movies-search'
          />
          {
            cardsLoading ?
              <Preloader />
              :
              <>
                <MoviesCardList
                  cards={initialSaved}
                  handleSave={handleSave}
                  savedPage={true}
                  key='saved-movies'
                />
                <SavedDevider />
              </>
          }
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