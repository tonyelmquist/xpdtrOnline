import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { Icon, Step } from "semantic-ui-react";
import { compose } from "redux";
import {
  withFirebase,
  isLoaded,
  isEmpty,
  firebaseConnect
} from "react-redux-firebase";
import { diff } from "just-diff";

class Updates extends Component {
  state = {
    step: 1,
    DOBFilingsCalled: false,
    DOBViolatonsCalled: false,
    updates: {
      userID: this.props.userID
      // projectID: this.props.project
    }
  };

  componentDidMount = () => {};

  getDOBJobs = filings => {
    this.setState({ DOBFilingsCalled: true, step: 2 });
    const filingMap = _.map(filings, (value, key) => {
      return `'${value.DOBNumber}'`;
    });
    console.log(
      `https://data.cityofnewyork.us/resource/rvhx-8trz.json?$where=JOB__%20in(${filingMap})`
    );
    axios
      .get(
        `https://data.cityofnewyork.us/resource/rvhx-8trz.json?$where=JOB__%20in(${filingMap})`
      ) // fetch the current XKCD comic. The site does not support CORS requests, so we make the request via a pass-through node server
      .then(response => {
        this.setState({ DOBFilings: response.data, step: 3 });
        console.log(diff(response.data, response.data));
        axios
          .get(
            `http://localhost:3000/proxy?url=http://a810-bisweb.nyc.gov/bisweb/PropertyProfileOverviewServlet?boro=3&houseno=35&street=Claver+Place&go2=+GO+&requestid=0`
          ) // fetch the current XKCD comic. The site does not support CORS requests, so we make the request via a pass-through node server
          .then(response => {
            console.log(response.data); // get the number of the latest cartoon
          })
          .catch(function(error) {
            console.log(error);
          });
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  getDOBViolations = buildings => {
    this.setState({ DOBViolatonsCalled: true });
    const buildingMap = _.map(buildings, (value, key) => {
      return `'${value.bin}'`;
    });
    console.log(
      `https://data.cityofnewyork.us/resource/rvhx-8trz.json?$where=JOB__%20in(${buildingMap})`
    );
    axios
      .get(
        `https://data.cityofnewyork.us/resource/dvnq-fhaa.json?$where=bin%20in(${buildingMap})`
      ) // fetch the current XKCD comic. The site does not support CORS requests, so we make the request via a pass-through node server
      .then(response => {
        this.setState({ violations: response.data, step: 4 });
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  storeFilings = () => {};

  storeViolations = () => {};

  render() {
    const { filings, DOBFilings, buildings, violations, updates } = this.props;

    if (isLoaded(filings) && this.state.DOBFilingsCalled === false) {
      this.getDOBJobs(filings);
    }

    if (
      isLoaded(buildings) &&
      this.state.DOBViolatonsCalled === false &&
      this.state.step === 3
    ) {
      this.getDOBViolations(buildings);
    }

    return (
      <Step.Group size="mini">
        <Step
          active={this.state.step === 1 ? true : false}
          completed={this.state.step > 1 ? true : false}
        >
          <Icon name="cloud" />
          <Step.Content>
            <Step.Title>Connecting to XPDTR</Step.Title>
            <Step.Description>
              {isLoaded(filings) ? "Filings Loaded" : "Filings Not Loaded"}
            </Step.Description>
          </Step.Content>
        </Step>
        <Step
          active={this.state.step === 2 ? true : false}
          completed={this.state.step > 2 ? true : false}
        >
          <Icon name="building" />
          <Step.Content>
            <Step.Title>Retrieving Filings</Step.Title>
            <Step.Description>
              Getting updates from BIS and DOB Now!
            </Step.Description>
          </Step.Content>
        </Step>

        <Step
          active={this.state.step === 3 ? true : false}
          completed={this.state.step > 3 ? true : false}
        >
          <Icon name="exclamation circle" />
          <Step.Content>
            <Step.Title>Retrieving Violations</Step.Title>
            <Step.Description>Getting updates from the DOB</Step.Description>
          </Step.Content>
        </Step>

        <Step
          active={this.state.step === 4 ? true : false}
          completed={this.state.step > 4 ? true : false}
        >
          <Icon name="dashboard" />
          <Step.Content>
            <Step.Title>Preparing your XPDTR Dashboard</Step.Title>
          </Step.Content>
        </Step>
      </Step.Group>
    );
  }
}

export default compose(
  firebaseConnect(props => [
    {
      path: "/filings",
      queryParams: ["orderByChild=userID", "equalTo=" + props.userID]
    },
    {
      path: "/violations",
      queryParams: ["orderByChild=userID", "equalTo=" + props.userID]
    },
    {
      path: "/DOBFilings",
      queryParams: ["orderByChild=userID", "equalTo=" + props.userID]
    },
    {
      path: "/buildings",
      queryParams: ["orderByChild=userID", "equalTo=" + props.userID]
    },
    {
      path: "/updates",
      queryParams: ["orderByChild=userID", "equalTo=" + props.userID]
    }
  ]),
  connect((state, props) => ({
    filings: state.firebase.data.filings,
    buildings: state.firebase.data.buildings,
    DOBFilings: state.firebase.data.DOBfilings,
    violations: state.firebase.data.violations,
    updates: state.firebase.data.updates
  }))
)(Updates);
