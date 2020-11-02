import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import Togglable from '../containers/Togglable/Togglable';

describe('Toggleable -container', () => {
  let component;

  beforeEach(() => {
    component = render(
      <Togglable buttonText2='Cancel' buttonText1='Test'>
        <div className='helloWorld'></div>
      </Togglable>
    );
  });

  test('"Test" button is rendered', () => {
    expect(component.container).toHaveTextContent('Test');
  });

  test('After pressing "Test", children is displayed', () => {
    const button = component.getByText('Test');
    fireEvent.click(button);
    expect(component.container).toHaveTextContent('Cancel');
  });
});
