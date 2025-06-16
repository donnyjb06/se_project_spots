export class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
    }).then((res) => {
      if (res.ok) return res.json();

      return Promise.reject(`Error: ${res.status}`);
    });
  }

  getCurrentUser() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    }).then((res) => {
      if (res.ok) return res.json();

      return Promise.reject(`Error: ${res.status}`);
    });
  }

  renderInitialDetails() {
    return Promise.all([this.getCurrentUser(), this.getInitialCards()])
      .then(([userData, postsData]) => ({
        userData,
        postsData,
      }))
      .catch((error) => {
        return Promise.reject(`Error: ${res.status}`);
      });
  }

  editUserInfo({ name, about }) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({ name, about }),
    }).then((res) => {
      if (res.ok) return res.json();

      return Promise.reject(`Error: ${res.status}`);
    });
  }

  addNewPost({ name, link }) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name,
        link,
      }),
    }).then((res) => {
      if (res.ok) return res.json();

      return Promise.reject(`Error: ${res.status}`);
    });
  }

  deletePost(id) {
    return fetch(`${this._baseUrl}/cards/${id}`, {
      method: 'DELETE',
      headers: this._headers,
    }).then((res) => {
      if (res.ok) return res.json();
    });

    return Promise.reject(`Error: ${res.status}`);
  }
}
