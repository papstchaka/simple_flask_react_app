import React, { Component } from "react";
import { Table } from "reactstrap";
import NewNoteModal from "../NewNoteModal/NewNoteModal";

import ConfirmRemovalModal from "../ConfirmRemovalModal/ConfirmRemovalModal";

class NoteList extends Component {
  state= {
    active: false
  }

  itemCheckHandler = () => {
    this.setState({
      active: !this.state.active
    })
  };

  render() {
    const notes = this.props.notes;
    return (
      <Table className="table" striped bordered responsive>
        <thead>
          <tr>
            <th className="table-content">Name</th>
            <th className="table-content">Day of Deadline</th>
            <th className="table-content">Registration</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {!notes || notes.length <= 0 ? (
            <tr>
              <td colSpan="6" align="center">
                <b>Ops, no one here yet</b>
              </td>
            </tr>
          ) : (
            notes.map(notes => (
              <tr key={notes.pk} style={{textDecoration: this.state.active ? 'none' : 'none'}} onClick={this.itemCheckHandler}>
                <td className="table-content">{notes.name}</td>
                <td className="table-content">{notes.deadlineDate}</td>
                <td className="table-content">{notes.registrationDate}</td>
                <td align="center">
                  <NewNoteModal
                    create={false}
                    notes={notes}
                    resetState={this.props.resetState}
                  />
                  &nbsp;&nbsp;
                  <ConfirmRemovalModal
                    pk={notes.pk}
                    resetState={this.props.resetState}
                  />
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
    );
  }
}

export default NoteList;