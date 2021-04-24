// Modules
import React from 'react';
import ReactDOM from 'react-dom';
import { MainView } from './components/mainView/mainView';

// Styles
import './index.scss'; 
import 'bootstrap/dist/css/bootstrap.min.css';


class MyFlixApplication extends React.Component {
  render() {
    return (
      <MainView />
    );
  }
}

const container = document.getElementsByClassName('app-container')[0];

ReactDOM.render(React.createElement(MyFlixApplication), container);