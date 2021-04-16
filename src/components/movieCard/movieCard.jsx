import React from 'react';

export class MovieCard extends React.Component {

  // constructor() {

  // }

  render() {
    const { movieData } = this.props;
    return <div className="movie-card"> { movieData.Title } </div>;
  }

}