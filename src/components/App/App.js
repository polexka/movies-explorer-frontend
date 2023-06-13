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
import { moviesUrl } from '../../utils/constants';
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

function App() {
  const [currentAuth, setAuth] = useState({});
  const [loginStatus, setLoginStatus] = useState(false);

  const [loading, setLoading] = useState(false);

  const history = useHistory();

  useEffect(() => {
    setLoading(true);
    auth.authorization()
      .then((res) => {
        setAuth(res);
        setLoginStatus(true);
      })
      .catch((err) => {
        err.then(({ message }) => {
        console.log(message);
        })
        console.log(err);
        setLoginStatus(false);
      })
      .finally(() => {
        setLoading(false);
        localStorage.setItem('lastSearch', JSON.stringify({ searchStr: '', shortsOnly: false }));
      })
  }, [loginStatus])

  const [errMessage, setErrMessage] = useState('');
  const [confirmMessage, setConfirmMessage] = useState('');
  const [timerId, setTimerId] = useState({});

  const [cards, setCards] = useState([]);
  const cardsRef = useRef([]);

  const [initialCards, setInitialCards] = useState([]);
  const [initialSaved, setInitialSaved] = useState([]);
  const initialsRef = useRef([]);

  const [endOfList, setEnd] = useState(false);

  const [searchStr, setSearch] = useState('');

  const [shortsOnly, setShortsOnly] = useState(false);

  const isTablet = useMediaQuery({
    query: "(max-width: 1045px)",
  });

  const isMobile = useMediaQuery({
    query: "(max-width: 694px)",
  });

  function setErrWindow({ message }) {
    setErrMessage(message);
    if (timerId) { clearTimeout(timerId) };
    const timer = setTimeout(() => { setErrMessage('') }, 2000);
    setTimerId(timer);
  }

  function setConfirmWindow(message) {
    setConfirmMessage(message);
    if (timerId) { clearTimeout(timerId) };
    const timer = setTimeout(() => { setConfirmMessage('') }, 2000);
    setTimerId(timer);
  }

  function handleCheckbox() {
    console.log(localStorage.getItem('lastSearch'));
    const lastSearch = JSON.parse(localStorage.getItem('lastSearch'));
    lastSearch.shortsOnly = !(lastSearch.shortsOnly);
    localStorage.setItem('lastSearch', JSON.stringify(lastSearch));

    setShortsOnly(lastSearch.shortsOnly);
  }

  function handleSearchMovie(search) {
    console.log(localStorage.getItem('lastSearch'));
    const lastSearch = JSON.parse(localStorage.getItem('lastSearch'));
    lastSearch.searchStr = search;
    localStorage.setItem('lastSearch', JSON.stringify(lastSearch));

    setSearch(search);
  }

  function handleSignInSubmit(data) {
    auth.signin(data)
      .then((res) => {
        setLoginStatus(true);
        setConfirmWindow('Успешный вход');
        setErrMessage('');
        history.push('/movies');
      })
      .catch((err) => {
        err.then(setErrWindow);
        setLoginStatus(false);
      })
  }

  function handleSignUpSubmit(data) {
    auth.signup(data)
      .then((res) => {
        setLoginStatus(true);
        setErrMessage('');
        setConfirmWindow('Успешная регистрация');
        history.push('/movies');
      })
      .catch((err) => {
        err.then(setErrWindow);
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
        setLoginStatus(false);
        setErrMessage('');

        // setCards([]);



        history.push('/');
        setConfirmWindow('Вы вышли из аккаунта');
      })
      .catch((err) => {
        err.then(setErrWindow);
      })
  }

  function changeInitials() {
    let cardsList = shortsOnly ?
      [...cardsRef.current].filter((movie) => movie.duration <= 40) : [...cardsRef.current];

    if (searchStr) {
      cardsList = Search(cardsList, searchStr);
    }

    setInitialSaved(
      cardsList.filter(movie => (movie.saved === true))
    );

    if (isMobile) {
      setInitialCards(cardsList.slice(0, 5));
    } else if (isTablet) {
      setInitialCards(cardsList.slice(0, 8));
    } else {
      setInitialCards(cardsList.slice(0, 12));
    }

    if (initialsRef.current.length === cardsList.length) {
      setEnd(true);
    } else {
      setEnd(false);
    }
  }

  function loadInitials() {
    let cardsList = shortsOnly ?
      [...cardsRef.current].filter((movie) => movie.duration <= 40) : [...cardsRef.current];

    if (isTablet || isMobile) {
      setInitialCards(cardsList.slice(0, initialsRef.current.length + 2));

    } else {
      setInitialCards(cardsList.slice(0, initialsRef.current.length + 3));
    }

    if (initialsRef.current.length + 1 >= cardsList.length) {
      console.log('initialsRef.current.length: ' + initialsRef.current.length);
      console.log('cardsList.length: ' + cardsList.length);
      setEnd(true);
    } else {
      console.log('initialsRef.current.length: ' + initialsRef.current.length);
      console.log('cardsList.length: ' + cardsList.length);
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
          setInitialSaved((state) => state.filter((movie) => movie.movieId !== newMovie.movieId));
        } else {
          //сохраняем фильм
          setCards((state) => changeCardStatus(state, newMovie, true));
          setInitialCards((state) => changeCardStatus(state, newMovie, true));
          setInitialSaved((state) => [...state, { ...newMovie, saved: true }]);
          if (shortsOnly) {
            setInitialSaved((state) => state.filter((movie) => movie.duration <= 40));
          }
        }
      })
      .catch((err) => {
        console.log(err);
      })
  }

  useEffect(() => {
    cardsRef.current = cards;
  }, [cards]);

  useEffect(() => {
    initialsRef.current = initialCards;
  }, [initialCards]);

  useEffect(() => {
    changeInitials();
  }, [shortsOnly, searchStr]);

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
        changeInitials();
      })
      .catch((err) => {
        err.then(setErrWindow);
      })
      .finally(() => {
        setLoading(false);
      })
  }, []);

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
            loggedIn={loginStatus}
            mainSection={false}

            component={Profile}
            patchUser={handleUserPatch}
            signOut={handleSignOut}
          />

          <ProtectedRoute
            path='/movies'
            loggedIn={loginStatus}
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
            loggedIn={loginStatus}
            cardsLoading={loading}

            handleCheckbox={handleCheckbox}
            handleSearchMovie={handleSearchMovie}
            cards={initialSaved}
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
          </Route>

          <Route path='/404'>
            <ErrorPage />
          </Route>

        </Switch>
      </div>
    </CurrentAuthContext.Provider>
  );
}

export default withRouter(App);
