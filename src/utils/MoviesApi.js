import { moviesUrl } from './constants';

class MoviesApi {
    constructor(options) {
        this._baseUrl = options.baseUrl;
    }

    _checkResponse(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    }

    getMovies() {
        return fetch(this._baseUrl + '/beatfilm-movies', { method: 'GET' })
        .then(this._checkResponse);
    }
}

export const moviesApi = new MoviesApi({ baseUrl: moviesUrl });