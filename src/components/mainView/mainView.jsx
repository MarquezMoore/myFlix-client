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
import SearchBar from '../searchBar/searchBar'

// Stlyes
import './mainView.scss'


export class MainView extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      user: null,
      token: null
    }

    this.onLoggedin = this.onLoggedin.bind(this);
    this.onLogOut = this.onLogOut.bind(this);
    this.getMovies = this.getMovies.bind(this);
    this.addToFavorites = this.addToFavorites.bind(this);
    this.removeFromFavorites = this.removeFromFavorites.bind(this);
    this.updateUser = this.updateUser.bind(this);
  }

/*

  Login

*/
  onLoggedin(authData) {
    this.setState({
      user: authData.user,
      token: authData.user.token
    });

    localStorage.setItem('user', JSON.stringify( authData.user));
    localStorage.setItem('token', authData.token);

    this.getMovies(authData.token);
  }
/*

  Logout

*/
  onLogOut() {
    localStorage.clear();
    this.setState({
      user: null,
      token: null
    });
    window.open('/', '_self');
  } 
/*

  Get all movies in db

*/
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
/*

  Get user details
  - This function al be remove. All user specifc request to the api will return the user in obj formate

*/
  getUserDetails() {
    let token = localStorage.getItem('token');
    let user = JSON.parse(localStorage.getItem('user'));

    axios.get(`https://my-fav-flix.herokuapp.com/api/users/${this.state.user.username}`, {
      headers: {Authorization: `Bearer ${token}`}
    })
      .then( u => {
        return u.data;
      })
      .catch( err => {
        console.log(err)
      })
  }
/*

  Add a movie to the user's favorites

*/
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
/*

  Remove movie from user's favorites

*/
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
/*

  update user record

*/
  updateUser( user ) {
    let currentUser = localStorage.getItem('user');
    let token = localStorage.getItem('token');
    console.log(user);
    axios.put(`https://my-fav-flix.herokuapp.com/api/users/${currentUser}`,{
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      birthday: user.birthday
    }, {
      headers: {Authorization: `Bearer ${token}`}
    })
    .then( result => {
      this.setState({
        user: result.data
      })
      console.log(result);
    })
    .catch( err => {
      console.log(err);
    })
  
  }


  // getFavorite(user){

  // }

  

  render() {
    const { movies, user } = this.state;

    return (
      <Router>
        <div className="d-flex flex-grow-1">
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
                <Container fluid className="d-flex flex-column">
                  <Row>
                    <Col className="p-0">
                      <NavBar/>
                    </Col>
                  </Row>
                  
                  <Row className="d-flex flex-md-grow-1">
                    <Col className="col-3 p-0">
                      <SideBar
                      user={JSON.parse(user)} 
                      updateUser={this.updateUser}/>
                    </Col>
                    <Col className="col-9 d-flex flex-column px-4">
                      <SearchBar className="w-75"  />
                      <div className="d-flex flex-wrap wrapper py-4">
                        {
                          movies.map( (m, i) => (
                            <Col xs={4} lg={3} key={i} className="p-2">
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
                <Container fluid className="d-flex flex-column">
                  <Row>
                    <Col className="p-0" >
                      <NavBar user={JSON.parse(user)} onLogOut={this.onLogOut}/>
                    </Col>
                  </Row>
                  
                  <Row className="d-flex flex-md-grow-1">
                    <Col className="col-3 p-0">
                      <SideBar className="" />
                    </Col>
                    <Col className="col-9">
                      <MovieView 
                        className="h-100"
                        movie={movies.find( m => m._id === match.params.movieId )} 
                        onBackClick={() => history.goBack()}
                        addToFavorites={this.addToFavorites}
                        removeFromFavorites={this.removeFromFavorites}
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
                <Container fluid className="d-flex flex-column">
                  <Row>
                    <Col className="p-0">
                      <NavBar user={user} onLogOut={this.onLogOut}/>
                    </Col>
                  </Row>

                  <Row className="d-flex flex-md-grow-1">
                    <Col className="col-3 p-0">
                      <SideBar className="" />
                    </Col>
                    <Col className="col-9">
                      <DirectorView 
                        director={movies.find( m => m.director.name === match.params.directorId).director} 
                        onBackClick={() => history.goBack()} 
                      />
                    </Col>
                  </Row>
                </Container>
              )
            }
          } />
        {/* Genre View Route*/}
          <Route path="/genre/:genreId" render={
            ({ match, history }) => {
              if(!user) return <Redirect to="/" />

              return (
                <Container fluid className="d-flex flex-column">
                  <Row>
                    <Col className="p-0">
                      <NavBar user={user} onLogOut={this.onLogOut} />
                    </Col>
                  </Row>

                  <Row className="d-flex flex-md-grow-1">
                    <Col className="col-3 p-0">
                      <SideBar className="" />
                    </Col>
                    <Col className="col-9">
                      <GenreView 
                        movies={movies.filter( m => m.genre.name === match.params.genreId)} 
                        // onBackClick={() => history.goBack()} 
                      />
                    </Col>
                  </Row>
                </Container>
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
                  user={JSON.parse(user)} 
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


