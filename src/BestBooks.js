import React from 'react';
import axios from 'axios';

import BookFormModal from './BookFormModal';

import { Carousel, Button } from 'react-bootstrap';

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

      let results = await axios.get(`${SERVER}/books`);
      // console.log(results)

      this.setState({
        books: results.data
      }) //, console.log(this.state.books))

    } catch (error) {

      console.log('Oh no! An error!:', error.response.data)

    }
  }


  postBook = async (newBook) => {
    try {

      let url = `${SERVER}/books`;
      let createdBook = await axios.post(url, newBook);
      //console.log(createdBook.data);

      this.setState({
        cats: [...this.state.books, createdBook.data]
      })

    } catch (error) {

      console.log('Oops! ', error.response.data)

    }
  }

  deleteBook = async (id) => {
    try {
      let url = `${SERVER}/books/${id}`;

      // DO NOT expect a returned value from axios.delete();
      await axios.delete(url);

      let updatedBooks = this.state.books.filter(book => book._id !== id);

      this.setState({
        books: updatedBooks
      });

    } catch (error) {

      console.log('Oops! ', error.response.data)

    }
  }

  // when the site loads (has everything it needs), the data will be displayed
  componentDidMount() {
    this.getBooks();
  }

  render() {

    /* Done: render all the books in a Carousel */
    let carouselItems = this.state.books.map((book) => {
      return (


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

            <Button
                className='bookRecButton'
                variant='dark'
                onClick={() => this.deleteBook(book._id)}
              >
                Delete Book
              </Button>

          </Carousel.Caption>
        </Carousel.Item>


      );

    });
    //console.log(carouselItems);

    return (

      <>
        <h2>Required Reading</h2>

        {this.state.books.length ? (

          <Carousel varient='dark'>
            {carouselItems}
          </Carousel>

        ) : (

          <h3>The Library is Closed :(</h3>

        )
        }

        <BookFormModal
          books={this.state.books}
          postBooks={this.postBooks}
          deleteBooks={this.deleteBooks}
        />

      </>

    )
  }
}

export default BestBooks;
