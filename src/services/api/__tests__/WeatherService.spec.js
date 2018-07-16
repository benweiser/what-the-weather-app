import mockAxios from "axios";
import API from "../WeatherService";
import apiKey from "../../../apiKey";

describe("API", () => {
  beforeEach(() => {
    //  sessionStorage.clear();
  });

  it("should create a namespaced object for the API call", () => {
    expect(typeof API).toBe("object");
  });

  it("should include a getWeather function", () => {
    expect(typeof API.getWeather).toBe("function");
  });

  it("should create a getWeather that wraps axios", () => {
    const mockConfig = {
      baseURL: "//api.openweathermap.org/data/2.5",
      params: {
        appid: apiKey,
        units: "imperial"
      },
      timeout: 1000
    };

    API.getWeather(`Chicago`, mockConfig);
    expect(mockAxios.get).toHaveBeenCalledTimes(1);
    expect(mockAxios.get).toHaveBeenCalledWith(`/weather?Chicago`, mockConfig);
  });
});
