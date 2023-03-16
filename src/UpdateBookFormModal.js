import React from 'react';
import { Button, Container, Modal, Form } from 'react-bootstrap';

class UpdateBookFormModal extends React.Component {

	handleUpdateBookSubmit = (e) => {
		e.preventDefault();

		let bookToUpdate = {
			title: e.target.title.value || this.props.selectedBookToUpdate.title,
			author: e.target.author.value || this.props.selectedBookToUpdate.author,
			release_date: e.target.releaseDate.value || this.props.selectedBookToUpdate.release_date,
			status: e.target.status.value || this.props.selectedBookToUpdate.status,
			description: e.target.description.value || this.props.selectedBookToUpdate.description,
			_id: this.props.selectedBookToUpdate._id,
			__v: this.props.selectedBookToUpdate.__v
		}

		// envoke this function to add the new book that was submitted
		this.props.updateBook(bookToUpdate);

	};

	render() {

		return (

			<Container>

				<>

					<Modal className="bookUpdateFormModal"
						show={this.props.showUpdateModal} onHide={this.props.handleHideUpdateModal}
					>

						<Modal.Header closeButton>
							<Modal.Title>
								Update Status || Fix Database Errors
							</Modal.Title>
						</Modal.Header>

						<Modal.Body className="bookUpdateModalBody">

							<Form onSubmit={this.handleUpdateBookSubmit}>

								<Form.Group controlId="title">
									<Form.Label>Title</Form.Label>
									{/* Why aren't my placeholders working? */}
									<Form.Control type="text" placeholder={this.props.selectedBookToUpdate.title}/>
								</Form.Group>

								<Form.Group controlId="author">
									<Form.Label>Author</Form.Label>
									<Form.Control type="text" placeholder={this.props.selectedBookToUpdate.author}/>
								</Form.Group>

								<Form.Group controlId="releaseDate">
									<Form.Label>
										Date Published
									</Form.Label>
									<Form.Control type="text" placeholder={this.props.selectedBookToUpdate.release_date}/>
								</Form.Group>

								<Form.Group controlId="status">
									<Form.Label>
										Have You Read This Book?
									</Form.Label>
									<Form.Select>
										<option value="Content Consumed">Read</option>
										<option value="Information Absorbed through Telepathy">Started / Skimmed</option>
										<option value="Untouched, but Touchable">Reading List / Unstarted</option>
									</Form.Select>
								</Form.Group>

								<Form.Group controlId="description">
									<Form.Label>Description</Form.Label>
									<Form.Control type="text" placeholder={this.props.selectedBookToUpdate.description}/>
								</Form.Group>

								<Button varient="primary" type="submit">
									Update the Knowledge
								</Button>

							</Form>
						</Modal.Body>

						<Modal.Footer className="bookModalFooter">
							Stay curious!
						</Modal.Footer>

					</Modal>

				</>

			</Container>
		)
	}
}

export default UpdateBookFormModal;