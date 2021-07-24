// Modules
import React, { useEffect } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'

// Actions
import { setUser, setMovies, movieFilter} from '../../actions/actions'

// React-router-DOM components
import { BrowserRouter as Router, Route, Redirect , Link } from 'react-router-dom'; 

// React-Bootstrap Components
import { Row, Col, Container, Form } from 'react-bootstrap'

// Custom Components
import MovieList from '../movieList/movieList'
import MovieView from '../movieView/movieView'
import { LoginView } from '../loginView/loginView'
import { RegistrationView } from '../registrationView/registrationView'
import DirectorView from '../directorView/directorView'
import GenreView from '../genreView/genreView'
import NavBar from '../navBar/navBar'
import ProfileView  from '../profileView/profileView'
import SideBar from '../sideBar/sideBar'

// Stlyes
import './mainView.scss'


const MainView = ({ user, movies, setUser, setMovies, movieFilter }) => {

/*

  Login

*/
  const onLoggedin = authData => {
    setUser({
      data: authData.user,
      token: authData.token
    }, 'login');
    // LocalStorage will be used as a to retrive current user if needed
    localStorage.setItem('user', JSON.stringify( authData.user));
    localStorage.setItem('token', authData.token);
    
    getMovies(authData.token);
  }
/*

  Get user most recent data from DB

*/
  const getUser = (token, user) => {
    axios.get(`https://my-fav-flix.herokuapp.com/api/users/${user.username}`, {
      headers: {Authorization: `Bearer ${token}`}
    })
    .then( user => {
      setUser({
        data: user.data,
        token: token
      }, 'refresh');
    })
    .catch( err => {
      console.log(err);
    })
  }
/*

  Get all movies in DB

*/
  const getMovies = token => {
    axios.get('https://my-fav-flix.herokuapp.com/api/movies', {
      headers: {Authorization: `Bearer ${token}`}
    })
    .then( result => {
      setMovies(result.data);
    })
    .catch( err => {
      console.log(err); 
    })
  }

  useEffect(() => {
    // Retrive the JWT from the applications localStorage
    let token = localStorage.getItem('token');
    let user = localStorage.getItem('user');
    // The there is a token in the apps localStorage update the user state to the user in stored in the localStorage
    if(token !== null) {
      getUser(token, JSON.parse(user));
      // Display movies
      getMovies(token);
    }
  }, []);

  return(
    <Router>
      {/* Start of Route Wrapper */}
      <div className="d-flex flex-grow-1">
  {/* Start of MainView Route */}
        <Route exact path="/" render={
          () => {
            if( user.token === '' ) return (
              <Container fluid className="p-0">
                <Col className="login-view d-flex min-vh-100 justify-content-center align-items-center m-0" >
                  <LoginView onLoggedIn={ user => {onLoggedin(user)} } />
                </Col>
              </Container>
            );

            return (
              <Container fluid className="d-flex flex-column">
                <Row>
                  <Col className="p-0">
                    <NavBar />
                  </Col>
                </Row>
                
                <Row className="d-flex flex-md-grow-1">
                  <Col className="col-3 p-0">
                    <SideBar />
                  </Col>
                  <Col className="m-0 col-9 d-flex flex-column p-4">
                    <MovieList movies={movies} />
                  </Col>
                </Row>
              </Container>
            );
          }
        } />
  {/* End of MovieList route */}

  {/* Start of Registration View Route */}
        <Route path="/register" render={ () => {
          // If user is logged in already redirect to login view 
          if( user.token !== '' ) return <Redirect to="/" />

          return(
            <Col className="reg-view min-vh-100 d-flex justify-content-center align-items-center m-0">
              <RegistrationView />
            </Col>
          )
        }}/>
  {/* End of Registration View Route */}

  {/* Start of Movie View route */}
        <Route path="/movie/:movieId" render={
          ({ match, history }) => {
            if( user.token === '' ) return <Redirect to="/" />

            return (
              <Container fluid className="d-flex flex-column">
                <Row>
                  <Col className="p-0" >
                    <NavBar />
                  </Col>
                </Row>
                
                <Row className="d-flex flex-md-grow-1">
                  <Col className="col-3 p-0">
                    <SideBar />
                  </Col>
                  <Col className="col-9 p-0">
                    <MovieView 
                      className="h-100"
                      movie={movies.find( m => m._id === match.params.movieId )} 
                      onBackClick={() => history.goBack()}
                    />
                  </Col>
                </Row>
              </Container>
            )
          }
        } />
  {/* End of Movie View route */}
        
  {/* Start of DirectorView Route */}
        <Route path="/director/:directorId" render={
          ({ match, history }) => {
            if( user.token === '' ) return <Redirect to="/" />
        
            return (
              <Container fluid className="d-flex flex-column">
                <Row>
                  <Col className="p-0">
                    <NavBar />
                  </Col>
                </Row>

                <Row className="d-flex flex-md-grow-1">
                  <Col className="col-3 p-0">
                    <SideBar />
                  </Col>
                  <Col className="col-9 p-0">
                    <DirectorView 
                      director={movies.find( m => m.director.name === match.params.directorId).director} 
                      movies={movies.filter( m => m.director.name === match.params.directorId)} 
                      onBackClick={() => history.goBack()} 
                    />
                  </Col>
                </Row>
              </Container>
            )
          }
        } />
  {/* End of DirectorView Route */} 

  {/* Start of Genre View Route*/}
        <Route path="/genre/:genreId" render={
          ({ match, history }) => {
            if( user.token === '' ) return <Redirect to="/" />

            return (
              <Container fluid className="d-flex flex-column">
                <Row>
                  <Col className="p-0">
                    <NavBar />
                  </Col>
                </Row>

                <Row className="d-flex flex-md-grow-1">
                  <Col className="col-3 p-0">
                    <SideBar />
                  </Col>
                  <Col className="col-9 p-0">
                    <GenreView 
                      movies={movies.filter( m => m.genre.name === match.params.genreId)} 
                      onBackClick={() => history.goBack()} 
                    />
                  </Col>
                </Row>
              </Container>
            )
          }
        } />
  {/* End of Genre View Route*/}
  
  {/* Start of Profile View */}
      <Route path="/profile" render={
        ({ history }) => {
          if( user.token === '' ) return <Redirect to="/" />

          return (
            <Container fluid className="d-flex flex-column">
              <Row>
                  <Col className="p-0">
                    <NavBar />
                  </Col>
                </Row>
              <Row className="d-flex flex-md-grow-1">
                <Col className="col-3 p-0">
                    <SideBar />
                </Col>
                <Col className="col-9 p-0">
                  <ProfileView  
                    token={localStorage.getItem('token')} 
                    onBackClick={() => history.goBack()} 
                  />
                </Col>
              </Row>
            </Container>
          )
        }
      } />
  {/* End of Start of Profile View */}
      </div>
      {/* End of wrapper */}
    </Router>
  )
}
/*
  - The mapStateToProps function below specifies what data from the global state will need by the respective component as props (this function is define by the author)
  - The mapDispatcherToProps is a object that will take the actions that will be passed to the respective components as props
    - It is important to note the the action being passed in this object will be access from the respective component via "this.props.setUser". This is not the same as the action passed via the import as the actions passed in this case will be wrapper in the dispatch function
*/

let mapStateToProps = state => {
  const { user, movies } = state;
  return {
    user,
    movies
  }
  
}

export default connect(mapStateToProps, { setUser, setMovies, movieFilter })(MainView);


