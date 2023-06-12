import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser, updateUser } from '../services/userAPI';

export default class ProfileEdit extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      isDisabled: true,
      name: '',
      email: '',
      description: '',
      image: '',
      sendToProfilePage: false,
    };
  }

  componentDidMount() {
    const infoProfile = async () => {
      this.setState({
        loading: true,
      });
      const setUser = await getUser();
      this.setState({
        name: setUser.name,
        email: setUser.email,
        description: setUser.description,
        image: setUser.image,
        loading: false,
      }, this.validation);
    };
    infoProfile();
  }

  validation = () => {
    const {
      name, email, description, image } = this.state;
    const minAtrr = 3;
    if (
      name.length > minAtrr
      && email.length > minAtrr
      && description.length > minAtrr
      && image.length > minAtrr) {
      this.setState({
        isDisabled: false,
      });
    } else {
      this.setState({
        isDisabled: true,
      });
    }
  };

  newDataInfo = ({ target }) => {
    this.setState({
      [target.name]: target.value,
    }, this.validation);
  };

  handleSave = async () => {
    this.setState({
      loading: true,
    }, async () => {
      const { name, image, description, email } = this.state;
      await updateUser({ name, email, description, image });
      this.setState({
        loading: false,
        sendToProfilePage: true,
      });
    });
  };

  render() {
    const {
      name,
      description,
      email,
      image,
      loading,
      isDisabled,
      sendToProfilePage } = this.state;
    return (
      <div data-testid="page-profile-edit">
        <Header />
        <div>
          { loading ? <Loading /> : (
            <form>
              <div>
                <img href={ image } alt={ name } />
                <input
                  data-testid="edit-input-image"
                  name="image"
                  type="text"
                  value={ image }
                  onChange={ this.newDataInfo }
                />
              </div>
              <div>
                <h2>Nome</h2>
                <h3>Fique à vontade para usar seu nome social</h3>
                <input
                  data-testid="edit-input-name"
                  name="name"
                  value={ name }
                  type="text"
                  onChange={ this.newDataInfo }
                />
              </div>
              <div>
                <h2>E-Mail</h2>
                <h3>Escolha um e-mail queconsulte diariamente</h3>
                <input
                  data-testid="edit-input-email"
                  name="email"
                  value={ email }
                  type="text"
                  onChange={ this.newDataInfo }
                />
              </div>
              <div>
                <h2>Descrição</h2>
                <h3>Sobre mim</h3>
                <textarea
                  data-testid="edit-input-description"
                  name="description"
                  value={ description }
                  onChange={ this.newDataInfo }
                />
              </div>
              <button
                type="button"
                data-testid="edit-button-save"
                onClick={ this.handleSave }
                disabled={ isDisabled }
              >
                Salvar
              </button>
            </form>
          )}
        </div>
        { sendToProfilePage && <Redirect to="/profile" />}
      </div>
    );
  }
}
