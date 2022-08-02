import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';

export default class Album extends Component {
  render() {
    const { loading } = this.props;
    return (
      <div data-testid="page-album">
        <Header loading={ loading } />
      </div>
    );
  }
}

Album.propTypes = {
  loading: PropTypes.bool.isRequired,
};
