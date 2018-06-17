import React from 'react';
import Home from '../components/Home';
import NavLink from 'react-router-dom/NavLink';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import { StaticRouter } from 'react-router'

describe('Home Component', () => {
  it('should be defined', () => {
    expect(Home).toBeDefined();
  });

  it('Home Component matches the snapshot', () => {
    const context = {
      props: {}
    };
    const tree = renderer.create(
      <StaticRouter location="home" context={context}>
        <Home />
      </StaticRouter>
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });


  it('Count NavLink should be equal two', () => {
    const wrapper = shallow(<Home />);
    const links = wrapper.find(NavLink);

    expect(links).toHaveLength(2);
  });
});
