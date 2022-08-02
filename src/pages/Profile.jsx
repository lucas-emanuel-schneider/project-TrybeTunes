import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';

export default class Profile extends Component {
  render() {
    const { loading } = this.props;
    return (
      <div data-testid="page-profile">
        <Header loading={ loading } />
      </div>
    );
  }
}

Profile.propTypes = {
  loading: PropTypes.bool.isRequired,
};
