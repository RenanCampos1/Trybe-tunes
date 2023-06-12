import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './SongsCard.css';

export default class SongCard extends Component {
  render() {
    const { trackName,
      previewUrl, artworkUrl100 } = this.props;
    return (
      <div className="card">
        <img src={ artworkUrl100 } alt="capa" />
        <div>
          <p>{trackName}</p>
          <audio data-testid="audio-component" src={ previewUrl } controls>
            <track kind="captions" />
            O seu navegador não suporta o elemento
            <code>audio</code>
          </audio>
        </div>
      </div>
    );
  }
}

SongCard.propTypes = {
  trackName: PropTypes.string,
  previewUrl: PropTypes.string,
}.isRequired;
