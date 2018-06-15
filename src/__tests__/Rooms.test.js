import React from 'react';
import Rooms from '../components/Rooms';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import StaticRouter from 'react-router/StaticRouter'

describe('Rooms', () => {
  it('should be defined', () => {
    expect(Rooms).toBeDefined();
  });

  it('Rooms Component matches the snapshot', () => {
    const tree = renderer.create(
      <StaticRouter context={{}}>
        <Rooms />
      </StaticRouter>
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('should open modal window', () => {
    const wrapper = shallow(<Rooms />);
    const createRoomBtn = wrapper.find('button.btn.btn-primary');

    createRoomBtn.simulate('click');

    const isDialogOpen = wrapper.state().isDialogOpen;

    expect(isDialogOpen).toEqual(true);
  });
})
