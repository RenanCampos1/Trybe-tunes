import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser } from '../services/userAPI';
import './Profile.css';

export default class Profile extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      userProfile: {},
    };
  }

  componentDidMount() {
    const infoProfile = async () => {
      this.setState({
        loading: true,
      });
      const setUser = await getUser();
      this.setState({
        userProfile: setUser,
        loading: false,
      });
    };
    infoProfile();
  }

  render() {
    const { userProfile: { name, image, description, email }, loading } = this.state;
    return (
      <section>
        <Header />
        { loading ? <Loading /> : (
          <div className="profileCont" data-testid="page-profile">
            <section className="profile">
              <img data-testid="profile-image" src={ image } alt={ name } />
              <h4>Nome</h4>
              <h2>{ name }</h2>
              <h4>E-mail</h4>
              <h2>{ email }</h2>
              <h4>Descrição</h4>
              <h2>{ description }</h2>
            </section>
          </div>
        )}
        <div className="editButton">
          <Link to="/profile/edit">Editar perfil</Link>
        </div>
      </section>
    );
  }
}
