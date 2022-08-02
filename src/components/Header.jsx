import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from '../pages/Loading';

export default class Header extends Component {
  state = { userState: '',
    loading: false }

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
        <nav>
          <Link data-testid="link-to-search" to="/search">Search</Link>
          <Link data-testid="link-to-favorites" to="/favorites">Favorites</Link>
          <Link data-testid="link-to-profile" to="/profile">Profile</Link>
        </nav>
      </header>
    );
  }
}
