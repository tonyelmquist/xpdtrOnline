import React, { Component } from "react";
import PropTypes from "prop-types";
import { Container, Segment, Table, Header, Form } from "semantic-ui-react";
import { firebaseConnect, withFirebase } from "react-redux-firebase";

class TaskAdd extends Component {
  state = {
    addFormVisible: false,
    task: {
      userID: this.props.user.uid,
      projectID: this.props.projectID
    }
  };

  handleInputChange = (e, { name, value }) => {
    console.log(e);
    this.setState(prevState => ({
      task: {
        ...prevState.task,
        [name]: value
      }
    }));
  };

  /*  getDOBJob = addFormValue => {
    const { addTask } = this.props;
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
    this.props.firebase.push("Tasks", this.state.Task);
  };

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
              label="House Number"
              placeholder="House Number"
              name="houseNumber"
              onChange={this.handleInputChange}
            />
            <Form.Input
              fluid
              label="Street Name"
              placeholder="Street Name"
              name="streetName"
              onChange={this.handleInputChange}
            />
            <Form.Dropdown
              fluid
              label="Borough"
              name="borough"
              options={[
                { text: "Manhattan", value: "Manhattan" },
                { text: "Brooklyn", value: "Brooklyn" },
                { text: "Bronx", value: "Bronx" },
                { text: "Queens", value: "Queens" },
                { text: "Staten Island", value: "Staten Island" }
              ]}
              placeholder="Borough"
              search
              selection
              onChange={this.handleInputChange}
            />
            <Form.Input
              fluid
              label="BIN"
              placeholder="BIN"
              name="bin"
              onChange={this.handleInputChange}
            />
          </Form.Group>
          <Form.Button>Submit</Form.Button>
        </Form>
      </Segment>
    );
  }
}

TaskAdd.propTypes = {
  firebase: PropTypes.shape({
    push: PropTypes.func.isRequired
  })
};

export default withFirebase(TaskAdd);
