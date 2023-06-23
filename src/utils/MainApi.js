import { mainUrl } from '../utils/constants';

class MainApi {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
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

  updateUserInfo(data) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify(data)
    })
      .then(this._checkResponse);
  }

  getMovies() {
    return fetch(`${this._baseUrl}/movies`, {
      method: 'GET',
      credentials: 'include',
      headers: this._headers
    })
      .then(this._checkResponse);
  }

  saveMovie(data) {
    return fetch(`${this._baseUrl}/movies`, {
      method: 'POST',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify(data)
    })
      .then(this._checkResponse);
  }

  deleteMovie(movieId) {
    return fetch(`${this._baseUrl}/movies/${movieId}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: this._headers,
    })
      .then(this._checkResponse);
  }

  changeSaveStatus(movie, isSaved) {
    const data = {
      country: movie.country,
      director: movie.director,
      duration: movie.duration,
      year: movie.year,
      description: movie.description,
      image: movie.image,
      trailerLink: movie.trailerLink,
      nameRU: movie.nameRU,
      nameEN: movie.nameEN,
      thumbnail: movie.thumbnail,
      movieId: movie.movieId,
    };

    if (isSaved) {
      return this.deleteMovie(movie._id);
    } else {
      return this.saveMovie(data);
    }
  }

  //////////////

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'GET',
      credentials: 'include',
      headers: this._headers
    })
      .then(this._checkResponse);
  }

  uploadCard(data) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify(data)
    })
      .then(this._checkResponse);
  }

  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: this._headers
    })
      .then(this._checkResponse);
  }

  deleteLike(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: 'DELETE',
      credentials: 'include',
      headers: this._headers
    })
      .then(this._checkResponse);
  }

  changeLikeCardStatus(cardId, isLiked) {
    if (isLiked) {
      return this.deleteLike(cardId);
    } else {
      return this.putLike(cardId);
    }
  }

  updateAvatar(avatar) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatar
      })
    })
      .then(this._checkResponse);
  }
}

export const api = new MainApi({
  baseUrl: mainUrl,
  headers: {
    'Content-Type': 'application/json',
  }
});