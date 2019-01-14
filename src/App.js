import React, {Component} from 'react'
import './App.css'
import * as OMDbAPI from './OMDbAPI'
import {Debounce} from 'react-throttle'
import {
    Container,
    Row,
    Col,
    Input
} from 'reactstrap'
import Titles from './Titles'
import TitleModal from './TitleModal'
import { BeatLoader } from 'react-spinners';

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

    // this.toggle = this.toggle.bind(this);

    modalToggle = () => {
        this.setState({modal: !this.state.modal});
    }

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

    setError = (result) => {
        this.setState({apiError: true, apiErrorMsg: result.Error, searching: false})
    }

    handlePageChange = (pageNumber) => {
        this.setState({activePage: pageNumber});
        this.search(this.state.currentTitle, pageNumber);
    }

    getTitleInfo = (title) => {
      console.log(title);

        this.setState({
            modalContent: title,
            modal: true
        })
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

                {/* Search loading icon */}
                <div className="text-center">
                    <BeatLoader
                    sizeUnit={"px"}
                    size={30}
                    color={'#D8DBE2'}
                    loading={this.state.searching}
                    />
                </div>

                {/* List of titles and pagination */}
                {
                    this.state.currentTitle &&
                    !this.state.searching &&
                    <Titles
                        titles={this.state.titles}
                        onGetInfo={this.getTitleInfo}
                        error={this.state.apiErrorMsg}
                        activePage={this.state.activePage}
                        totalItemsCount={this.state.totalResults}
                        onPageChange={this.handlePageChange}
                        error={this.state.apiErrorMsg}
                    />
                }

                {
                  this.state.modal &&
                  <TitleModal
                      title={this.state.modalContent}
                      isOpen={this.state.modal}
                      onToggle={this.modalToggle}
                  />
                }

            </Container>
        );
    }
}

export default App;
