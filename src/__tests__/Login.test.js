import React from 'react';
import { Login } from '../components/Login';
import renderer from 'react-test-renderer';

describe('Login', () => {
  it('should be defined', () => {
    expect(Login).toBeDefined();
  });

  it('Home Component matches the snapshot', () => {
    const props = { 
      history: {
        push() {
  
        }
      }  
    };
    const head = document.getElementsByTagName('head')[0];
    head.appendChild(document.createElement('script'));
    const tree = renderer.create(
        <Login {...props}/>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
