import mockAxios from "axios";
import API from "../WeatherService";
import apiKey from "../../../apiKey";

describe("API", () => {
  let mockConfig;

  beforeEach(() => {
    jest.clearAllMocks();
    mockConfig = {
      baseURL: "//api.openweathermap.org/data/2.5",
      params: {
        appid: apiKey,
        units: "imperial"
      },
      timeout: 1000
    };
  });

  it("should create a namespaced object for the API call", () => {
    expect(typeof API).toBe("object");
    expect(typeof API.getWeather).toBe("function");
    expect(typeof API.getWeatherByZipCode).toBe("function");
    expect(typeof API.getWeatherByZipCode).toBe("function");
  });

  it("should include a getWeather function", () => {
    expect(typeof API.getWeather).toBe("function");
  });

  it("should create a getWeather that wraps axios", () => {
    API.getWeather(`Chicago`, mockConfig);
    expect(mockAxios.get).toHaveBeenCalledTimes(1);
    expect(mockAxios.get).toHaveBeenCalledWith(`/weather?Chicago`, mockConfig);
  });

  it("should get weather by zip code", () => {
    API.getWeatherByZipCode("89122", mockConfig);
    expect(mockAxios.get).toHaveBeenCalledTimes(1);
    expect(mockAxios.get).toHaveBeenCalledWith(
      `/weather?zip=89122,us`,
      mockConfig
    );
  });

  it("should get weather by coordinates", () => {
    API.getWeatherByCoords(36.1699, 115.1398);
    expect(mockAxios.get).toHaveBeenCalledTimes(1);
    expect(mockAxios.get).toHaveBeenCalledWith(
      `/weather?lat=36.1699&lon=115.1398`,
      mockConfig
    );
  });
});
