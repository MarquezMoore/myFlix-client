// Modules
import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { devToolsEnhancer } from 'redux-devtools-extension'

// Custom Modules
import appReducers from './reducers/reducers'

// Customer Components
import { MainView } from './components/mainView/mainView'

// React-Bootstrap Components
import Container from 'react-bootstrap/Container'

// Styles
import 'bootstrap/dist/css/bootstrap.min.css'
/*
  The line below initiates the store for the application.
    - appReducer of the reducers that will define the state base of actions
*/ 
const store = createStore(appReducers, devToolsEnhancer());


class MyFlixApplication extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Container fluid className="d-flex flex-column min-vh-100 p-0">
          <MainView className="main-view" />
        </Container>
      </Provider>
    );
  }
}

/*
  Find the root element of the application (in the root file) 
    - This file will be exposed to the root file via the script tag
*/
// const container = document.getElementsByClassName('root')[0];
const container = document.querySelector('.root');
/*
  The line below tells react to render the application in the root element from above
*/
ReactDOM.render(React.createElement(MyFlixApplication), container);