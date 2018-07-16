import React from "react";
import { css } from "emotion";
import API from "../services/api/WeatherService";
import WeatherSearch from "./WeatherSearch";
import WeatherStats from "./WeatherStats";
import Loader from "./Loader";
import Paper from "@material-ui/core/Paper";

const StyledWeatherStats = css`
  padding: 32px;
`;

const StyledWeatherSearchWrapper = css`
  max-width: 1280px;
  padding: 32px;
  margin: 0 auto;
`;

const StyledWeatherSearch = css`
  margin-bottom: 32px;
`;

class WeatherPage extends React.PureComponent {
  state = {
    data: {},
    fetching: false
  };

  fetchWeather = location => {
    this.setState({ fetching: true });
    API.getWeatherByZipCode(location)
      .then(res => {
        return this.setState({ data: res.data, fetching: false });
      })
      .catch(e => {
        console.log("error", e);
        this.setState({ fetching: false });
      });
  };

  render() {
    const weatherData = this.state.data;
    if (this.state.fetching) {
      return <Loader />;
    }
    return (
      <div className={StyledWeatherSearchWrapper}>
        <Paper elevation={1} className={StyledWeatherStats}>
          <WeatherSearch
            className={StyledWeatherSearch}
            fetchWeather={this.fetchWeather}
          />
          {weatherData.main && <WeatherStats data={weatherData} />}
        </Paper>
      </div>
    );
  }
}

export default WeatherPage;
