import { fireEvent, render, waitForElement } from "react-testing-library";
import React from "react";
import mockAxios from "axios";

import WeatherPage from "../WeatherPage";
import { mockWeatherData } from "../__mocks__/weatherData";
import { API_CONFIG } from "../../services/api/WeatherService";

const setup = () => render(<WeatherPage />);

describe("Weather Page Component", () => {
  it("should render a weather page", () => {
    const { container } = setup();
    expect(container).toMatchSnapshot();
  });

  it("should perform a weather search", async done => {
    const response = {
      data: {
        ...mockWeatherData
      }
    };
    mockAxios.get.mockImplementationOnce(() => Promise.resolve(response));
    const { getByTestId } = setup();
    fireEvent.click(getByTestId("search-button"));
    expect(mockAxios.get).toHaveBeenCalledTimes(1);
    expect(mockAxios.get).toHaveBeenCalledWith("/weather?q=", API_CONFIG);
    mockAxios.get.mockImplementationOnce(() =>
      Promise.resolve({
        data: {
          photos: {
            photo: "test123"
          }
        }
      })
    );
    expect(mockAxios.get).toHaveBeenCalledTimes(1);

    const weatherStatsNode = await waitForElement(() =>
      getByTestId("WeatherStats")
    );

    expect(weatherStatsNode).toHaveTextContent("Current Temperature:");
    done();
  });
});
