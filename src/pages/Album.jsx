import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import Loading from './Loading';
import MusicCard from './MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

export default class Album extends Component {
  state = {
    loading: false,
    albumInfoAndTracks: [],
    artistName: '',
    collectionName: '',
    getFavoritesResult: [],
  }

  componentDidMount() {
    this.searchMusics();
    this.getFavoriteSongs();
  }

  getFavoriteSongs = async () => {
    this.setState({ loading: true });
    const getFavoritesResult = await getFavoriteSongs();
    this.setState({ loading: false,
      getFavoritesResult });
  }

  searchMusics = async () => {
    this.setState({ loading: true });
    const {
      match: { params: { id } },
    } = this.props;
    const albumInfoAndTracks = await getMusics(id);
    const { artistName, collectionName } = albumInfoAndTracks[0];
    this.setState({
      loading: false,
      albumInfoAndTracks,
      artistName,
      collectionName,
    });
  }

  render() {
    const {
      loading,
      albumInfoAndTracks,
      artistName,
      collectionName,
      getFavoritesResult } = this.state;
    return loading ? <Loading /> : (
      <div data-testid="page-album">
        <Header />
        <h1 data-testid="album-name">{ collectionName }</h1>
        <h3 data-testid="artist-name">{ artistName }</h3>
        { albumInfoAndTracks.filter((_, index) => index).map((music) => (
          <MusicCard
            key={ music.trackId }
            { ...music }
            FavoriteChecked={ getFavoritesResult
              .some(({ trackId }) => trackId === music.trackId) }
          />
        )) }
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
