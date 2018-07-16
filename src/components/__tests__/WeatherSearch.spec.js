import renderer from "react-test-renderer";
import React from "react";
import WeatherSearch from "../WeatherSearch";

describe("Weather Widget Snapshot", () => {
  test("renders", () => {
    const component = renderer.create(
      <WeatherSearch fetchWeather={jest.fn()} />
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
