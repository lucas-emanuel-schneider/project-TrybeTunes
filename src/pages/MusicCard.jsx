import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Loading from './Loading';
import { addSong, removeSong } from '../services/favoriteSongsAPI';

export default class MusicCard extends Component {
  state = {
    checkbox: false,
    loading: false,
  }

  // componentDidMount = () => {
  //   const { FavoriteChecked } = this.props;
  //   if (FavoriteChecked) {
  //     this.setState({
  //       checkbox: true,
  //     });
  //   }
  // }

  OnChange = ({ target }) => {
    const { name } = target;
    const value = (target.type === 'checkbox') ? target.checked : target.value;
    this.setState({
      [name]: value,
    }, () => {
      if (value) this.setFavorite();
      else this.removeFavorite();
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
    const { checkbox, loading } = this.state;
    const { trackName, previewUrl, trackId, FavoriteChecked } = this.props;
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
            checked={ checkbox || FavoriteChecked }
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
  FavoriteChecked: PropTypes.bool.isRequired,
};
