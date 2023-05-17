import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Loading from './Loading';
import { addSong, removeSong, getFavoriteSongs } from '../services/favoriteSongsAPI';

export default class MusicCard extends Component {
  state = {
    checkbox: false,
    loading: false,
    getFavoritesResult: [],
  }

  componentDidMount = async () => {
    this.setState({ loading: true });
    const getFavoritesResult = await getFavoriteSongs();
    this.setState({ loading: false,
      getFavoritesResult });
  }

  OnChange = ({ target }) => {
    const { name } = target;
    const value = (target.type === 'checkbox') ? target.checked : target.value;
    this.setState({
      [name]: value,
    }, async () => {
      if (value) await this.setFavorite();
      else await this.removeFavorite();
      this.setState({ getFavoritesResult: await getFavoriteSongs() });
    });
  }

  setFavorite = async () => {
    this.setState({ loading: true }, async () => {
      await addSong({ ...this.props });
      this.setState({ loading: false });
    });
  }

  removeFavorite = async () => {
    this.setState({ loading: true }, async () => {
      await removeSong({ ...this.props });
      this.setState({ loading: false });
    });
  }

  render() {
    const { loading, getFavoritesResult, checkbox } = this.state;
    const { trackName, previewUrl, trackId } = this.props;
    const favoriteChecked = getFavoritesResult
      .some((music) => music.trackId === trackId);
    return loading ? (<Loading />) : (
      <div>
        <h1>{ trackName }</h1>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          {' '}
          <code>audio</code>
          .
        </audio>
        <label htmlFor="checkbox">
          Favorita
          <input
            type="checkbox"
            data-testid={ `checkbox-music-${trackId}` }
            name="checkbox"
            onChange={ this.OnChange }
            checked={ checkbox || favoriteChecked }
          />
        </label>
      </div>
    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
};
