import React, { useState, Suspense } from 'react';
import styled, { css } from 'react-emotion';
import API from '../services/api';
import { loadImage } from '../utils/image';
import WeatherSearch, { WeatherSearchState, SearchType } from './WeatherSearch';
import WeatherStats from './WeatherStats';
import Loader from './Loader';
import Paper from '@material-ui/core/Paper';
import { getRandomFlickrPhoto } from '../services/api/FlickrService';
import { CurrentWeatherStats } from '../services/api/WeatherService';

interface WeatherPageState {
  data?: CurrentWeatherStats;
  error?: boolean;
  fetching?: boolean;
  currentPhoto: string;
  searchMethod: SearchType;
  photos?: ReadonlyArray<any>;
}

const StyledWeatherStats = css`
  padding: 32px;
  max-width: 700px;
  margin: 0 auto;
`;

const StyledWeatherSearchWrapper = styled('div')<{ background: string }>`
  background: url(${props => props.background});
  background-repeat: no-repeat;
  background-size: cover;
  padding: 32px;
  margin: 0 auto;
`;

const StyledWeatherSearch = css`
  margin-bottom: 32px;
`;

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

const WeatherPage = () => {
  const [state, setState] = useState<WeatherPageState>({
    currentPhoto: '',
    data: undefined,
    error: false,
    searchMethod: 'city'
  });
  const handleFetchCurrentWeather = async (location: WeatherSearchState) => {
    const weatherData = await weatherMap(location);

    if (!weatherData) {
      setState({ ...state, data: undefined, currentPhoto: '', error: true });
      return null;
    }

    const { lat, lon, locationName } = weatherData;

    const photoData = await API.getFlickrPhotosByCoords(lat, lon, locationName);

    const photo = await loadImage(getRandomFlickrPhoto(photoData));

    setState({
      currentPhoto: photo.src,
      data: weatherData,
      error: false,
      searchMethod: location.searchMethod,
      photos: photoData
    });
  };

  const { data, error, currentPhoto, searchMethod } = state;

  return (
    <StyledWeatherSearchWrapper background={currentPhoto}>
      <Paper elevation={1} className={StyledWeatherStats}>
        <WeatherSearch
          className={StyledWeatherSearch}
          onFetchWeather={handleFetchCurrentWeather}
          searchMethod={searchMethod}
        />
        <Suspense fallback={<Loader />}>
          {data && <WeatherStats data={data} />}
        </Suspense>
        {error && <div data-testid="error-text">An error occured</div>}
      </Paper>
    </StyledWeatherSearchWrapper>
  );
};

export default WeatherPage;
