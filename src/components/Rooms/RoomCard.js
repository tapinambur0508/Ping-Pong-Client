import React from 'react';
import axios from 'axios';
import io from 'socket.io-client';
import withRouter from 'react-router-dom/withRouter';

import AuthService from '../../services/auth';

const RoomCard = props => {
  const joinToRoom = () => {
    const authService = new AuthService();

    axios({
      method: 'DELETE',
      url: `${process.env.REACT_APP_API_HOST}/api/game-rooms/${props._id}`,
      headers: {
        'Authorization': `Bearer ${authService.token}`
      }
    })
      .then(({ data }) => {
        const socket = io(process.env.REACT_APP_API_HOST);

        socket.emit('connectToGameRoom', data);
        localStorage.setItem('room_id', data._id);
        localStorage.setItem('battle_type', data.battleType.name)
        props.history.push('/game');
      })
      .catch(err => console.log(err));
  }

  return (
    <div className="card text-center">
      <div className="card-body">
        <table className="table">
          <tbody>
            <tr>
              <td>Creator:</td>
              <td className="font-weight-bold">
                {props.firstPlayer.account.username}
              </td>
            </tr>
            <tr>
              <td>Battle type:</td>
              <td className="font-weight-bold">
                {props.battleType.name.toUpperCase()}
              </td>
            </tr>
          </tbody>
        </table>
        {props.firstPlayer._id !== props.user.sub && (
          <button className="btn btn-success btn-lg btn-block" onClick={joinToRoom}>
            Join
          </button>
        )}
      </div>
    </div>
  );
}

export default withRouter(RoomCard);
