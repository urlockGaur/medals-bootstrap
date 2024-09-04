import React, { Component } from 'react';
import Nav from 'react-bootstrap/Nav';
import { PlusCircleFill } from 'react-bootstrap-icons';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

class NewCountry extends Component {
    state = {
        showModal: false,
        newCountryName: "",
    }
    
    handleModalClose = () => this.setState({ showModal: false });

    handleAdd = () => {
        if (this.state.newCountryName.length > 0) {
            this.props.onAdd(this.state.newCountryName);
        } else {
            this.props.onEmptyCountryName();  // Call parent function to show the toast
        }
        this.handleModalClose();  // Close the modal
    }
    handleModalKeyPress = (e) => (e.keyCode ? e.keyCode : e.which) === 13 && this.handleAdd();

    render() {
        return (
            <React.Fragment>
                <Nav.Link className="btn">
                    <PlusCircleFill onClick={() => this.setState({ showModal: true, newCountryName: "" })} />
                </Nav.Link>
                <Modal onKeyPress={ this.handleModalKeyPress } show={this.state.showModal} onHide={this.handleModalClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>New Country</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Group className="mb-3" controlId="modalForm1">
                            <Form.Label>Country Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="enter name"
                                autoFocus
                                autoComplete='off'
                                name="newCountryName"
                                onChange={(e) => this.setState({ [e.target.name]: e.target.value })}
                                value={this.state.newCountryName}
                            />
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleModalClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={this.handleAdd}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal>
        </React.Fragment>
        );
    }
}

export default NewCountry;
