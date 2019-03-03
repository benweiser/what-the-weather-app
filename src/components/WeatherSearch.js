import { PropTypes } from 'prop-types';
import React from 'react';
import Button from '@material-ui/core/Button';
import { css } from 'emotion';
import SearchOptions from './SearchOptions';
import WeatherSearchInput from './WeatherSearchInput';

const StyledSearchFormDiv = css`
  display: flex;
`;

class WeatherSearch extends React.Component {
  state = {
    searchMethod: 'city',
    value: ''
  };

  handleChange = e => {
    e.preventDefault();
    this.setState({ value: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    if (this.props.onFetchWeather) {
      this.props.onFetchWeather(this.state);
    }
  };

  onSearchTypeSelect = type => {
    this.setState({ searchMethod: type });
  };

  render() {
    const { searchMethod, value } = this.state;
    return (
      <div className={this.props.className}>
        <form onSubmit={this.handleSubmit}>
          <SearchOptions
            onSearchTypeSelect={this.onSearchTypeSelect}
            selectedOption={this.state.searchMethod}
          />
          <div className={StyledSearchFormDiv}>
            <WeatherSearchInput
              onChange={this.handleChange}
              type={searchMethod}
              value={value}
            />
            <Button color="primary" variant="contained" type="submit">
              Get Weather
            </Button>
          </div>
        </form>
      </div>
    );
  }
}

WeatherSearch.propTypes = {
  onFetchWeather: PropTypes.func.isRequired
};

export default WeatherSearch;
