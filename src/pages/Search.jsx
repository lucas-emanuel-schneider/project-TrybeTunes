import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';

export default class Search extends Component {
  render() {
    const { loading } = this.props;
    return (
      <div data-testid="page-search">
        <Header loading={ loading } />
      </div>
    );
  }
}

Search.propTypes = {
  loading: PropTypes.bool.isRequired,
};
