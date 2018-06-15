import React from 'react';
import Profile from '../components/Profile';
import renderer from 'react-test-renderer';
import StaticRouter from 'react-router/StaticRouter';

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
        <Profile {...props} />
      </StaticRouter>
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
})
