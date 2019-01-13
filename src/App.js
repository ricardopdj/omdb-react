import React, {Component} from 'react'
import logo from './logo.svg'
import './App.css'
import * as OMDbAPI from './OMDbAPI'
import {Debounce} from 'react-throttle'
import Pagination from "react-js-pagination"
import {
    Container,
    Row,
    Col,
    Input
} from 'reactstrap'
import Titles from './Titles'
import { BeatLoader } from 'react-spinners';

class App extends Component {
    state = {
        currentTitle: '',
        titles: [],
        totalResults: 0,
        activePage: 1,
        totalPages: null,
        apiError: false,
        searching: false
    }

    search = (title, page = 1) => {
        this.setState({searching: true});

        if (title !== this.state.currentTitle) {
            this.clearContent();
        }

        if (title) {
            this.setState({currentTitle: title});

            OMDbAPI
                .searchByTitle(title, page)
                .then((result) => {
                    this.setContent(result);
                })
                .catch(() => {
                    this.setState({apiError: true, searching: false})
                });
        } else {
            this.clearContent();
        }

    }

    setContent = (result) => {
        if (result.totalResults) {
            this.setState({
                titles: result.Search,
                totalResults: result.totalResults,
                totalPages: (result.totalResults / 10),
                searching: false
            });
        }
    }

    clearContent = () => {
        this.setState({currentTitle: '', titles: [], totalResults: 0, activePage: 1, totalPages: null});
    }

    handlePageChange(pageNumber) {
        this.setState({activePage: pageNumber});
        this.search(this.state.currentTitle, pageNumber);
    }

    render() {
        return (
            <Container className="py-5">
                <h1 className="text-center">OMDB search</h1>
                <Row className="mt-3 mb-5">
                    <Col>
                        <Debounce time="400" handler="onChange">
                            <Input
                                bsSize="lg"
                                placeholder="Search movie, series or episodes"
                                aria-label="Type a movie, series or episode name to search"
                                onChange={(event) => this.search(event.target.value)}/>
                        </Debounce>
                    </Col>
                </Row>

                {this.state.totalResults > 0 &&
                <Row>
                    <Col>
                        <Pagination
                            activePage={this.state.activePage}
                            itemsCountPerPage={10}
                            totalItemsCount={this.state.totalResults}
                            pageRangeDisplayed={5}
                            onChange={this
                            .handlePageChange
                            .bind(this)}
                            itemClass="page-item"
                            linkClass="page-link"
                            activeLinkClass="active"
                            prevPageText="Prev"
                            nextPageText="Next"
                            pageRangeDisplayed="5"
                            hideDisabled={true}/>
                    </Col>
                </Row>
                }


                <div className="text-center">
                    <BeatLoader
                    sizeUnit={"px"}
                    size={30}
                    color={'#D8DBE2'}
                    loading={this.state.searching}
                    />
                </div>

                {this.state.totalResults > 0 && !this.state.searching && <Titles list={this.state.titles}/>}
            </Container>
        );
    }
}

export default App;
