import { mainUrl } from '../utils/constants';

class Auth {
  constructor(options) {
    this._baseUrl = options.baseUrl;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(res)
      .then(
        () => { },
        (err) => {
          throw err.json();
        }
      );
  }

  signup({ email, password, name }) {
    return fetch(`${this._baseUrl}/signup`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'email': email,
        'password': password,
        'name': name
      })
    })
      .then(this._checkResponse);
  }

  signin({ email, password }) {
    return fetch(`${this._baseUrl}/signin`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'email': email,
        'password': password
      })
    })
      .then(this._checkResponse);
  }

  signout() {
    return fetch(`${this._baseUrl}/signout`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
    })
      .then(this._checkResponse);
  }

  authorization() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then(this._checkResponse);
  }

}

export const auth = new Auth({
  baseUrl: mainUrl
});