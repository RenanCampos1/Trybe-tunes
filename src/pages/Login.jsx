import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Loading from '../components/Loading';
import { createUser } from '../services/userAPI';
import './Login.css';

export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      userInputName: '',
      isSaveButtonDisabled: true,
      saveUserInit: false,
      saveUserEnd: true,
      redirectSearch: false,
    };
  }

  checkUserName = ({ target }) => {
    const { name, type } = target;
    const value = type === 'checkbox' ? target.checked : target.value;
    this.setState({
      [name]: value,
    }, () => {
      const {
        userInputName } = this.state;
      const minAtrr = 3;
      if (
        userInputName.length >= minAtrr) {
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

  handleClick = () => {
    this.setState({
      saveUserInit: true,
    }, async () => {
      const { userInputName } = this.state;
      await createUser({ name: userInputName });
      this.setState({
        saveUserEnd: false,
        redirectSearch: true,
      });
    });
  };

  render() {
    const {
      userInputName,
      isSaveButtonDisabled,
      saveUserInit,
      saveUserEnd,
      redirectSearch } = this.state;
    return (
      <div className="loginCont" data-testid="page-login">
        <label htmlFor="login-name-input">
          <input
            className="inputName"
            type="text"
            data-testid="login-name-input"
            id="login-name-input"
            value={ userInputName }
            name="userInputName"
            onChange={ this.checkUserName }
          />
        </label>
        <button
          type="button"
          disabled={ isSaveButtonDisabled }
          id="loginbutton"
          data-testid="login-submit-button"
          onClick={ this.handleClick }
        >
          Entrar
        </button>
        { saveUserInit && saveUserEnd && <Loading /> }
        { redirectSearch && <Redirect to="/search" /> }
      </div>
    );
  }
}
