import React from 'react';
import axios from 'axios';

class Profile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {}
    }
  }

  componentDidMount() {
    axios.get('')
      .then(({ data }) => {

      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <section>
        <div className="container">
          <div className="card mx-auto my-3" style={{ width: "18rem" }}>
            <img 
              className="card-img-top" 
              src="images/default-avatar.jpg" alt="John Doe" />
            <div className="card-body">

            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default Profile;
