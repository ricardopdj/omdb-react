import React, {Component} from 'react'
import './App.css'
import * as OMDbAPI from './OMDbAPI'
import {Debounce} from 'react-throttle'
import {Container, Row, Col, Input} from 'reactstrap'
import Titles from './Titles'
import TitleModal from './TitleModal'
import {BeatLoader} from 'react-spinners';

class App extends Component {
    state = {
        currentTitle: '',
        titles: [],
        totalResults: 0,
        activePage: 1,
        totalPages: null,
        apiError: false,
        apiErrorMsg: '',
        searching: false,
        modal: false,
        modalContent: ''
    }

    // Handle modal on/off
    modalToggle = () => {
        this.setState({
            modal: !this.state.modal
        });
    }

    // Search on OMDb API by title and page
    search = (title, page = 1) => {

        if (title !== this.state.currentTitle) {
            this.clearContent();
        }

        if (title) {
            this.setState({currentTitle: title, searching: true});

            OMDbAPI
                .searchByTitle(title, page)
                .then((result) => {
                    if (result.Response === 'True') {
                        this.setContent(result);
                    } else {
                        this.setError(result)
                    }
                })
                .catch(() => {
                    this.setState({apiError: true, searching: false})
                });
        } else {
            this.clearContent();
            this.setState({searching: false})
        }
    }

    // Search on OMDb API by imdbID then
    // open a modal with the title content
    getTitleInfo = (imdbID) => {
        OMDbAPI
            .searchByID(imdbID)
            .then((result) => {
                if (result.Response === 'True') {
                    this.setState({modalContent: result, modal: true});
                } else {
                    this.setError(result)
                }
            })
            .catch(() => {
                this.setState({apiError: true, searching: false})
            });
    }

    // Set the state to create a grid of 'movies'
    // or clear/reset the state if there is no search result
    setContent = (result) => {
        if (result.totalResults) {
            this.setState({
                titles: result.Search,
                totalResults: result.totalResults,
                totalPages: (result.totalResults / 10),
                searching: false
            });
        } else {
            this.clearContent();
        }
    }

    // Clear/reset the state
    clearContent = () => {
        this.setState({
            currentTitle: '',
            titles: [],
            totalResults: 0,
            activePage: 1,
            totalPages: null,
            searching: false,
            apiError: false,
            apiErrorMsg: ''
        });
    }

    // Set erros from OMDb API
    setError = (result) => {
        this.setState({apiError: true, apiErrorMsg: result.Error, searching: false})
    }

    // Handle pagination component change
    handlePageChange = (pageNumber) => {
        this.setState({activePage: pageNumber});
        this.search(this.state.currentTitle, pageNumber);
    }

    render() {
        return (
            <Container className="py-5">
                <h1 className="text-center">OMDB search</h1>
                <Row className="my-3">
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

                {/* Search loading icon */}
                <div className="text-center">
                    <BeatLoader
                        sizeUnit={"px"}
                        size={30}
                        color={'#D8DBE2'}
                        loading={this.state.searching}/>
                </div>

                {/* List of titles and pagination */}
                {this.state.currentTitle && !this.state.searching && <Titles
                    titles={this.state.titles}
                    onGetInfo={this.getTitleInfo}
                    error={this.state.apiErrorMsg}
                    activePage={this.state.activePage}
                    totalItemsCount={this.state.totalResults}
                    onPageChange={this.handlePageChange}
                    error={this.state.apiErrorMsg}/>
}

                {this.state.modal && <TitleModal
                    title={this.state.modalContent}
                    isOpen={this.state.modal}
                    onToggle={this.modalToggle}/>
}

            </Container>
        );
    }
}

export default App;
