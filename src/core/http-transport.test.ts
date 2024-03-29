import sinon, { SinonFakeXMLHttpRequestStatic, SinonFakeXMLHttpRequest } from 'sinon';
import { expect } from 'chai';
import { HTTPTransport } from './http-transport';

describe('HTTPTransport test', () => {
  let xhr: SinonFakeXMLHttpRequestStatic;
  let instance: HTTPTransport;
  const requests: SinonFakeXMLHttpRequest[] = [];

  beforeEach(() => {
    xhr = sinon.useFakeXMLHttpRequest();

    // @ts-expect-error
    global.XMLHttpRequest = xhr;

    xhr.onCreate = (req) => {
      requests.push(req);
    }

    instance = new HTTPTransport('');
  });

  afterEach(() => {
    requests.length = 0;
    xhr.restore();
  });

  it('Method get() should be called with GET method', () => {
    instance.get('/');

    const [request] = requests;

    expect(request.method).to.equal('Get');
  });

  it('Method post() should be called with POST method', () => {
    instance.post('/');

    const [request] = requests;

    expect(request.method).to.equal('Post');
  });

  it('Method put() should be called with PUT method', () => {
    instance.put('/');

    const [request] = requests;

    expect(request.method).to.equal('Put');
  });

  it('Method patch() should be called with PATCH method', () => {
    instance.patch('/');

    const [request] = requests;

    expect(request.method).to.equal('Patch');
  });

  it('Method delete() should be called with DELETE method', () => {
    instance.delete('/');

    const [request] = requests;

    expect(request.method).to.equal('Delete');
  });
});
