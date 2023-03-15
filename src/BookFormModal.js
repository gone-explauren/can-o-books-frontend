import React from 'react';
import Form from 'react-bootstrap/Form';
import { Button, Container, ListGroup, Modal, Form } from 'react-bootstrap';
import axios from 'axios';
import { trusted } from 'mongoose';

class BookFormModal extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			addBook: false,
			showModal: false,
		}
	}
	
	handleShowModal = () => {
		this.setState({
			showModal: true
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

	}

	handleAddNewBook = async (newBook) => {
		try {

			// query string to add new boom to the server db
			await axios.post(`${process.env.REACT_APP_SERVER}/books`, newBook);

		} catch (error) {
			this.setState({

				error: true,
				errorMessage: 'There was an error:' + error.response + ', ' + error.response.data

			});
		}
	}

	render() {

		return (

			<Container>

				<>

					<Button variant="primary" onClick={this.handleAddNewBook}>
						Add a Book Reccommendation
					</Button>

					<Modal className="bookFormModal"
						show={this.handleShowModal} onHide={this.state.showModal}
					>

						<Modal.Header closeButton>
							<Modal.Title>
								Got Reading Recs?
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
									<Form.Select>
										<option value="Consumed">Read</option>
										<option value="Information Absorbed through Telepathy">Started / Skimmed</option>
										<option value="Untouched">Reading List / Unstarted</option>
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