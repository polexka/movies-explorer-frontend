import './App.css';
import { Route, Redirect, Switch, withRouter, useHistory } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import { useState, useEffect, useRef } from 'react';

import Main from '../Main/Main';
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
        // history.push('/movies');
      })
      .catch((err) => {
        err.then(({ message }) => {
          // message: Необходима авторизация
        })
        setLoginStatus(false);
      })
      .finally(() => {
        setLoading(false);
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

  const [shortsOnly, setShortsOnly] = useState(
    (localStorage.getItem('shorts') === 'true') ? true : false
  );

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
    setShortsOnly((localStorage.getItem('shorts') === 'true') ? true : false);
  }

  function handleSearchMovie(search) {
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
    // Отображаем индикатор загрузки или что-то другое во время ожидания ответа с сервера
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

          <Route path='/404'>
            <ErrorPage />
          </Route>

          <ProtectedRoute
            path='/'
            loggedIn={loginStatus}
            mainSection={true}

            component={Main}
            isEnd={endOfList}
            handleCheckbox={handleCheckbox}
            handleSearchMovie={handleSearchMovie}
            initials={initialCards}
            initialSaved={initialSaved}
            handleSave={handleSave}
            cardsLoading={loading}
            loadMore={loadInitials}
          />

        </Switch>
      </div>
    </CurrentAuthContext.Provider>
  );
}

export default withRouter(App);
