import React from "react";
import { css } from "emotion";
import API from "../services/api/WeatherService";
import WeatherSearch from "./WeatherSearch";
import WeatherStats from "./WeatherStats";
import Loader from "./Loader";
import Paper from "@material-ui/core/Paper";
import {
  getFlickrPhotosByCoords,
  getRandomPhoto
} from "../services/api/FlickrService";

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

const weatherMap = location => {
  const searchType = {
    city: value => API.getWeatherByCity(value),
    coords: value => API.getWeatherByCoords(value),
    zip: value => API.getWeatherByZipCode(value)
  };
  return searchType[location.searchMethod](location.value);
};

class WeatherPage extends React.Component {
  state = {
    data: {},
    fetching: false
  };

  onFetchWeather = async location => {
    this.setState({ fetching: true });

    const weatherData = await weatherMap(location);
    console.log("wewather data", weatherData.data);
    const {
      data: { coord }
    } = weatherData;
    const photoData = await getFlickrPhotosByCoords(
      coord.lat,
      coord.lon,
      weatherData.data.name
    );

    const photo = await getRandomPhoto(photoData);

    this.setState({
      currentPhoto: photo,
      data: weatherData.data,
      fetching: false,
      searchMethod: location.searchMethod,
      photos: photoData
    });
  };

  getCityPhoto;

  render() {
    const weatherData = this.state.data;
    console.log("current state", this.state);
    return (
      <div className={StyledWeatherSearchWrapper}>
        <img src={this.state.currentPhoto} alt="test" />
        <Paper elevation={1} className={StyledWeatherStats}>
          <WeatherSearch
            className={StyledWeatherSearch}
            onFetchWeather={this.onFetchWeather}
            searchMethod={this.state.searchMethod}
          />
          {this.state.fetching ? (
            <Loader />
          ) : (
            weatherData.main && <WeatherStats data={weatherData} />
          )}
        </Paper>
      </div>
    );
  }
}

export default WeatherPage;
