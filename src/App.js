import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import * as OMDbAPI from './OMDbAPI'
import {Debounce} from 'react-throttle';
import {
    Container,
    Row,
    Col,
    Input,
    Card,
    Button,
    CardImg,
    CardTitle,
    CardText,
    CardDeck,
    CardSubtitle,
    CardBody
} from 'reactstrap';
import Titles from './Titles'

class App extends Component {
    state = {
        titles: [],
        totalResults: 0,
        currentPage: null,
        totalPages: null,
        apiError: false
    }

    search = (title) => {
        OMDbAPI
            .searchByTitle(title)
            .then((result) => {
                this.setContent(result);
            })
            .catch(() => {
                this.setState({apiError: true})
            });

    }

    setContent = (result) => {
      if (result.totalResults) {
        this.setState({
            titles: result.Search,
            totalResults: result.totalResults,
            totalPages: (result.totalResults / 10)
        });
      }
    }

    render() {
        return (
            <Container className="py-5">
                <h1 class="text-center">OMDB search</h1>
                <Row className="mt-3 mb-5">
                    <Col>
                        <Debounce time="400" handler="onChange">
                            <Input
                                placeholder="Search movie, series or episodes"
                                aria-label="Type a movie, series or episode name to search"
                                onChange={(event) => this.search(event.target.value)}/>
                        </Debounce>
                    </Col>
                </Row>
                { this.state.totalResults > 0 && <Titles list={this.state.titles}/> }
            </Container>
        );
    }
}

export default App;
