import React from 'react';
// import styled, { css } from 'react-emotion';
import styled from 'styled-components/macro';
import API from '../../services/api';
import { loadImage } from '../../utils/image';
import WeatherSearch, {
  WeatherSearchState,
  SearchType
} from '../WeatherSearch';
import WeatherStats from '../WeatherStats';
import Loader from '../Loader';
import Paper from '@material-ui/core/Paper';
import { getRandomFlickrPhoto } from '../../services/api/FlickrService';
import { CurrentWeatherStats } from '../../services/api/WeatherService';

interface WeatherPageState {
  data?: CurrentWeatherStats;
  error?: boolean;
  fetching?: boolean;
  currentPhoto: string;
  searchMethod: SearchType;
  photos?: ReadonlyArray<any>;
}

interface WeatherPageProps {}

/*
const StyledWeatherStats = css`
  padding: 32px;
  max-width: 700px;
  margin: 0 auto;
`;
/*

const StyledWeatherSearchWrapper = styled('div')<{ background: string }>`
  background: url(${props => props.background});
  background-repeat: no-repeat;
  background-size: cover;
  padding: 32px;
  margin: 0 auto;
`;

/*
const StyledWeatherSearch = css`
  margin-bottom: 32px;
`;
*/

export const weatherMap = (
  location: WeatherSearchState
): CurrentWeatherStats => {
  const searchType: { [key: string]: (value: string) => any } = {
    city: (value: string) => API.getWeatherByCity(value),
    // coords: (value: string) => API.getWeatherByCoords(value),
    zip: (value: string) => API.getWeatherByZipCode(value)
  };
  return searchType[location.searchMethod](location.value);
};

class WeatherPage extends React.Component<WeatherPageProps, WeatherPageState> {
  state: WeatherPageState = {
    currentPhoto: '',
    data: undefined,
    error: false,
    fetching: false,
    searchMethod: 'city'
  };

  handleFetchCurrentWeather = async (location: WeatherSearchState) => {
    this.setState({ fetching: true });

    const weatherData = await weatherMap(location);

    if (!weatherData) {
      this.setState({ error: true, fetching: false });
      return null;
    }

    const { lat, lon, locationName } = weatherData;

    const photoData = await API.getFlickrPhotosByCoords(lat, lon, locationName);

    const photo = await loadImage(getRandomFlickrPhoto(photoData));

    this.setState({
      currentPhoto: photo.src,
      data: weatherData,
      error: false,
      fetching: false,
      searchMethod: location.searchMethod,
      photos: photoData
    });
  };

  render() {
    const { data, error, fetching, currentPhoto, searchMethod } = this.state;

    return (
      <div
        css={`
          background: url(${currentPhoto});
          border: 5px solid red;
        `}
      >
        <Paper elevation={1}>
          <WeatherSearch
            //  className={StyledWeatherSearch}
            onFetchWeather={this.handleFetchCurrentWeather}
            searchMethod={searchMethod}
          />
          {fetching ? <Loader /> : data && <WeatherStats data={data} />}
          {error && !fetching && (
            <div data-testid="error-text">An error occured</div>
          )}
        </Paper>
      </div>
    );
  }
}

export default WeatherPage;
