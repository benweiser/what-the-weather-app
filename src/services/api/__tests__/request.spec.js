import mockAxios from "axios";
import { isExpired, getAjax, getCachedAjax } from "../request";

export const API_CONFIG = {
  baseURL: "//api.openweathermap.org/data/2.5",
  params: {
    appid: 1234,
    units: "imperial"
  },
  timeout: 1000
};

describe("Get Request", () => {
  beforeEach(() => {
    // jest.clearAllMocks();
    //   jest.spyOn(Date, "getTime").mockImplementation(() => 1531027389079);
  });

  it("it should return true if our timestamp is expired", () => {
    //  expect(isExpired())
  });

  it("should store the response in session storage", () => {
    return undefined;
  });

  it("should return a response with our data, query, and timestamp", () => {
    // getAjax("/test", {}, "test");
    // expect(mockAxios.get).toHaveBeenCalledTimes(1);
  });

  it("should not call axios to query a cached response", () => {
    // const mockLocalStorage = sessionStorage.setItem(`{"bw.test": { data: {}}}`);
    // expect(sessionStorage.setItem).toHaveBeenCalledTimes(1);
    getCachedAjax("/test", {}, "test");
    //    sessionStorage.setItem("bw.test", "test");
    getCachedAjax("/test", {}, "test");
    // expect(sessionStorage.setItem).toBeCalledWith(`{"bw.test": { data: {}}}`);
    expect(mockAxios.get).toHaveBeenCalledTimes(1);
  });

  it("should throw an error if our server doesnt give us a response", () => {
    return undefined;
  });
});
