import './App.css';
import { Route, Switch, withRouter } from 'react-router-dom';
import Header from "../Header/Header";
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import Profile from '../Profile/Profile';
import Login from '../Login/Login';
import Register from '../Register/Register';
import { useState } from 'react';
import ErrorPage from '../ErrorPage/ErrorPage';

function App() {

  const [user, setUser] = useState({name: 'Полина', email: 'pochta@yandex.ru' })

  function handleSignInSubmit(data) {
    console.log(data);
  }

  return (
    <div className="page">

      <Switch>
        <Route exact path='/signin' key='login'> 
          <Login
            onSubmit={handleSignInSubmit}
          />
        </Route>

        <Route exact path='/signup' key='register'>
          <Register

          />
        </Route>

        <Route exact path='/profile'>
          <Header />
          <Profile 
          name={user.name}
          email={user.email} 
          setUser={setUser}
          />
        </Route>

        <Route path='/404'>
          <ErrorPage />
        </Route>

        <Route path='/'>
          <Header />
          <Main />
          <Footer />
        </Route>

      </Switch>
    </div>
  );
}

export default withRouter(App);
