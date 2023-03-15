import React from 'react';
import { Button, Container, Modal, Form } from 'react-bootstrap';
import axios from 'axios';

class BookFormModal extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			addBook: false,
			showModal: false
		}
	}

	handleOpenModal = () => {
		this.setState({
			showModal: true
		})
	}

	handleHideModal = () => {
		this.setState({
			showModal: false
		})
	}

	handleNewBookSubmit = (e) => {
		e.preventDefault();
		let newBook = {
			title: e.target.title.value,
			author: e.target.author.value,
			release_date: e.target.releaseDate.value,
			status: e.target.status.value,
			description: e.target.description.value
		}

		// envoke this function to add the new book that was submitted
		this.handleAddNewBook(newBook);

	};

	handleAddNewBook = async (newBook) => {
		try {
			// console.log(newBook);

			// query string to add new boom to the server db:
			// `${process.env.REACT_APP_SERVER}/books`

			// for testing purposes:
			// let bookFromDB = 
			await axios.post(`${process.env.REACT_APP_SERVER}/books`, newBook);

			// console.log(bookFromDB);

		} catch (error) {

			this.setState({
				error: true,
				errorMessage: 'Oops!',
			});

			console.log(error)
		}
	};

	render() {

		return (

			<Container>

				<>

					<Button variant="primary" onClick={this.handleOpenModal}>
						Got a Book Reccommendation?
					</Button>

					<Modal className="bookFormModal"
						show={this.state.showModal} onHide={this.handleHideModal}
					>

						<Modal.Header closeButton>
							<Modal.Title>
								Add to the Library
							</Modal.Title>
						</Modal.Header>

						<Modal.Body className="bookModalBody">

							<Form onSubmit={this.handleNewBookSubmit}>

								<Form.Group controlId="title">
									<Form.Label>Title</Form.Label>
									<Form.Control type="text" />
								</Form.Group>

								<Form.Group controlId="author">
									<Form.Label>Author</Form.Label>
									<Form.Control type="text" />
								</Form.Group>

								<Form.Group controlId="releaseDate">
									<Form.Label>
										Date Published
									</Form.Label>
									<Form.Control type="text" />
								</Form.Group>

								<Form.Group controlId="status">
									<Form.Label>
										Have You Read This Book?
									</Form.Label>
									<Form.Select>
										<option value="Consumed">Read</option>
										<option value="Information Absorbed through Telepathy">Started / Skimmed</option>
										<option value="Untouched, but Touchable">Reading List / Unstarted</option>
									</Form.Select>
								</Form.Group>

								<Form.Group controlId="description">
									<Form.Label>Description</Form.Label>
									<Form.Control type="text" />
								</Form.Group>

								<Button varient="primary" type="submit">
									Share the Knowledge
								</Button>

							</Form>
						</Modal.Body>

						{/* Stealing this from Nate bc the bit was top notch */}
						<Modal.Footer className="bookModalFooter">
							{/* The bookworms are always hungry... */}
						</Modal.Footer>

					</Modal>

				</>

			</Container>
		)
	}
}

export default BookFormModal;