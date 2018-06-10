import React from 'react';
import axios from 'axios';
import { NavLink, withRouter } from 'react-router-dom';

import AuthService from '../services/auth';

import './Profile.css';

export class Profile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {
        account: {
          username: '',
          level: '',
          experience: '',
          coins: ''
        },
        facebook: {
          id: '',
          email: '',
          name: {
            familyName: '',
            givenName: '',
            middleName: ''
          }
        }
      }
    }

    this.authService = new AuthService();
    this.logout = this.logout.bind(this);
  }

  componentDidMount() {
    const token = this.authService.token;

    axios.get('https://ping-pong-main-server.herokuapp.com/api/oauth/user', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(({ data }) => {
        this.setState({ user: data['user'] });
      })
      .catch(err => console.log(err));
  }

  logout() {
    this.authService.logout();
    this.props.history.push('/login');
    const newState = {...this.state};
    newState.user = {
      account: {
        username: '',
        level: '',
        experience: '',
        coins: ''
      },
      facebook: {
        id: '',
        email: '',
        name: {
          familyName: '',
          givenName: '',
          middleName: ''
        }
      }
    };
    this.setState(newState);
  }

  render() {
    return (
      <section id="profile">
        <div className="container">
          <div className="card text-center">
            <div className="card-header">
              <h2>Profile</h2>
            </div>
            <div className="card-body">
              <h2 className="card-title">
                {this.state.user.facebook.name.givenName}&nbsp;
                {this.state.user.facebook.name.familyName}
              </h2>
              <h5 className="card-subtitle text-muted">
                {this.state.user.account.username}
              </h5>
            </div>
            <div className="row unit-stats">
              <div className="col-4 item">
                <div className="stat">{this.state.user.account.level}</div>
                <div className="stat-value">Level</div>
              </div>
              <div className="col-4 item">
                <div className="stat">{this.state.user.account.experience}</div>
                <div className="stat-value">Experience</div>
              </div>
              <div className="col-4 item">
                <div className="stat">{this.state.user.account.coins}</div>
                <div className="stat-value">Coins</div>
              </div>
            </div>
            <div className="card-body">
              <button className="btn btn-danger" onClick={this.logout}>
                <i className="fas fa-sign-out-alt mr-1"></i>Logout
              </button>
            </div>
            <div className="card-footer">
              <NavLink to="/" className="btn btn-dark">
                <i className="fas fa-arrow-left mr-1"></i>Back
              </NavLink>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default withRouter(Profile);
