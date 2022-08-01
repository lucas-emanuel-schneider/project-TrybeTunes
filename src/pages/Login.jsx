import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Loading from './Loading';
import { createUser } from '../services/userAPI';

export default class Login extends Component {
    state = {
      name: '',
      loading: false,
    }

   loginBReader = async (event) => {
     event.preventDefault();
     const { name } = this.state;
     this.setState({ loading: true });
     await createUser({ name });
     this.setState({ loading: false }, () => {
       const { history } = this.props;
       history.push('/search');
     });
   }

  loginIChange = ({ target }) => {
    this.setState({
      name: target.value,
    });
  }

  render() {
    const minimumNameLength = 3;
    const { loading, name } = this.state;
    return loading ? <Loading /> : (
      <div data-testid="page-login">
        <form>
          <label htmlFor="login-name-input">
            Name:
            <input
              value={ name }
              data-testid="login-name-input"
              type="text"
              name="name"
              onChange={ this.loginIChange }
            />
          </label>
          <button
            data-testid="login-submit-button"
            type="button"
            disabled={ name.length < minimumNameLength }
            onClick={ this.loginBReader }
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
