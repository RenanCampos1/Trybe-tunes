import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import './Search.css';

export default class Search extends Component {
  constructor() {
    super();
    this.state = {
      userInputArtist: '',
      isSaveButtonDisabled: true,
      loading: false,
      result: [],
      copyname: '',
    };
  }

  checkUserName = ({ target }) => {
    const { name, type } = target;
    const value = type === 'checkbox' ? target.checked : target.value;
    this.setState({
      [name]: value,
    }, () => {
      const {
        userInputArtist } = this.state;
      const minAtrr = 2;
      if (
        userInputArtist.length >= minAtrr) {
        this.setState({
          isSaveButtonDisabled: false,
        });
      } else {
        this.setState({
          isSaveButtonDisabled: true,
        });
      }
    });
  };

  handleClick = async () => {
    const { userInputArtist } = this.state;
    const copyUserInputName = userInputArtist;
    this.setState({
      userInputArtist: '',
      loading: true }, async () => {
      const searchUser = await searchAlbumsAPI(userInputArtist);
      this.setState({
        loading: false,
        copyname: copyUserInputName,
        result: searchUser,
      });
    });
  };

  render() {
    const {
      userInputArtist,
      isSaveButtonDisabled,
      loading,
      copyname,
      result } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        { loading === true ? (
          <Loading />
        ) : (
          <div className="search">
            <label htmlFor="search-artist-input">
              <input
                className="inputSearch"
                type="text"
                data-testid="search-artist-input"
                value={ userInputArtist }
                name="userInputArtist"
                onChange={ this.checkUserName }
              />
            </label>
            <button
              className="buttonSearch"
              type="button"
              disabled={ isSaveButtonDisabled }
              data-testid="search-artist-button"
              onClick={ this.handleClick }
            >
              Pesquisar
            </button>
          </div>
        ) }
        <div>
          { result.length > 0 ? (
            <div className="cardContainer">
              <p className="results">{`Resultado de álbuns de: ${copyname}`}</p>
              {
                result.map((element, index) => (
                  <div className="cards" key={ `${element.artistId}${index}` }>
                    <img src={ element.artworkUrl100 } alt={ element.artistName } />
                    <p>{`Álbum ${element.trackCount} ${element.collectionName}`}</p>
                    <p>{`Artista ${element.artistName}`}</p>
                    <Link
                      data-testid={ `link-to-album-${element.collectionId}` }
                      to={ `/album/${element.collectionId}` }
                    >
                      Album
                    </Link>
                  </div>
                ))
              }
            </div>)
            : (
              <p className="notFound">Nenhum álbum foi encontrado</p>)}
        </div>
      </div>
    );
  }
}
