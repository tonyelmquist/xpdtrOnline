import React, { Component } from "react";
import PropTypes from "prop-types";
import { Container, Segment, Table, Header, Form } from "semantic-ui-react";
import { firebaseConnect, withFirebase } from 'react-redux-firebase'

class ProjectAdd extends Component {
  state = {
    addFormVisible: false,
    project: {
      userID: this.props.user.uid
    }
  };

  handleInputChange = (e, { name, value }) => {
    console.log(e);
    this.setState(prevState => ({
      project: {
        ...prevState.project,
        [name]: value
      }
    }));
  };

/*  getDOBJob = addFormValue => {
    const { addProject } = this.props;
    axios
      .get(
        `https://data.cityofnewyork.us/resource/rvhx-8trz.json?job__=${addFormValue}`
      ) // fetch the current XKCD comic. The site does not support CORS requests, so we make the request via a pass-through node server
      .then(response => {
        const newJob = {
          title: addFormValue,
          filings: response.data
        }; // get the number of the latest cartoon
        addToDo(newJob);
      })
      .catch(function(error) {
        console.log(error);
      });
  };*/

  handleFormSubmit = event => {
this.props.firebase.push('projects', this.state.project);

}

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Segment fluid className="app-content">
        <Form onSubmit={this.handleFormSubmit}>
          <Form.Group widths="equal">
            <Form.Input
              fluid
              label="Project Name"
              placeholder="Project Name"
              name="projectName"
              onChange={this.handleInputChange}
            />
            <Form.Input
              fluid
              label="Building"
              placeholder="Building"
              name="building"
              onChange={this.handleInputChange}
            />
            <Form.Dropdown
              fluid
              label="Type"
              name="projectType"
              options={[
                { text: "type 1", value: "type 1" },
                { text: "type 2", value: "type 2" }
              ]}
              placeholder="Type"
              search
              selection
              onChange={this.handleInputChange}
            />
          </Form.Group>
          <Form.Button>Submit</Form.Button>
        </Form>
      </Segment>
    );
  }
}

ProjectAdd.propTypes = {
  firebase: PropTypes.shape({
    push: PropTypes.func.isRequired
  })
}

export default withFirebase(ProjectAdd)

