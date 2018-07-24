import renderer from "react-test-renderer";
import React from "react";
import WeatherStats from "../WeatherStats";
import { mockWeatherData } from "../__mocks__/weatherData";

describe("Weather Stats", () => {
  test("renders", () => {
    const component = renderer.create(<WeatherStats data={mockWeatherData} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
