import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';

export default class ProfileEdit extends Component {
  render() {
    const { loading } = this.props;
    return (
      <div data-testid="page-profile-edit">
        <Header loading={ loading } />
      </div>
    );
  }
}

ProfileEdit.propTypes = {
  loading: PropTypes.bool.isRequired,
};
