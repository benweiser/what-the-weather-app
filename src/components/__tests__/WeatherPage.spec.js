import renderer from "react-test-renderer";
import React from "react";
import WeatherPage from "../WeatherPage";

describe("Weather Page Component", () => {
  test("renders", () => {
    const component = renderer.create(<WeatherPage />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
