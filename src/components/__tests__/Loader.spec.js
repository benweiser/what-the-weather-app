import renderer from "react-test-renderer";
import React from "react";
import Loader from "../Loader";
import * as emotion from "emotion";
import { createSerializer } from "jest-emotion";

expect.addSnapshotSerializer(createSerializer(emotion));

describe("Loader Component", () => {
  test("renders", () => {
    const component = renderer.create(<Loader />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
