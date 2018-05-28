import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import {
Icon,
  Step
} from "semantic-ui-react";
import { compose } from "redux";
import {
  withFirebase,
  isLoaded,
  isEmpty,
  firebaseConnect
} from "react-redux-firebase";

class Updates extends Component {
  state = {
    step: false,
    updates: {
      userID: this.props.user.uid
      // projectID: this.props.project
    }
  };

  getDOBJobs = jobNumbers => {
    const { filings } = this.props;
    axios
      .get(
        `https://data.cityofnewyork.us/resource/rvhx-8trz.json?job__=${jobNumber}`
      ) // fetch the current XKCD comic. The site does not support CORS requests, so we make the request via a pass-through node server
      .then(response => {
        console.log(response.data);
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  getViolations = jobNumbers => {
    const { filings } = this.props;
    axios
      .get(
        `https://data.cityofnewyork.us/resource/rvhx-8trz.json?job__=${jobNumber}`
      ) // fetch the current XKCD comic. The site does not support CORS requests, so we make the request via a pass-through node server
      .then(response => {
        console.log(response.data);
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  storeFilings = () => {};

  storeViolations = () => {};

  render() {
   <Step.Group>
    <Step>
      <Icon name='truck' />
      <Step.Content>
        <Step.Title>Shipping</Step.Title>
        <Step.Description>Choose your shipping options</Step.Description>
      </Step.Content>
    </Step>

    <Step active>
      <Icon name='payment' />
      <Step.Content>
        <Step.Title>Billing</Step.Title>
        <Step.Description>Enter billing information</Step.Description>
      </Step.Content>
    </Step>

    <Step disabled>
      <Icon name='info' />
      <Step.Content>
        <Step.Title>Confirm Order</Step.Title>
      </Step.Content>
    </Step>
  </Step.Group>
  }
}

export default compose(
  firebaseConnect(props => [
    {
      path: "/filings",
      queryParams: ["orderByChild=userID", "equalTo=" + props.user.uid]
    },
    {
      path: "/violations",
      queryParams: ["orderByChild=userID", "equalTo=" + props.user.uid]
    },
    {
      path: "/DOBFilings",
      queryParams: ["orderByChild=userID", "equalTo=" + props.user.uid]
    },
    {
      path: "/DOBViolations",
      queryParams: ["orderByChild=userID", "equalTo=" + props.user.uid]
    },
    {
      path: "/updates",
      queryParams: ["orderByChild=userID", "equalTo=" + props.user.uid]
    }
  ]),
  connect((state, props) => ({
    filings: state.firebase.data.filings,
    violations: state.firebase.data.violations,
    DOBFilings: state.firebase.data.filings,
    DOBViolations: state.firebase.data.DOBViolations,
    updates: state.firebase.data.updates
  }))
)(Updates);
