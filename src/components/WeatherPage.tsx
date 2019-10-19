import React, { useState, memo } from 'react';
import 'styled-components/macro';

import API from '../services/api';
import { loadImage } from '../utils/image';
import WeatherSearch, { WeatherSearchState, SearchType } from './WeatherSearch';
import WeatherStats from './WeatherStats';

// import Loader from './Loader';
import Paper from '@material-ui/core/Paper';
import { getRandomFlickrPhoto } from '../services/api/FlickrService';
import { CurrentWeatherStats } from '../services/api/WeatherService';
import Skeleton from './Skeleton';

interface WeatherPageState {
  data?: CurrentWeatherStats;
  isError?: boolean;
  isLoading?: boolean;
  fetching?: boolean;
  currentPhoto: string;
  searchMethod: SearchType;
  photos?: ReadonlyArray<any>;
}

const searchType: { [key: string]: (value: string) => any } = {
  city: (value: string) => API.getWeatherByCity(value),
  // coords: (value: string) => API.getWeatherByCoords(value),
  zip: (value: string) => API.getWeatherByZipCode(value)
};

export const mapSearchTypeToRequest = (
  state: WeatherSearchState
): CurrentWeatherStats => {
  const { searchMethod, value } = state;

  return searchType[searchMethod](value);
};

const WeatherPage = () => {
  const [state, setState] = useState<WeatherPageState>({
    currentPhoto: '',
    data: undefined,
    isError: false,
    isLoading: false,
    searchMethod: 'city'
  });
  const handleFetchCurrentWeather = async (location: WeatherSearchState) => {
    setState({ ...state, isError: false, isLoading: true });
    const weatherData = await mapSearchTypeToRequest(location);

    if (!weatherData) {
      setState({
        ...state,
        data: undefined,
        currentPhoto: '',
        isError: true,
        isLoading: false
      });
      return null;
    }
    const { lat, lon, locationName } = weatherData;

    const photoData = await API.getFlickrPhotosByCoords(lat, lon, locationName);

    const photo = await loadImage(getRandomFlickrPhoto(photoData));

    setState({
      currentPhoto: photo ? photo.src : '',
      data: weatherData,
      isError: false,
      isLoading: false,
      searchMethod: location.searchMethod,
      photos: photoData
    });

    return null;
  };

  const { data, isError, isLoading, currentPhoto, searchMethod } = state;

  return (
    <div
      css={`
        background: url(${currentPhoto});
        background-repeat: no-repeat;
        background-attachment: fixed;
        background-size: cover;
        padding: 80px;
        margin: 0 auto;
      `}
    >
      <Paper
        elevation={1}
        css={`
          padding: 32px;
          max-width: 700px;
          margin: 0 auto;
        `}
      >
        <WeatherSearch
          onFetchWeather={handleFetchCurrentWeather}
          searchMethod={searchMethod}
        />
        <Skeleton isLoading={!!isLoading}>
          {data && <WeatherStats data={data} />}
        </Skeleton>
        {isError && <div data-testid="error-text">An error occured</div>}
      </Paper>
    </div>
  );
};

export default memo(WeatherPage);
