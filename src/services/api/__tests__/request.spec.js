import mockAxios from "axios";
import { isExpired, getAjax, getCachedAjax } from "../request";

describe("Get Request", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return a response with our data, query, and timestamp", () => {
    getAjax("/test", {}, "test");
    expect(mockAxios.get).toHaveBeenCalledTimes(1);
  });

  it("should not call axios to query a cached response", () => {
    getCachedAjax("/test", {}, "test");
    expect(localStorage.getItem).toBeCalledWith("bw.test");
    expect(mockAxios.get).toBeCalledWith("/test", {});
    expect(mockAxios.get).toHaveBeenCalledTimes(1);
  });
});
