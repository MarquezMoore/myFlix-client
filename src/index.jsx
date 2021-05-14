// Modules
import React from 'react';
import ReactDOM from 'react-dom';

// Customer Components
import { MainView } from './components/mainView/mainView';

// React-Bootstrap Components
import Container from 'react-bootstrap/Container';

// Styles 
import './index.scss'; 
import 'bootstrap/dist/css/bootstrap.min.css';



class MyFlixApplication extends React.Component {
  render() {
    return (
      <Container fluid className="d-flex flex-column min-vh-100 p-0">
        <MainView className="main-view flex-grow-1 max-vh-100" />
      </Container>
    );
  }
}

const container = document.getElementsByClassName('app-container')[0];

ReactDOM.render(React.createElement(MyFlixApplication), container);