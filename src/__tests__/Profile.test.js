import React from 'react';
import { Profile } from '../components/Profile';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import { StaticRouter } from 'react-router'

describe('Profile', () => {
  it('should be defined', () => {
    expect(Profile).toBeDefined();
  });

  it('Profile Component matches the snapshot', () => {
    const context = {
      props: {}
    };
    const props = { 
      history: {
        push() {
  
        }
      }  
    };
    const tree = renderer.create(
      <StaticRouter context={context}>
        <Profile {...props}/>
      </StaticRouter>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('initial state of the user object', () => {
    const props = { 
      history: {
        push() {
  
        }
      }  
    };
    const wrapper = shallow(<Profile {...props}/>);
    expect(wrapper.state().user).toEqual({
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
    });
  });

  it('Check state of the user object after logout', () => {
    const fakeUser = {
      account: {
        username: 'username',
        level: '1',
        experience: '0',
        coins: '10'
      },
      facebook: {
        id: '1111',
        email: 'email',
        name: {
          familyName: 'fn',
          givenName: 'gn',
          middleName: 'mn'
        }
      }
    };
    const props = { 
      history: {
        push() {
  
        }
      }  
    };
    const wrapper = shallow(<Profile {...props}/>);
    wrapper.setState({ user: fakeUser });
    expect(wrapper.state()).toEqual({ user: fakeUser });
    wrapper.find('.btn .btn-danger').simulate('click');
    expect(wrapper.state().user).toEqual({
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
    });
  });
})
