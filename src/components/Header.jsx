import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getUser } from '../services/userAPI';
import Loading from '../pages/Loading';

export default class Header extends Component {
  state = { userState: '' }

  componentDidMount() {
    this.gettingUser();
  }

  gettingUser = () => {
    this.setState({ loading: true }, async () => {
      const { name } = await getUser();
      this.setState({ loading: false, userState: name });
    });
  }

  render() {
    const { loading, userState } = this.state;
    return loading ? <Loading /> : (
      <header data-testid="header-component">
        <h1 data-testid="header-user-name">{ userState }</h1>
      </header>
    );
  }
}

Header.propTypes = {
  loading: PropTypes.bool.isRequired,
};
