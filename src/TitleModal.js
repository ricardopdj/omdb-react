import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from 'reactstrap'

class TitleModal extends Component {

    toggle = () => {
        this.props.onToggle()
    }

    render() {
        const { isOpen, title } = this.props

        return (
          <Modal isOpen={isOpen} toggle={this.toggle} className={this.props.className}>
            <ModalHeader toggle={this.toggle}>{title.Title}</ModalHeader>
            <ModalBody>
                <div className="text-center title">
                  { title.Poster !== 'N/A' && <img src={title.Poster} alt={title.Title} className="mb-3"/> }
                </div>
                <div className="px-3">
                  <p><strong>Plot</strong><br/>{title.Plot}</p>
                  <p><strong>Director</strong><br/>{title.Director}</p>
                  <p><strong>Actors</strong><br/>{title.Actors}</p>
                  <p><strong>Genre</strong><br/>{title.Genre}</p>
                  <p><strong>Release date</strong><br/>{title.Released}</p>
                  <p><strong>Runtime</strong><br/>{title.Runtime}</p>
                  <p><strong>Country</strong><br/>{title.Country}</p>
                  <div className="pb-3"><strong>Ratings</strong><br/>
                  {
                    title.Ratings.map((rating, index) =>
                      <div key={index}>
                        {rating.Source} - {rating.Value}
                      </div>
                    )
                  }
                  </div>
                  <p>
                    <strong>On IMDB:</strong><br/>
                    <a href={`http://imdb.com/title/${title.imdbID}`} target="_blank">http://imdb.com/title/{title.imdbID}</a>
                  </p>
                </div>

            </ModalBody>
            <ModalFooter>
                <Button color="secondary" onClick={this.toggle}>Close</Button>
            </ModalFooter>
        </Modal>
        )
    }
}

export default TitleModal