import mockAxios from "axios";
import { isExpired, getAjax, getCachedAjax } from "../request";

describe("Get Request", () => {
  const RealDate = Date;

  function mockDate(isoDate) {
    global.Date = class extends RealDate {
      constructor() {
        return new RealDate(isoDate);
      }
    };
  }

  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    global.Date = RealDate;
  });

  it("should return a response with our data, query, and timestamp", () => {
    getAjax("/test", {}, "test");
    expect(mockAxios.get).toHaveBeenCalledTimes(1);
  });

  it("should return true if the timestamp is expired", () => {
    mockDate("2017-11-25T12:34:56z");
    const response = {
      timestamp: 1534627545800
    };
    expect(isExpired(mockDate, response.timestamp) === true);
  });

  it("should not call axios to query a cached response", () => {
    getCachedAjax("/test", {}, "test");
    expect(localStorage.getItem).toBeCalledWith("bw.test");
    expect(mockAxios.get).toBeCalledWith("/test", {});
    expect(mockAxios.get).toHaveBeenCalledTimes(1);
  });
});
