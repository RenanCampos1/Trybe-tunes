import React, { Component } from 'react';
import PropTypes from 'prop-types';
import getMusics from '../services/musicsAPI';
import Header from '../components/Header';
import Loading from '../components/Loading';
import SongCard from '../components/SongCard';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';

export default class Album extends Component {
  constructor() {
    super();
    this.state = {
      musics: [],
      selection: [],
      loading: false,
    };
  }

  componentDidMount() {
    const getListMusic = async () => {
      await this.AddSelect();
      const { match: { params: { id } } } = this.props;

      const listMusics = await getMusics(id);

      this.setState({
        musics: listMusics,
      });
    };
    getListMusic();
  }

  listSelects = async (e) => {
    const { selection } = this.state;
    const newMusicas = selection.some((e2) => e2.trackName === e.trackName);
    if (newMusicas) {
      this.setState({ loading: true }, async () => {
        await removeSong(e);
        await this.AddSelect();
        this.setState({ loading: false });
      });
    } else {
      this.setState({ loading: true }, async () => {
        await addSong(e);
        await this.AddSelect();
        this.setState({ loading: false });
      });
    }
  };

  AddSelect = async () => {
    const checked = await getFavoriteSongs();
    this.setState(({
      selection: checked,
    }));
  };

  render() {
    const { musics, selection, loading } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        { musics.length > 0
          ? (
            <div>
              <img src={ musics[0].artworkUrl60 } alt={ musics[0].collectionName } />
              <p data-testid="artist-name">{musics[0].artistName}</p>
              <p data-testid="album-name">{musics[0].collectionName}</p>
            </div>)
          : <h1>Musicas não encontrada</h1>}
        <div>
          { loading ? <Loading /> : musics.map((e, index) => (index > 0 && (
            <div key={ e.trackId }>
              <SongCard
                key={ e.trackNumber }
                trackName={ e.trackName }
                previewUrl={ e.previewUrl }
              />
              <label
                htmlFor={ index }
              >
                Favorita
                <input
                  type="checkbox"
                  id={ index }
                  onClick={ async () => {
                    await this.listSelects(e);
                    await this.AddSelect();
                  } }
                  data-testid={ `checkbox-music-${e.trackId}` }
                  defaultChecked={ selection.length > 0 && (
                    selection.some((e2) => e2.trackName === e.trackName)
                  ) }
                />
              </label>
            </div>)))}
        </div>
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
}.isRequired;
