import React from 'react';
import axios from 'axios';

import Carousel from 'react-bootstrap/Carousel';

const SERVER = process.env.REACT_APP_SERVER;

class BestBooks extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      books: []
    }
  }

  /* Done: Make a GET request to your API to fetch all the books from the database  */
  getBooks = async () => {

    try {

      let results = await axios.get(`${SERVER}/book`);
      // console.log(results)

      this.setState({
        books: results.data
      }, console.log(this.state.books))

    } catch (error) {

      console.log('Oh no! An error!:', error.response.data)

    }
  };

  // when the site loads (has everything it needs), the data will be displayed
  componentDidMount() {
    this.getBooks();
  };

  render() {

    /* Done: render all the books in a Carousel */
    let carouselItems = this.state.books.map((book) => (


      <Carousel.Item key={book._id}>
        <img
          className="d-block w-100"
          src="img/reading.jpg"
          alt="Person reading a book"
        />

        <Carousel.Caption>
          <h3>{book.title}</h3>
          <p>{book.author}</p>
          <p>{book.release_date}</p>
          <p>{book.status}</p>
          <p>{book.description}</p>
        </Carousel.Caption>
      </Carousel.Item>

    ))

    return (

      <>
        <h2>Required Reading</h2>

        {this.state.books.length ? (

          <Carousel>
            {carouselItems}
          </Carousel>

        ) : (

          <h3>The Library is Closed :(</h3>

        )}
      </>

    )
  }
}

export default BestBooks;
