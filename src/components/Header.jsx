import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Loading from './Loading';
import { getUser } from '../services/userAPI';
import './Header.css';

export default class Header extends Component {
  constructor() {
    super();
    this.state = {
      headerInit: false,
      headerEnd: true,
      displayName: false,
      logedName: '',
    };
  }

  componentDidMount() {
    this.setState({
      headerInit: true,
    });
    const userOnly = async () => {
      const userName = await getUser();
      this.setState({
        logedName: userName.name,
        headerEnd: false,
        displayName: true,
      });
    };
    userOnly();
  }

  render() {
    const {
      headerInit,
      headerEnd,
      displayName,
      logedName } = this.state;
    return (
      <header className="headerContainer" data-testid="header-component">
        <div className="cabecalho">
          <img src="https://media-exp1.licdn.com/dms/image/C4E16AQEdCzVDzaIKqg/profile-displaybackgroundimage-shrink_200_800/0/1636508258022?e=2147483647&v=beta&t=XRuxAXzio19Qin1vqwyxlCqzGrGotD9VM7fN-5tXcfw" alt="trybe-tunes" />
          <span className="tunes">Tunes</span>
          { headerInit && headerEnd && <Loading /> }
          <div>
            { displayName && (
              <p data-testid="header-user-name" className="username">{logedName}</p>
            ) }
          </div>
        </div>
        <nav className="linksNav">
          <div>
            <Link className="link" data-testid="link-to-search" to="/search">Search</Link>
          </div>
          <div>
            <Link
              className="link"
              data-testid="link-to-favorites"
              to="/favorites"
            >
              Favorites
            </Link>
          </div>
          <div>
            <Link
              className="link"
              data-testid="link-to-profile"
              to="/profile"
            >
              Profile
            </Link>
          </div>
        </nav>
      </header>
    );
  }
}
