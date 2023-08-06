import { Block } from './Block';
import Router from './Router';
import { expect } from 'chai';
import sinon from 'sinon';

const div = document.createElement('div');
const fake = sinon.fake.returns(div);

const COMPONENT_MOCK = class extends Block {
  getContent = fake;
};

describe('Router test', () => {
  it('start success', () => {
    Router.use('/', COMPONENT_MOCK);
    Router.start();

    expect(fake.callCount).to.equal(1);
  });

  it('back success', () => {
    Router.back();

    expect(fake.callCount).to.equal(1);
  });

  it('go success', () => {
    Router.use('/settings', COMPONENT_MOCK);
    Router.go('/settings');

    expect(fake.callCount).to.equal(2);
  });

  it('go next success', () => {
    Router.use('/messenger', COMPONENT_MOCK);
    Router.start();
    Router.go('/messenger');

    expect(fake.callCount).to.equal(4);
  });
});
