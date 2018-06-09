import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import io from 'socket.io-client';

import AuthService from '../../services/auth';

class CreateRoom extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      battleTypeId: '',
      battleTypes: []
    };

    this.authService = new AuthService();
    this.socket = io(process.env.REACT_APP_API_HOST);
  }

  componentDidMount() {
    const token = this.authService.token;

    axios.get('https://ping-pong-main-server.herokuapp.com/api/battle-types', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(({ data }) => {
        this.setState({ battleTypes: data['battleTypes'] });
      })
      .catch(err => console.log(err));
  }

  componentWillReceiveProps(newProps) {
    this.setState({ open: newProps.open });
  }

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  }

  handleSubmit = event => {
    event.preventDefault();

    const battleTypeId = this.state.battleTypeId;

    if (battleTypeId) {
      const token = this.authService.token;

      axios({
        method: 'POST',
        url: 'https://ping-pong-main-server.herokuapp.com/api/game-rooms',
        data: {
          battleTypeId
        },
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
        .then(({ data }) => {
          this.socket.emit('createGameRoom', data['gameRoom']);

          this.handleReset();
        })
        .catch(err => console.log(err));
    }
  }

  handleReset = () => {
    this.setState({ open: false, battleTypeId: '' });
  }

  render() {
    const battleTypesOptions = this.state.battleTypes.map(element => (
      <option
        key={element._id}
        value={element._id}>{element.name.toUpperCase()}</option>
    ));

    return (
      <Dialog
        open={this.state.open}
        onClose={this.handleClose}>
        <DialogTitle>Create Room</DialogTitle>
        <DialogContent>
          <form
            onSubmit={this.handleSubmit}
            onReset={this.handleReset}
            autoComplete="off" noValidate>
            <div className="form-group">
              <label>Battle type</label>
              <select
                className="form-control"
                value={this.state.battleTypeId}
                onChange={this.handleChange('battleTypeId')}>
                <option value="">-- Select --</option>
                {battleTypesOptions}
              </select>
            </div>
            <Button onClick={this.handleSubmit} variant="contained" color="primary">
              Create
            </Button>
            <span className="mx-1"></span>
            <Button onClick={this.handleReset} variant="contained" color="secondary">
              Cancel
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    );
  }
}

export default CreateRoom;
