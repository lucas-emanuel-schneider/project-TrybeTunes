import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import Loading from './Loading';
import MusicCard from './MusicCard';

export default class Album extends Component {
  state = {
    loading: false,
    albumInfoAndTracks: [],
    artistName: '',
    collectionName: '',
  }

  componentDidMount() {
    this.searchMusics();
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
    const { loading, albumInfoAndTracks, artistName, collectionName } = this.state;
    return loading ? <Loading /> : (
      <div data-testid="page-album">
        <Header />
        <h1 data-testid="album-name">{ collectionName }</h1>
        <h3 data-testid="artist-name">{ artistName }</h3>
        { albumInfoAndTracks.filter((_, index) => index).map((music) => (
          <MusicCard key={ music.trackId } { ...music } />
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
