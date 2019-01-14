import React, {Component} from 'react'
import {
    Row,
    Col,
    Card,
    CardText,
    CardImg,
    CardBody
} from 'reactstrap';
import Pagination from "react-js-pagination"
import {CSVLink} from "react-csv";

class Titles extends Component {

    render() {
        const {titles, activePage, totalItemsCount, error} = this.props

        return (
            <div>
                {/* CSV export Component */}
                {!error && <Row className="mb-3">
                    <Col>
                        <CSVLink data={titles} className="btn bg-secondary">Export to CSV</CSVLink>
                    </Col>
                </Row>
                }

                <Row>
                    {/* Show Titles as Cards */}
                    {titles.map((title, index) => <Col key={index} sm="3" className="mb-5">
                        <Card className="title" onClick={() => this.props.onGetInfo(title.imdbID)}>
                            <CardImg className="img-fluid" top src={title.Poster} alt={title.Title}/>

                            <CardBody className="d-flex align-items-end">
                                <CardText className="title-name">{title.Title}</CardText>
                            </CardBody>
                        </Card>
                    </Col>)
                    }

                    {/* Show Api error messages */}
                    {error && <Col>{error}</Col>}
                </Row>

                {/* Pagination */}
                {totalItemsCount > 0 && <Row>
                    <Col>
                        <Pagination
                            activePage={activePage}
                            itemsCountPerPage={10}
                            totalItemsCount={totalItemsCount}
                            pageRangeDisplayed={5}
                            onChange={this
                            .props
                            .onPageChange
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
            </div>

        )
    }
}

export default Titles