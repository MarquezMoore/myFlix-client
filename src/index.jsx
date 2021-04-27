// Modules
import React from 'react';
import ReactDOM from 'react-dom';

// Customer Components
import { MainView } from './components/mainView/mainView';

// React-Bootstrap Components
import Container from 'react-bootstrap/Container';

// Styles 
import './index.scss'; 



class MyFlixApplication extends React.Component {
  render() {
    return (
      <Container fluid className="d-flex flex-column max-vw-100 min-vh-100">
        <MainView className="main-view flex-grow-1 w-100" />
      </Container>
    );
  }
}

const container = document.getElementsByClassName('app-container')[0];

ReactDOM.render(React.createElement(MyFlixApplication), container);