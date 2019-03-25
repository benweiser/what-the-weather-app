import React from 'react';
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

class WeatherSearch extends React.Component<
  WeatherSearchProps,
  WeatherSearchState
> {
  state: WeatherSearchState = {
    searchMethod: 'city',
    value: ''
  };

  handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    this.setState({ value: e.currentTarget.value });
  };

  handleSubmit = (e: React.MouseEvent<any>) => {
    e.preventDefault();
    const { onFetchWeather } = this.props;
    if (onFetchWeather) {
      onFetchWeather(this.state);
    }
  };

  onSearchTypeSelect = (type: SearchType) => {
    this.setState({ searchMethod: type });
  };

  render() {
    const { className } = this.props;
    const { searchMethod, value } = this.state;
    return (
      <div className={className}>
        <form onSubmit={this.handleSubmit}>
          <SearchOptions
            onSearchTypeSelect={this.onSearchTypeSelect}
            selectedOption={searchMethod}
          />
          <div className={StyledSearchFormDiv}>
            <WeatherSearchInput
              onChange={this.handleChange}
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
  }
}

export default WeatherSearch;
