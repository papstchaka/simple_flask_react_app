import React, { Component } from "react";
import NoteList from "../NoteList/NoteList";
import NewNoteModal from "../NewNoteModal/NewNoteModal";

import axios from "axios";

import { API_URL } from "../../constants";

class Home extends Component {
  state = {
    notes: []
  };

  componentDidMount() {
    this.resetState();
  }

  getNotes = () => {
    axios.get(API_URL).then(res => this.setState({ notes: res.data }));
  };

  resetState = () => {
    this.getNotes();
  };

  render() {
    return (
      <div>
        <div id="hero" className="jumbotron">
          <h1 className="hero-title">
              This is a short simple app to show how <span className="text-color-main">Django + React</span> work together
          </h1>
          <p className="hero-cta">
              <a rel="noopener noreferrer" className="cta-btn cta-btn--hero" href="#content">Go to</a>
          </p>
        </div>
        <div id="content">
          <NoteList
            notes={this.state.notes}
            resetState={this.resetState}
          />
          <NewNoteModal create={true} resetState={this.resetState} />
        </div>
      </div>
    );
  }
}

export default Home;