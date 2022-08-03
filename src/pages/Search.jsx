import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from './Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

export default class Search extends Component {
  state = {
    searchValue: '',
    loading: false,
    searchResults: [],
    artist: '',
    buttonClick: false,
  }

  inputChange = ({ target }) => {
    this.setState({
      searchValue: target.value,
    });
  }

  searchReader = async (event) => {
    event.preventDefault();
    const { searchValue } = this.state;
    this.setState({ loading: true });
    const items = await searchAlbumsAPI(searchValue);
    this.setState({ loading: false, artist: searchValue }, () => {
      this.setState({ searchResults: items,
        searchValue: '',
        buttonClick: true });
    });
  }

  render() {
    const minimumInputLength = 2;
    const { searchValue, loading, searchResults, artist, buttonClick } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        {
          loading ? <Loading />
            : (
              <div>
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
                    onClick={ this.searchReader }
                    disabled={ searchValue.length < minimumInputLength }
                  >
                    Pesquisar
                  </button>
                </form>
                { !buttonClick ? null : (
                  <div>
                    { (!searchResults.length) ? <p>Nenhum álbum foi encontrado</p> : (
                      <div>
                        <h1>{ `Resultado de álbuns de: ${artist}` }</h1>
                        { searchResults.map(({
                          artistName,
                          collectionId,
                          collectionName,
                          artworkUrl100,
                          collectionPrice,
                          releaseDate,
                          trackCount,
                        }) => (
                          <div key={ collectionId }>
                            <img src={ artworkUrl100 } alt={ artistName } />
                            <h3>{ artistName }</h3>
                            <p>{ collectionPrice }</p>
                            <p>{ releaseDate }</p>
                            <p>{ trackCount }</p>
                            <Link
                              to={ `/album/${collectionId}` }
                              data-testid={ `link-to-album-${collectionId}` }
                            >
                              { collectionName }
                            </Link>
                          </div>
                        ))}
                      </div>
                    )}

                  </div>
                )}

              </div>
            )
        }

      </div>
    );
  }
}
