import mockAxios from "axios";
import API from "../../api";
import { openWeatherAPIKey } from "../../../apiKey";

describe("API", () => {
  let mockConfig;

  beforeEach(() => {
    jest.clearAllMocks();
    mockConfig = {
      baseURL: "//api.openweathermap.org/data/2.5",
      params: {
        appid: openWeatherAPIKey,
        units: "imperial"
      },
      timeout: 1000
    };
  });

  it("should create a getWeather that wraps axios", () => {
    API.getWeatherByCity(`Chicago`, mockConfig);
    expect(mockAxios.get).toHaveBeenCalledTimes(1);
    expect(mockAxios.get).toHaveBeenCalledWith(
      `/weather?q=Chicago`,
      mockConfig
    );
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
