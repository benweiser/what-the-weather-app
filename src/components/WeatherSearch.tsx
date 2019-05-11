import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import { css } from 'emotion';
import SearchOptions from './SearchOptions';
import WeatherSearchInput from './WeatherSearchInput';

export type SearchType = 'city' | 'zip' | 'coords';

export interface WeatherSearchProps {
  className?: string;
  onFetchWeather: (state: WeatherSearchState) => void;
  searchMethod?: SearchType;
}

export interface WeatherSearchState {
  value: string;
  searchMethod: SearchType;
}

const StyledSearchFormDiv = css`
  display: flex;
`;

const WeatherSearch = (props: WeatherSearchProps) => {
  const { className } = props;
  const [state, setState] = useState<WeatherSearchState>({
    searchMethod: 'city',
    value: ''
  });
  const { searchMethod, value } = state;
  return (
    <div className={className}>
      <form
        onSubmit={(e: React.MouseEvent<any>) => {
          e.preventDefault();
          const { onFetchWeather } = props;
          if (onFetchWeather) {
            onFetchWeather(state);
          }
        }}
      >
        <SearchOptions
          onSearchTypeSelect={(type: SearchType) =>
            setState({
              ...state,
              searchMethod: type
            })
          }
          selectedOption={searchMethod as SearchType}
        />
        <div className={StyledSearchFormDiv}>
          <WeatherSearchInput
            onChange={(e: React.FormEvent<HTMLInputElement>) =>
              setState({
                ...state,
                value: e.currentTarget.value
              })
            }
            type={searchMethod}
            value={value}
          />
          <Button
            data-testid="search-button"
            color="primary"
            variant="contained"
            type="submit"
          >
            Get Weather
          </Button>
        </div>
      </form>
    </div>
  );
};

export default WeatherSearch;
