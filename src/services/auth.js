import decode from 'jwt-decode';

class AuthService {
  get token() {
    return localStorage.getItem('id_token');
  }

  set token(token) {
    localStorage.setItem('id_token', token);
  }

  logout() {
    localStorage.removeItem('id_token');
  }

  loggedIn() {
    const token = this.token;

    return !!token && !this._isTokenExpired(token);
  }

  _isTokenExpired(token) {
    try {
      const decoded = decode(token);

      return (decoded.exp < Date.now() / 1000) ? true : false;
    } catch (err) {
      return false;
    }
  }
}

export default AuthService;
