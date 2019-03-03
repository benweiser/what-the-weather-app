import React from "react";
import styled, { css } from "react-emotion";
import API from "../services/api";
import WeatherSearch from "./WeatherSearch";
import WeatherStats from "./WeatherStats";
import Loader from "./Loader";
import Paper from "@material-ui/core/Paper";
import { getRandomFlickrPhoto } from "../services/api/FlickrService";

const StyledWeatherStats = css`
  padding: 32px;
  max-width: 700px;
  margin: 0 auto;
`;

const StyledWeatherSearchWrapper = styled("div")`
  background: url(${props => props.background});
  background-repeat: no-repeat;
  background-size: cover;
  padding: 32px;
  margin: 0 auto;
`;

const StyledWeatherSearch = css`
  margin-bottom: 32px;
`;

export const weatherMap = location => {
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

    const {
      data: { coord }
    } = weatherData;
    const photoData = await API.getFlickrPhotosByCoords(
      coord.lat,
      coord.lon,
      weatherData.data.name
    );

    this.setState({
      currentPhoto: getRandomFlickrPhoto(photoData),
      data: weatherData.data,
      fetching: false,
      searchMethod: location.searchMethod,
      photos: photoData
    });
  };

  render() {
    const { data, currentPhoto, searchMethod } = this.state;

    if (!data) {
      return null;
    }

    return (
      <StyledWeatherSearchWrapper background={currentPhoto}>
        <Paper elevation={1} className={StyledWeatherStats}>
          <WeatherSearch
            className={StyledWeatherSearch}
            onFetchWeather={this.onFetchWeather}
            searchMethod={searchMethod}
          />
          {this.state.fetching ? (
            <Loader />
          ) : (
            data.main && <WeatherStats data={data} />
          )}
        </Paper>
      </StyledWeatherSearchWrapper>
    );
  }
}

export default WeatherPage;
