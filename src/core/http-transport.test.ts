import sinon, { SinonFakeXMLHttpRequestStatic, SinonFakeXMLHttpRequest } from 'sinon';
import { expect } from 'chai';
import { HTTPTransport } from './http-transport';

describe('class HTTPTransport', () => {
  let xhr: SinonFakeXMLHttpRequestStatic;
  let instance: HTTPTransport;
  const requests: SinonFakeXMLHttpRequest[] = [];

  beforeEach(() => {
    xhr = sinon.useFakeXMLHttpRequest();

    global.XMLHttpRequest = xhr;

    xhr.onCreate = (req) => {
      requests.push(req);
    };

    instance = new HTTPTransport('');
  });

  afterEach(() => {
    requests.length = 0;
    xhr.restore();
  });

  describe('method call', () => {
    const path = '';
    const options = {};

    it('GET method should be called success', () => {
      instance.get(path, options);

      const [request] = requests;

      expect(request.method).to.equal('GET');
    });

    it('POST method should be called success', () => {
      instance.post(path, options);

      const [request] = requests;

      expect(request.method).to.equal('POST');
    });

    it('PUT method should be called success', () => {
      instance.put(path, options);

      const [request] = requests;

      expect(request.method).to.equal('PUT');
    });

    it('PATCH method should be called success', () => {
      instance.patch(path, options);

      const [request] = requests;

      expect(request.method).to.equal('PATCH');
    });

    it('DELETE method should be called success', () => {
      instance.delete(path, options);

      const [request] = requests;

      expect(request.method).to.equal('DELETE');
    });
  });
});
