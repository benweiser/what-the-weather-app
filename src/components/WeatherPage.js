import React from "react";
import styled, { css } from "react-emotion";
import API from "../services/api";
import { loadImage } from "../utils/image";
import WeatherSearch from "./WeatherSearch";
import WeatherStats from "./WeatherStats";
import Loader from "./Loader";
import Paper from "@material-ui/core/Paper";
import { getRandomFlickrPhoto } from "../services/api/FlickrService";

function loadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.addEventListener("load", () => resolve(img));
    img.addEventListener("error", err => reject(err));
    img.src = src;
    img.removeEventListener("load", () => resolve(img));
    img.removeEventListener("error", err => reject(err));
  });
}

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

const defaultState = {
  currentPhoto: "",
  data: {},
  error: false,
  fetching: false
};
class WeatherPage extends React.Component {
  state = {
    data: {},
    error: false,
    fetching: false
  };

  handleFetchCurrentWeather = async location => {
    this.setState({ fetching: true });

    const weatherData = await weatherMap(location);

    if (!weatherData) {
      this.setState({ error: true, fetching: false });
      return;
    }

    const {
      data: { coord }
    } = weatherData;
    const photoData = await API.getFlickrPhotosByCoords(
      coord.lat,
      coord.lon,
      weatherData.data.name
    );

    const photo = await loadImage(getRandomFlickrPhoto(photoData));

    this.setState({
      currentPhoto: photo.src,
      data: weatherData.data,
      error: false,
      fetching: false,
      searchMethod: location.searchMethod,
      photos: photoData
    });
  };

  render() {
    const { data, error, fetching, currentPhoto, searchMethod } = this.state;

    return (
      <StyledWeatherSearchWrapper background={currentPhoto}>
        <Paper elevation={1} className={StyledWeatherStats}>
          <WeatherSearch
            className={StyledWeatherSearch}
            onFetchWeather={this.handleFetchCurrentWeather}
            searchMethod={searchMethod}
          />
          {fetching ? <Loader /> : data.main && <WeatherStats data={data} />}
          {error && !fetching && (
            <div data-testid="error-text">An error occured</div>
          )}
        </Paper>
      </StyledWeatherSearchWrapper>
    );
  }
}

export default WeatherPage;
