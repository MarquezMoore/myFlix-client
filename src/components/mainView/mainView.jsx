// Modules
import React from 'react'
import axios from 'axios'

// React-router-DOM components
import { BrowserRouter as Router, Route, Redirect , Link } from 'react-router-dom'; 

// React-Bootstrap Components
import { Row, Col, Container, Form } from 'react-bootstrap'

// Custom Components
import { MovieList } from '../movieList/movieList'
import { MovieView } from '../movieView/movieView'
import { LoginView } from '../loginView/loginView'
import { RegistrationView } from '../registrationView/registrationView'
import DirectorView from '../directorView/directorView'
import GenreView from '../genreView/genreView'
import NavBar from '../navBar/navBar'
import ProfileView  from '../profileView/profileView'
import SideBar from '../sideBar/sideBar'

// Stlyes
import './mainView.scss'


export class MainView extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      user: null,
      loading: false
    }

    this.onLoggedin = this.onLoggedin.bind(this);
    this.onLogOut = this.onLogOut.bind(this);
    this.getMovies = this.getMovies.bind(this);
    this.addToFavorites = this.addToFavorites.bind(this);
    this.removeFromFavorites = this.removeFromFavorites.bind(this);
  }
// Login 
  onLoggedin(authData) {
    this.setState({
      user: authData.user.username
    });

    localStorage.setItem('user', authData.user.username);
    localStorage.setItem('token', authData.token);

    this.getMovies(authData.token);
  }
// Get all movies
  getMovies(token){
    axios.get('https://my-fav-flix.herokuapp.com/api/movies', {
      headers: {Authorization: `Bearer ${token}`}
    })
    .then( result => {
      this.setState({
        movies: result.data
      })
    })
    .catch( err => {
      console.log(err); 
    })
  }
// Get User Details
  getUserDetails() {
    let token = localStorage.getItem('token');
    let user = localStorage.getItem('user');

    axios.get(`https://my-fav-flix.herokuapp.com/api/users/${user}`, {
      headers: {Authorization: `Bearer ${token}`}
    })
      .then( u => {
        return u.data;
      })
      .catch( err => {
        console.log(err)
      })
  }
// Log out
  onLogOut() {
    localStorage.clear();
    this.setState({
      user: null
    });
    window.open('/', '_self');
  } 
// Add movie to user favorites
  addToFavorites(movie){
    let accessToken = localStorage.getItem('token');
    let user = localStorage.getItem('user');

    axios.put(`https://my-fav-flix.herokuapp.com/api/users/${user}/${movie._id}`, {}, {
      headers: {Authorization: `Bearer ${accessToken}`}
    })
      .then( user => {
        console.log(user);
      })
      .catch( err => {
        console.log(err.response);
      })
  }
// Remove movies from user favorites
  removeFromFavorites(movie){
    let accessToken = localStorage.getItem('token');
    let user = localStorage.getItem('user');

    axios.delete(`https://my-fav-flix.herokuapp.com/api/users/${user}/${movie._id}`, {
      headers: {Authorization: `Bearer ${accessToken}`}
    })
      .then( user => {
        console.log(user);
      })
      .catch( err => {
        console.log(err.response);
      })
  }

  // getFavorite(user){

  // }

  

  render() {
    const { movies, user } = this.state;

    return (
      <Router>
        <div className="min-vh-100">
        {/* The path prop in the Route component below defines the path the the particular route will match and the render prop define the component to render when matched*/}
        
        {/* Main View Route */}
          <Route exact path="/" render={
            () => {
              if(!user) return (
                <Container fluid className="p-0">
                  <Col className="login-view d-flex min-vh-100 justify-content-center align-items-center m-0" >
                    <LoginView onLoggedIn={ user => {this.onLoggedin(user)} } />
                  </Col>
                </Container>
              );


              return (
                <Container fluid className="h-100">
                  <Row>
                    <Col className="p-0">
                      <NavBar/>
                    </Col>
                  </Row>
                  
                  <Row className="d-flex">
                    <Col className="col-3 p-0">
                      <SideBar className="" user={localStorage.getItem('user')}/>
                    </Col>
                    <Col className="d-flex flex-column p-4">
                      <input className="movie-search w-75 align-self-center" placeholder="Search"/>
                      <div className="d-flex flex-wrap wrapper py-4">
                        {
                          movies.map( (m, i) => (
                            <Col xs={6} lg={3} key={i} className="p-2">
                              <MovieList key={m._id} movie={m} />
                            </Col>
                          ))
                        }
                      </div>
                    </Col>
                  </Row>
                </Container>
              );
              
            }
          } />

        {/* Registration View Route */}
          <Route path="/register" render={ () => {
            // If user is logged in already redirect to login view 
            if(user) return <Redirect to="/" />

            return(
              <Col className="reg-view min-vh-100 d-flex justify-content-center align-items-center m-0">
                <RegistrationView />
              </Col>
            )
          }}/>

    {/* Movie View route */}
          <Route path="/movie/:movieId" render={
            ({ match, history }) => {
              if(!user) return <Redirect to="/" />

              return (
                <Container fluid className="p-0 h-100">
                  <Row>
                    <Col >
                      <NavBar user={user} onLogOut={this.onLogOut}/>
                    </Col>
                  </Row>
                  
                  <Row>
                    <Col className="col-3 p-0">
                      <SideBar className="" />
                    </Col>
                    <Col>
                      <MovieView 
                        className="h-100"
                        movie={movies.find( m => m._id === match.params.movieId )} 
                        onBackClick={() => history.goBack()}
                        addToFavorites={this.addToFavorites}
                        removeFromFavorites={this.removeFromFavorites}
                        user={localStorage.getItem('user')}
                      />
                    </Col>
                  </Row>
                </Container>
              )
            }
          } />
          
        {/* DirectorView Route */}
          <Route path="/director/:directorId" render={
            ({ match, history }) => {
              if(!user) return <Redirect to="/" />
          
              return (
                <Col className="p-o">
                  <NavBar 
                    user={user} 
                    onLogOut={this.onLogOut}
                  />
                  <DirectorView 
                    director={movies.find( m => m.director.name === match.params.directorId).director} 
                    onBackClick={() => history.goBack()} 
                  />
                </Col>
              )
            }
          } />
        {/* Genre View Route*/}
          <Route path="/genre/:genreId" render={
            ({ match, history }) => {
              if(!user) return <Redirect to="/" />

              return (
                <Col className="p-0">
                  <NavBar 
                    user={user} 
                    onLogOut={this.onLogOut}
                  />
                  <GenreView 
                    movies={movies.filter( m => m.genre.name === match.params.genreId)} 
                    onBackClick={() => history.goBack()} 
                  />
                </Col>
              )
            }
          } />
        {/* Profile View */}
        <Route path="/profile" render={
          ({ match, history }) => {
            if(!user) return <Redirect to="/" />

            return (
              <Col className="p-0">
                <NavBar 
                  user={user} 
                  onLogOut={this.onLogOut}
                />
                <ProfileView 
                  user={localStorage.getItem('user')} 
                  token={localStorage.getItem('token')} 
                  onBackClick={() => history.goBack()} 
                  onLogOut={this.onLogOut}
                />
              </Col>
            )
          }
        } />
        </div>
      </Router>
    );
  };


  componentDidMount() {
    // Retrive the JWT from the applications localStorage
    let accessToken = localStorage.getItem('token');
    // The there is a token in the apps localStorage update the user state to the user in stored in the localStorage
    if(accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user')
      });
      // Display movies
      this.getMovies(accessToken);
    }
  }
}


