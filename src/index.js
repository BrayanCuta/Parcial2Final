import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.css';
import {IntlProvider} from 'react-intl';
import localeEsMessages from "./locales/es.json";
import localeEnMessages from "./locales/en.json";

// Obtener el lenguaje definido en el navegador o el buscador
let language = window.navigator.language || navigator.browserLanguage;

// Definir el idioma de los mensajes a usar en la app i18n
const selectMessages = language.startsWith("en") ? localeEnMessages : localeEsMessages;

ReactDOM.render(

  <IntlProvider locale={language} messages={selectMessages}>
    <App />
  </IntlProvider>,
  document.getElementById('root')
);
