import React from 'react';
// import moment from 'moment';


function Hello(props) {
  return <h1>Hello at {props.now}</h1>;
}

const moment = new Date(123123123124);

describe('WHen setting up testing', () => {
  let result;
  beforeAll(() => {
    result = Hello({now: moment.toISOString()});
  });

  it('returns a value', () => {
    expect(result).not.toBeNull();
  });

  it('it is h1', () => {
    expect(result.type).toBe('h1');
  });

  it('has children', () => {
    expect(result.props.children).toBeTruthy();
  });
});
