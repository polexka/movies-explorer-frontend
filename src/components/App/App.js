import './App.css';
import { Route, Redirect, Switch, withRouter, useHistory } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import { useState, useEffect, useRef } from 'react';

import Profile from '../Profile/Profile';
import Login from '../Login/Login';
import Register from '../Register/Register';
import ErrorPage from '../ErrorPage/ErrorPage';
import ErrorMessage from '../ErrMessage/ErrorMessage';
import ConfirmMessage from '../ConfirmMessage/ConfirmMessage';

import { CurrentAuthContext } from '../../contexts/CurrentAuthContext';
import { moviesApi } from '../../utils/MoviesApi';
import { auth } from '../../utils/Auth';
import { api } from '../../utils/MainApi';
import { messageTime, mobileMoreCardsCount, mobileStartCount, moreCardsCount, moviesUrl, shortsDuration, startCount, tabletStartCount } from '../../utils/constants';
import Search from '../../utils/Search';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import Preloader from '../Preloader/Preloader';
import Header from '../Header/Header';
import Promo from '../Promo/Promo';
import NavTab from '../NavTab/NavTab';
import AboutProject from '../AboutProject/AboutProject';
import Techs from '../Techs/Techs';
import AboutMe from '../AboutMe/AboutMe';
import Portfolio from '../Portfolio/Portfolio';
import SavedPage from '../SavedPage/SavedPage';
import MoviesPage from '../MoviesPage/MoviesPage';
import Footer from '../Footer/Footer';

function App() {
  const [currentAuth, setAuth] = useState({});
  const [loginStatus, setLoginStatus] = useState(false);

  const [loading, setLoading] = useState(false);

  const history = useHistory();

  const [errMessage, setErrMessage] = useState('');
  const [confirmMessage, setConfirmMessage] = useState('');
  const [timerId, setTimerId] = useState(null);

  useEffect(() => {
    setLoading(true);
    auth.authorization()
      .then((res) => {
        setAuth(res);
        setLoginStatus(true);
      })
      .catch((err) => {
        if (err instanceof Promise) {
          err.then(err => setErrWindow(err.message))
        } else {
          setErrWindow(err.message);
        }
        setLoginStatus(false);
      })
      .finally(() => {
        setLoading(false);
      })
  }, [loginStatus])

  const [cards, setCards] = useState([]);
  const cardsRef = useRef([]);

  const [initialCards, setInitialCards] = useState([]);
  const [savedMovies, setSaved] = useState([]);
  const initialsRef = useRef([]);

  const [endOfList, setEnd] = useState(true);

  const [searchStr, setSearch] = useState('');
  const [shortsOnly, setShortsOnly] = useState(false);

  const [searchResult, setResult] = useState([]);
  const searchRef = useRef([]);

  const isTablet = useMediaQuery({
    query: "(max-width: 1045px)",
  });

  const isMobile = useMediaQuery({
    query: "(max-width: 694px)",
  });

  useEffect(() => {
    if (!localStorage.getItem('lastSearch')) {
      localStorage.setItem('lastSearch', JSON.stringify({
        searchStr: '',
        shortsOnly: false,
        searchResult: []
      }));
    } else {
      const lastSearch = JSON.parse(localStorage.getItem('lastSearch'));
      setSearch(lastSearch.searchStr);
      setShortsOnly(lastSearch.shortsOnly);
      setSearch(lastSearch.searchResult);
    }
  }, [])

  function setErrWindow({ message }) {
    setErrMessage(message);
    const timer = setTimeout(() => { setErrMessage('') }, messageTime);
    clearTimeout(timerId);
    setTimerId(timer);
  }

  function setConfirmWindow(message) {
    setConfirmMessage(message);
    const timer = setTimeout(() => { setConfirmMessage('') }, messageTime);
    clearTimeout(timerId);
    setTimerId(timer);
  }

  function handleCheckbox() {
    const lastSearch = JSON.parse(localStorage.getItem('lastSearch'));
    lastSearch.shortsOnly = !(lastSearch.shortsOnly);
    setShortsOnly(lastSearch.shortsOnly);
    if (lastSearch.shortsOnly) {
      setResult(Search(cards, searchStr).filter((movie) => movie.duration <= shortsDuration));
    } else {
      setResult(Search(cards, searchStr));
    }
    localStorage.setItem('lastSearch', JSON.stringify(lastSearch));
  }

  function handleSearchMovie(search) {
    const lastSearch = JSON.parse(localStorage.getItem('lastSearch'));
    lastSearch.searchStr = search;
    setSearch(search);
    if (lastSearch.shortsOnly) {
      setResult(Search(cards, search).filter((movie) => movie.duration <= shortsDuration));
    } else {
      setResult(Search(cards, search));
    }
    localStorage.setItem('lastSearch', JSON.stringify(lastSearch));
  }

  function handleSignInSubmit(data) {
    auth.signin(data)
      .then((res) => {
        localStorage.setItem('loggedIn', true);
        localStorage.setItem('lastSearch', JSON.stringify({
          searchStr: '',
          shortsOnly: false,
          searchResult: []
        }));
        setSearch('');
        setShortsOnly(false);
        setConfirmWindow('Успешный вход');
        setErrMessage('');
        history.push('/movies');
        setLoginStatus(true);
      })
      .catch((err) => {
        if (err instanceof Promise) {
          err.then(setErrWindow)
        } else {
          setErrWindow(err.message);
        }
        setLoginStatus(false);
      })
  }

  function handleSignUpSubmit(data) {
    auth.signup(data)
      .then(() => {
        localStorage.setItem('loggedIn', true);
        localStorage.setItem('lastSearch', JSON.stringify({
          searchStr: '',
          shortsOnly: false,
          searchResult: []
        }));
        setSearch('');
        setShortsOnly(false);
        setErrMessage('');
        setConfirmWindow('Успешная регистрация');
        history.push('/movies');
        setLoginStatus(true);
      })
      .catch((err) => {
        err.then(setErrWindow);
        localStorage.removeItem('loggedIn');
        setLoginStatus(false);
      })
  }

  function handleUserPatch(data) {
    api.updateUserInfo(data)
      .then((res) => {
        setErrMessage('');
        setAuth(res);
        setConfirmWindow('Успешно обновлены данные');
      })
      .catch((err) => {
        err.then(setErrWindow);
      })
  }

  function handleSignOut() {
    auth.signout()
      .then((res) => {
        setAuth({});
        localStorage.removeItem('loggedIn');
        localStorage.setItem('lastSearch', JSON.stringify({
          searchStr: '',
          shortsOnly: false,
          searchResult: []
        }));
        setLoginStatus(false);
        setErrMessage('');
        setCards([]);
        setSaved([]);
        history.push('/');

        setConfirmMessage('Вы вышли из аккаунта');
        setTimeout(() => {
          setConfirmMessage('')
        }, messageTime);
      })
      .catch((err) => {
        err.then(setErrWindow);
      })
  }

  function changeInitials() {
    let initials = [];
    if (isMobile) {
      initials = searchRef.current.slice(0, mobileStartCount);
    } else if (isTablet) {
      initials = searchRef.current.slice(0, tabletStartCount);
    } else {
      initials = searchRef.current.slice(0, startCount);
    }
    setInitialCards(initials);
    const cardsCount = isMobile || isTablet ? mobileMoreCardsCount : moreCardsCount;
    if (initials.length + cardsCount >= searchRef.current.length) {
      setEnd(true);
    } else {
      setEnd(false);
    }
  }

  function loadInitials() {
    if (isTablet || isMobile) {
      setInitialCards(searchResult.slice(0, initialsRef.current.length + mobileMoreCardsCount));
    } else {
      setInitialCards(searchResult.slice(0, initialsRef.current.length + moreCardsCount));
    }
    const cardsCount = isMobile || isTablet ? mobileMoreCardsCount : moreCardsCount;
    if (initialsRef.current.length + cardsCount >= searchRef.current.length) {
      setEnd(true);
    } else {
      setEnd(false);
    }
  }

  function changeCardStatus(moviesList, newMovie, status) {
    return moviesList.map((item) => (
      (newMovie.movieId === item.movieId) ? { ...newMovie, saved: status } : item
    ))
  }

  function handleSave(movie) {
    api.changeSaveStatus(movie, movie.saved)
      .then((newMovie) => {
        if (movie.saved) {
          //удаляем фильм
          setCards((state) => changeCardStatus(state, newMovie, false));
          setInitialCards((state) => changeCardStatus(state, newMovie, false));
          setSaved((state) => state.filter((movie) => movie.movieId !== newMovie.movieId));
          setResult((state) => changeCardStatus(state, newMovie, false));
        } else {
          //сохраняем фильм
          setCards((state) => changeCardStatus(state, newMovie, true));
          setInitialCards((state) => changeCardStatus(state, newMovie, true));
          setSaved((state) => [...state, { ...newMovie, saved: true }]);
          setResult((state) => changeCardStatus(state, newMovie, true));
        }
      })
      .catch((err) => {
        if (err instanceof Promise) {
          err.then(setErrWindow)
        } else {
          setErrWindow(err.message);
        }
      })
  }

  useEffect(() => {
    cardsRef.current = cards;
  }, [cards]);

  useEffect(() => {
    initialsRef.current = initialCards;
  }, [initialCards]);

  useEffect(() => {
    searchRef.current = searchResult;
    const lastSearch = JSON.parse(localStorage.getItem('lastSearch'));
    lastSearch.searchResult = searchRef.current;
    localStorage.setItem('lastSearch', JSON.stringify(lastSearch));
  }, [searchResult]);

  useEffect(() => {
    changeInitials();
  }, [shortsOnly, searchStr, searchResult]);

  useEffect(() => {
    setLoading(true);
    Promise.all([moviesApi.getMovies(), api.getMovies()])
      .then(([resMovies, resSaved]) => {
        const data = resMovies.map((movie) => {
          const saved = resSaved.find((element) => element.movieId === movie.id);
          return {
            _id: Boolean(saved) ? saved._id : '',
            country: movie.country,
            director: movie.director,
            duration: movie.duration,
            year: movie.year,
            description: movie.description,
            image: moviesUrl + movie.image['url'],
            trailerLink: movie.trailerLink,
            nameRU: movie.nameRU,
            nameEN: movie.nameEN,
            thumbnail: moviesUrl + movie.image['formats']['thumbnail']['url'],
            movieId: movie.id,
            saved: Boolean(saved),
          };
        })
        setCards(data);
        setSaved(data.filter((movie) => movie.saved === true));

        const lastSearch = JSON.parse(localStorage.getItem('lastSearch'));
        setSearch(lastSearch.searchStr);
        setShortsOnly(lastSearch.shortsOnly);

        if (lastSearch.shortsOnly) {
          setResult(Search(cardsRef.current, lastSearch.searchStr).filter((movie) => movie.duration <= shortsDuration));
        } else {
          setResult(Search(cardsRef.current, lastSearch.searchStr));
        }
      })
      .catch((err) => {
        if (err instanceof Promise) {
          err.then(err => setErrWindow(err.message))
        } else {
          setErrWindow(err.message);
        }
      })
      .finally(() => {
        setLoading(false);
      })
  }, [loginStatus]);

  if (loading) {
    return <Preloader />;
  }

  return (
    <CurrentAuthContext.Provider value={currentAuth}>
      <div className="page">
        <ErrorMessage message={errMessage} />
        <ConfirmMessage message={confirmMessage} />

        <Switch>
          <Route
            exact
            path='/signin'
            key='login'
            render={() => (
              loginStatus ?
                <Redirect to="/movies" /> :
                <Login onSubmit={handleSignInSubmit} />
            )}
          />

          <Route
            exact
            path='/signup'
            key='register'
            render={() => (
              loginStatus ?
                <Redirect to="/movies" /> :
                <Register onSubmit={handleSignUpSubmit} />
            )}
          />

          <ProtectedRoute
            path='/profile'
            loggedIn={localStorage.getItem('loggedIn')}
            mainSection={false}

            component={Profile}
            patchUser={handleUserPatch}
            signOut={handleSignOut}
          />

          <ProtectedRoute
            path='/movies'
            loggedIn={localStorage.getItem('loggedIn')}
            cardsLoading={loading}

            handleCheckbox={handleCheckbox}
            handleSearchMovie={handleSearchMovie}
            cards={initialCards}
            handleSave={handleSave}
            isEnd={endOfList}
            loadMore={loadInitials}

            component={MoviesPage}
            mainSection={true}
          />

          <ProtectedRoute
            path='/saved-movies'
            loggedIn={localStorage.getItem('loggedIn')}
            cardsLoading={loading}

            handleCheckbox={handleCheckbox}
            handleSearchMovie={handleSearchMovie}
            cards={savedMovies}
            handleSave={handleSave}

            component={SavedPage}
            mainSection={true}
          />

          <Route exact path='/'>
            <Header loggedIn={loginStatus} />
            <Promo />
            <NavTab />
            <AboutProject />
            <Techs />
            <AboutMe />
            <Portfolio />
            <Footer />
          </Route>

          <Route path='/404'>
            <ErrorPage />
          </Route>

          <Route path="*" render={() => <Redirect to="/404" />} />

        </Switch>
      </div>
    </CurrentAuthContext.Provider>
  );
}

export default withRouter(App);
