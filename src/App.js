import React, { Component } from 'react';
import Country from './components/Country';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Badge from 'react-bootstrap/Badge';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import NewCountry from './components/NewCountry';
import Nav from 'react-bootstrap/Nav';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';

import './App.css';

class App extends Component {
    state = {
        countries: [
            { id: 1, name: 'United States', gold: 2, silver: 2, bronze: 3 },
            { id: 2, name: 'China', gold: 3, silver: 1, bronze: 0 },
            { id: 3, name: 'Germany', gold: 0, silver: 2, bronze: 2 },
        ],
        medals: [
            { id: 1, name: 'gold' },
            { id: 2, name: 'silver' },
            { id: 3, name: 'bronze' },
        ],
        showToast: false,
    }

    handleAdd = (name) => {
        const { countries } = this.state;
        const id = countries.length === 0 ? 1 : Math.max(...countries.map(country => country.id)) + 1;
        const mutableCountries = [...countries].concat({ id: id, name: name, gold: 0, silver: 0, bronze: 0 });
        this.setState({ countries: mutableCountries });
    }

    handleDelete = (countryId) => {
        const { countries } = this.state;
        const mutableCountries = [...countries].filter(c => c.id !== countryId);
        this.setState({ countries: mutableCountries });
    }

    handleIncrement = (countryId, medalName) => {
        const countries = [...this.state.countries];
        const idx = countries.findIndex(c => c.id === countryId);
        countries[idx][medalName] += 1;
        this.setState({ countries: countries });
    }

    handleDecrement = (countryId, medalName) => {
        const countries = [...this.state.countries];
        const idx = countries.findIndex(c => c.id === countryId);
        countries[idx][medalName] -= 1;
        this.setState({ countries: countries });
    }

    getAllMedalsTotal() {
        let sum = 0;
        this.state.medals.forEach(medal => { sum += this.state.countries.reduce((a, b) => a + b[medal.name], 0); });
        return sum;
    }

    handleToastClose = () => this.setState({ showToast: false });
    handleEmptyCountryName = () => {
        this.setState({ showToast: true });
    }

    render() {
        return (
            <React.Fragment>
                <Navbar className="navbar-dark bg-dark">
                    <Container fluid>
                        <Navbar.Brand>
                            Olympic Medals
                            <Badge className="ml-2" bg="light" text="dark" pill>{this.getAllMedalsTotal()}</Badge>
                        </Navbar.Brand>
                        <Nav className="me-auto">
                            <NewCountry onAdd={this.handleAdd} onEmptyCountryName={this.handleEmptyCountryName} />
                        </Nav>
                    </Container>
                </Navbar>
                <ToastContainer className="toast-container-top-right">
                    <Toast
                        show={this.state.showToast}
                        onClose={this.handleToastClose}
                        delay={3000}
                        autohide
                    >
                        <Toast.Header className='toast-header'>
                            <strong className='me-auto'>Country Not Added</strong>
                        </Toast.Header>
                        <Toast.Body>Please enter a country name!</Toast.Body>
                    </Toast>
                </ToastContainer>
                <Container fluid>
                    <Row>
                        {this.state.countries.map(country =>
                            <Col className="mt-3" key={country.id}>
                                <Country
                                    country={country}
                                    medals={this.state.medals}
                                    onDelete={this.handleDelete}
                                    onIncrement={this.handleIncrement}
                                    onDecrement={this.handleDecrement} />
                            </Col>
                        )}
                    </Row>
                </Container>
            </React.Fragment>
        );
    }
}

export default App;