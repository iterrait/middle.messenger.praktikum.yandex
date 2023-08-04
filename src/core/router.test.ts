import { Block } from './block';
import { Router } from './router';
import {expect} from 'chai';
import sinon from 'sinon';

describe('class Router', () => {
  const div = document.createElement('div');
  const fake = sinon.fake.returns(div);
  const ComponentMock = class extends Block {
    getContent = fake;
  };

  it('The start() method draws the desired page', () => {
    Router.use('/', ComponentMock);
    Router.start();

    expect(fake.callCount).to.equal(1);
  });

  it('The back() method draws the desired page', () => {
    Router.back();

    expect(fake.callCount).to.equal(1);
  });

  it('The go() method draws the desired page', () => {
    Router.use('/2', ComponentMock);
    Router.go('/2');

    expect(fake.callCount).to.equal(2);
  });

  it('The go() method draws the desired page', () => {
    Router.use('/3', ComponentMock);
    Router.start();
    Router.go('/3');

    expect(fake.callCount).to.equal(3);
  });
});
