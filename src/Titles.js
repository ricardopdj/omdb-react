import React from 'react'
import PropTypes from 'prop-types'
import {
  Row,
  Col,
  Card,
  CardText,
  CardImg,
  CardBody
} from 'reactstrap';


const Titles = (props) => {

    const getInfo = (venue) => {
        props.onGetInfo(venue);
    }

    return (
        <Row>
          {
            props.list.map((title, index) =>
            <Col key={index} sm="3" className="mb-5">
                <Card className="title">
                    {
                      title.Poster !== 'N/A' ? (
                        <CardImg className="img-fluid" top src={title.Poster} alt={title.Title}/>
                      ) : (
                        <div className="py-5 text-center">
                          <span>Sorry, no image found!</span>
                        </div>
                      )
                    }
                    <CardBody className="d-flex align-items-end">
                        <CardText className="title-name">{title.Title}</CardText>
                    </CardBody>
                </Card>
            </Col>
            )
          }
        </Row>

    )
}

// Titles.propTypes = {
//     venues: PropTypes.array.isRequired,
//     onSearch: PropTypes.func.isRequired,
//     onGetInfo: PropTypes.func.isRequired
// }

export default Titles