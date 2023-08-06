import { expect } from 'chai';
import sinon from 'sinon';
import Button from './button';

describe('Button component test', () => {
  it("button should be click", () => {
    const callback = sinon.stub();
    const button = new Button({ text: '', events: { click: callback } });
    const element = button.element as HTMLElement;

    element.click();
    expect(callback.calledOnce).to.eq(true);
  });
});
