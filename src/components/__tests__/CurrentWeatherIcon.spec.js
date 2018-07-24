import renderer from "react-test-renderer";
import React from "react";
import CurrentWeatherIcon from "../CurrentWeatherIcon";

describe("Current Weather Icon", () => {
  test("renders", () => {
    const currentConditionCode = 500;
    const component = renderer.create(
      <CurrentWeatherIcon name={currentConditionCode} />
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
