import React, { Component } from 'react';
import Header from '../components/Header';

export default class Search extends Component {
  state = {
    searchValue: '',
  }

  inputChange = ({ target }) => {
    this.setState({
      searchValue: target.value,
    });
  }

  render() {
    const minimumInputLength = 2;
    const { searchValue } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <form>
          <input
            data-testid="search-artist-input"
            type="text"
            value={ searchValue }
            onChange={ this.inputChange }
          />
          <button
            type="submit"
            data-testid="search-artist-button"
            disabled={ searchValue.length < minimumInputLength }
          >
            Pesquisar
          </button>
        </form>
      </div>
    );
  }
}
