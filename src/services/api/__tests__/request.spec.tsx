import mockAxios from 'axios';
import { MockDateHelper } from '../../../testHelpers';
import { isExpired, fetchData, getCachedData } from '../request';

describe('request', () => {
  let consoleErrorSpy: any;
  beforeEach(() => {
    jest.clearAllMocks();

    consoleErrorSpy = jest
      .spyOn(global.console, 'error')
      .mockImplementationOnce(() => {});
  });

  afterEach(() => {
    MockDateHelper.restoreMockDate();
    consoleErrorSpy.mockRestore();
  });

  it('should return a response with our data, query, and timestamp', () => {
    fetchData('/test', {});
    expect(mockAxios.get).toHaveBeenCalledTimes(1);
  });

  it('should return true if the timestamp is expired', () => {
    MockDateHelper.mockDate('2014-05-30T01:06:00z');
    const response = {
      timestamp: 1401411100000
    };

    expect(isExpired(600000, response)).toBe(true);
  });

  it('should return false if the timestamp is not expired', () => {
    MockDateHelper.mockDate('2014-05-30T01:06:00z');
    const response = {
      timestamp: 1401411100000
    };

    expect(isExpired(6000000, response)).toBe(false);
  });

  it('should call a getCachedData function and set the response in sessionStorage', done => {
    expect.assertions(6);
    MockDateHelper.mockDate('2018-01-01T12:06:00z');
    getCachedData('/test', {}, 'test').then(response => {
      expect(response).toEqual({
        data: {},
        query: '/test',
        timestamp: 1514808360000
      });
      expect(sessionStorage.getItem).toHaveBeenCalledWith('bw.test');
      expect(mockAxios.get).toHaveBeenCalledWith('/test', {});
      expect(mockAxios.get).toHaveBeenCalledTimes(1);
      expect(sessionStorage.setItem).toHaveBeenCalledWith(
        'bw.test',
        `{\"data\":{},\"query\":\"/test\",\"timestamp\":1514808360000}`
      );

      expect(consoleErrorSpy).not.toHaveBeenCalled();

      done();
    });
  });

  it('should call a fetchData function', done => {
    expect.assertions(4);
    MockDateHelper.mockDate('2018-01-01T12:06:00z');
    fetchData('/test', {}).then(response => {
      expect(response).toEqual({
        data: {},
        query: '/test',
        timestamp: 1514808360000
      });
      expect(mockAxios.get).toHaveBeenCalledWith('/test', {});
      expect(mockAxios.get).toHaveBeenCalledTimes(1);
      expect(consoleErrorSpy).not.toHaveBeenCalled();

      done();
    });
  });

  it('should catch errors from fetchData and send them to console', done => {
    expect.assertions(5);
    MockDateHelper.mockDate('2018-01-01T12:06:00z');
    (mockAxios as any).get.mockImplementation(() =>
      Promise.reject('test rejection')
    );

    fetchData('/test', {}).then(response => {
      expect(response).toBeUndefined();
      expect(mockAxios.get).toHaveBeenCalledWith('/test', {});
      expect(mockAxios.get).toHaveBeenCalledTimes(1);
      expect(consoleErrorSpy).toHaveBeenCalled();
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        'fetchData method failed',
        'test rejection'
      );

      done();
    });
  });
});
