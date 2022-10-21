import sinon, { SinonFakeXMLHttpRequest, SinonFakeXMLHttpRequestStatic } from 'sinon';
import { expect } from 'chai';
import HTTPClient from './HTTPClient';

describe('HTTPClient', () => {
  let xhr: SinonFakeXMLHttpRequestStatic;
  let instance: HTTPClient;
  const requests: SinonFakeXMLHttpRequest[] = [];
  beforeEach(() => {
    xhr = sinon.useFakeXMLHttpRequest();
    // @ts-ignore
    global.XMLHttpRequest = xhr;
    xhr.onCreate = ((requestData: SinonFakeXMLHttpRequest) => {
      requests.push(requestData);
    });
    instance = new HTTPClient('/auth');
  });

  afterEach(() => {
    requests.length = 0;
  });

  describe('.get()', () => {
    it('should send GET request', () => {
      instance.get('/user');
      const [request] = requests;
      request.respond(200, {}, '{}');
      expect(request.method).to.eq('GET');
    });
  });
});
