import API from "../WeatherService";
describe("API", () => {
  it("should create a namespaced object for the API call", () => {
    expect(typeof API).toBe("object");
  });
});
