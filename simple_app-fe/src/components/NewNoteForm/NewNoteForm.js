import React from "react";
import { Form, FormGroup, Input, Label } from "reactstrap";

import axios from "axios";

import { API_URL } from "../../constants";

class NewNoteForm extends React.Component {
  state = {
    pk: 0,
    name: "",
    deadlineDate: ""
  };

  componentDidMount() {
    if (this.props.note) {
      const { pk, name, deadlineDate } = this.props.note;
      this.setState({ pk, name, deadlineDate });
    }
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  createNote = e => {
    e.preventDefault();
    axios.post(API_URL, this.state).then(() => {
      this.props.resetState();
      this.props.toggle();
    });
  };

  editNote = e => {
    e.preventDefault();
    axios.put(API_URL + this.state.pk, this.state).then(() => {
      this.props.resetState();
      this.props.toggle();
    });
  };

  defaultIfEmpty = value => {
    return value === "" ? "" : value;
  };

  render() {
    return (
      <Form onSubmit={this.props.note ? this.editNote : this.createNote}>
        <FormGroup className="modal_" >
          <Label className="modal_" for="name">Name:</Label>
          <Input
            className="modal_"
            type="text"
            name="name"
            onChange={this.onChange}
            value={this.defaultIfEmpty(this.state.name)}
          />
        </FormGroup>
        <FormGroup className="modal_">
          <Label className="modal_" for="deadlineDate">Day of Deadline:</Label>
          <Input
            className="modal_"
            type="date"
            name="deadlineDate"
            onChange={this.onChange}
            value={this.defaultIfEmpty(this.state.deadlineDate)}
          />
        </FormGroup>
          <a rel="noopener noreferrer" onClick={this.props.note ? this.editNote : this.createNote} className="cta-btn cta-btn--hero">Send</a>
      </Form>
    );
  }
}

export default NewNoteForm;