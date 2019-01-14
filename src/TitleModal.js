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
                <div className="text-center">
                  <img src={title.Poster} alt={title.Title}/>
                </div>
                <div className="my-5">
                  <p>Release date: {title.Year}</p>
                </div>

            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={this.toggle}>Do Something</Button>{' '}
                <Button color="secondary" onClick={this.toggle}>Cancel</Button>
            </ModalFooter>
        </Modal>
        )
    }
}

export default TitleModal