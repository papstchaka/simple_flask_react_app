import React, { Component, Fragment } from "react";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import NewNoteForm from "../NewNoteForm/NewNoteForm";

class NewNoteModal extends Component {
  state = {
    modal: false
  };

  toggle = () => {
    this.setState(previous => ({
      modal: !previous.modal
    }));
  };

  render() {
    const create = this.props.create;

    var title = "Editing Note";
    var button = <a rel="noopener noreferrer" className="cta-btn cta-btn--resume" onClick={this.toggle}>Edit</a>;
    if (create) {
      title = "Creating New Note";

      button = (
        <a
          rel="noopener noreferrer"
          className="float-right cta-btn cta-btn--resume"
          onClick={this.toggle}
        >
          Create New
        </a>
      );
    }

    return (
      <Fragment>
        {button}
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}><h1 className="modal_">{title}</h1></ModalHeader>

          <ModalBody>
            <NewNoteForm
              resetState={this.props.resetState}
              toggle={this.toggle}
              note={this.props.notes}
            />
          </ModalBody>
        </Modal>
      </Fragment>
    );
  }
}

export default NewNoteModal;