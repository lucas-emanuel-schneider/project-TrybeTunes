import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';

export default class Favorites extends Component {
  render() {
    const { loading } = this.props;
    return (
      <div data-testid="page-favorites">
        <Header loading={ loading } />
      </div>
    );
  }
}

Favorites.propTypes = {
  loading: PropTypes.bool.isRequired,
};
