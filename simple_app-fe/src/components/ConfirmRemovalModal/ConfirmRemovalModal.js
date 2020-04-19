import React, { Component, Fragment } from "react";
import { Modal, ModalHeader, ModalFooter } from "reactstrap";

import axios from "axios";

import { API_URL } from "../../constants";

class ConfirmRemovalModal extends Component {
  state = {
    modal: false
  };

  toggle = () => {
    this.setState(previous => ({
      modal: !previous.modal
    }));
  };

  deleteNote = pk => {
    axios.delete(API_URL + pk).then(() => {
      this.props.resetState();
      this.toggle();
    });
  };

  render() {
    return (
      <Fragment>
        <a rel="noopener noreferrer" className="cta-btn cta-btn--resume" onClick={() => this.toggle()}>
          Remove
        </a>
        <Modal className="modal_" isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>
            <h1 className="modal_">Do you really wanna delete this note?</h1>
          </ModalHeader>

          <ModalFooter>
            <a rel="noopener noreferrer" className="cta-btn cta-btn--hero" type="button" onClick={() => this.toggle()}>
              Cancel
            </a>
            <a
              rel="noopener noreferrer"
              className="cta-btn cta-btn--hero"
              type="button"
              onClick={() => this.deleteNote(this.props.pk)}
            >
              Yes
            </a>
          </ModalFooter>
        </Modal>
      </Fragment>
    );
  }
}

export default ConfirmRemovalModal;