import { v4 as uuidv4 } from 'uuid';

import EventBus from './event-bus';
import * as Handlebars from 'handlebars';

type Props = Record<string, any>;
type Children = Record<string, Block>;

export default abstract class Block<P extends Props = any> {
  static readonly EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_RENDER: 'flow:render',
  };

  private _element: HTMLElement | null;
  private _meta: { tag: string; props: P };
  private eventBus: () => EventBus;

  protected props: P;

  public children: Children;
  public id = uuidv4();

  protected constructor(tag = 'div', propsAndChildren: P) {
    const eventBus = new EventBus();
    const { props, children } = this.getChildren(propsAndChildren);

    this._meta = { tag, props: props as P };
    this._element = null;

    this.props = this.makePropsProxy(props);
    this.children = this.makePropsProxy(children);
    this.eventBus = () => eventBus;

    this.registerEvents(eventBus);
    eventBus.emit(Block.EVENTS.INIT);
  }

  registerEvents(eventBus: EventBus): void {
    eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  init() {
    this._element = this.createDocumentElement(this._meta?.tag);
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }

  createDocumentElement(tag: string): HTMLElement {
    const element = document.createElement(tag);

    if (this.props?.settings?.withInternalID) {
      element.setAttribute('data-id', this.id);
    }

    return element;
  }

  private _render() {
    const fragment = this.render();
    this.removeEvents();
    this._element!.innerHTML = '';
    this._element!.append(fragment);
    this.addEvents();
    this.addAttributes();
  }

  render(): DocumentFragment {
    return new DocumentFragment();
  }

  addEvents() {
    const { events = {} } = this.props;

    Object.keys(events).forEach(eventName => {
      this._element?.addEventListener(eventName, events[eventName]);
    })
  }

  removeEvents() {
    const { events = {} } = this.props;

    Object.keys(events).forEach(eventName => {
      this._element?.removeEventListener(eventName, events[eventName]);
    })
  }

  addAttributes(): void {
    const { attr = {} } = this.props;

    Object.entries(attr).forEach(([key, value]) => {
      this._element?.setAttribute(key, value as string);
    });
  }

  getChildren(propsAndChildren: P) {
    const children: Children = {};
    const props: Props = {};

    Object.entries(propsAndChildren).forEach(([key, value]) => {
      if (value instanceof Block) {
        children[key] = value;
      } else {
        props[key] = value;
      }
    });

    return { children, props };
  }

  compile(template: string | null, props: Props): DocumentFragment {
    const propsAndStubs = { ...props };

    Object.entries(this.children).forEach(([key, child]) => {
      propsAndStubs[key] = `<div data-id="${child.id}"></div>`
    });

    const fragment = document.createElement("template");
    fragment.innerHTML = template
      ? Handlebars.compile(template)(propsAndStubs)
      : '';

    Object.values(this.children).forEach((child) => {
      const stub = fragment.content.querySelector(`[data-id="${child.id}"]`);

      if (stub) {
        stub.replaceWith(child.getContent()!);
      }
    });

    return fragment.content;
  }

  private _componentDidMount() {
    Object.values(this.children).forEach(child => child.dispatchComponentDidMount())
  }

  dispatchComponentDidMount() {
    this.eventBus().emit(Block.EVENTS.FLOW_CDM);

    if (Object.keys(this.children).length) {
      this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }
  }

  private _componentDidUpdate(oldProps: P, newProps: P) {
    const response = this.componentDidUpdate(oldProps, newProps);

    if (!response) {
      return;
    }

    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }

  componentDidUpdate(oldProps: P, newProps: P): boolean {
    return oldProps.error !== newProps.error;
  }

  setProps = (newProps: P) => {
    if (!newProps) {
      return;
    }

    const { children, props } = this.getChildren(newProps);

    if (Object.values(children).length) {
      Object.assign(this.children, children);
    }

    if (Object.values(props).length) {
      Object.assign(this.props, props);
    }
  };

  makePropsProxy(props: any) {
    return new Proxy(props, {
      get(target, prop) {
        const value = target[prop];
        return typeof value === 'function' ? value.bind(target) : value;
      },
      set: (target, prop, value) => {
        const oldValue = { ...target };
        target[prop] = value;
        this.eventBus().emit(Block.EVENTS.FLOW_CDU, oldValue, target);
        return true;
      },
      deleteProperty() {
        throw new Error('Access denied');
      },
    })
  }

  get element() {
    return this._element;
  }

  getContent() {
    return this._element;
  }

  show() {
    this.getContent()!.style.display = 'block';
  }

  hide() {
    this.getContent()!.style.display = 'none';
  }
}
