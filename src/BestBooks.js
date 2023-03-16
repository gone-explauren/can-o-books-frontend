import React from 'react';
import axios from 'axios';

import BookFormModal from './BookFormModal';
import UpdateBookFormModal from './UpdateBookFormModal';

import './BestBooks.css';

import { Carousel, Button } from 'react-bootstrap';

const SERVER = process.env.REACT_APP_SERVER;


class BestBooks extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      books: [],
      showUpdateModal: false,
      selectedBookToUpdate: {}
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
        books: [...this.state.books, createdBook.data]
      })

    } catch (error) {

      console.log('Oops! ', error.response.data)

    }
  }

  const confirmDelete = () => {
               const response = confirm("Throw this book into the fire?");

                if (response) {
                    this.deleteBook(book._id);
                } else {
                    console.log("These pages were spared from the flames of fury.");
                }
            }

  deleteBook = async (id) => {
    try {
      let url = `${SERVER}/books/${id}`;

      // DO NOT expect a returned value from axios.delete();
      await axios.delete(url);

      let updatedArrayOfBooks = this.state.books.filter(book => book._id !== id);

      this.setState({
        books: updatedArrayOfBooks
      });

    } catch (error) {

      console.log('Oops! ', error.response.data)

    }
  }

  updateBook = async (bookToUpdate) => {
		try{
    let updatedBookFromDatabase = await axios.put(`${process.env.REACT_APP_SERVER}/books/${bookToUpdate._id}`, bookToUpdate);

    let updatedBooks = this.state.books.map((book) => {

      return book._id === bookToUpdate._id 
      ? 
			updatedBookFromDatabase.data
      : 
			book
    });
    this.setState({
      books: updatedBooks,
      showUpdateModal: false
    });
    } catch (error) {
      this.setState({
				error: true,
				errorMessage: 'Oops!',
			});
			console.log(error)
    }
  }

  handleUpdateButtonClick = (book) => {
    // console.log("Button clicked!");
    this.setState({
      selectedBookToUpdate: book,
      showUpdateModal: true
    })
  }


	handleHideUpdateModal = () => {
		this.setState({
			showUpdateModal: false
		})
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
              className='bookDeleteButton'
              variant='dark'
              onClick={() => this.confirmDelete()}
            >
              Delete Book
            </Button>

            <Button
              className='bookUpdateButton'
              variant='dark'
              onClick={() => this.handleUpdateButtonClick(book)}
            >
              Make a Change?
            </Button>

          </Carousel.Caption>
        </Carousel.Item>


      );

    });
    // console.log(carouselItems);

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

        <UpdateBookFormModal
          books={this.state.books}
          showUpdateModal={this.state.showUpdateModal}
          handleHideUpdateModal={this.handleHideUpdateModal}
          selectedBookToUpdate={this.state.selectedBookToUpdate}
          updateBook={this.updateBook}
        />

      </>

    )
  }
}

export default BestBooks;
