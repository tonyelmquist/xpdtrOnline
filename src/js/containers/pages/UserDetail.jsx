import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as actions from "../../actions";
import {Container, Segment, Table, Header, Form} from 'semantic-ui-react';

class UserDetail extends Component {

 state = {
    newUser: {}
  };

  handleInputChange = (e, {name, value}) => {
    this.setState(prevState => ({
    newUser: {
        ...prevState.newUser,
        [name]: value
    }
    }))
  };

  handleFormSubmit = event => {
    const { addUser } = this.props;
    const { newUser } = this.state;
    event.preventDefault();
    addUser({ newUser });
  };

  constructor(props) {
    super(props);
  }

    render() {
        return (
            <Segment fluid className="app-content">
             <Form onSubmit={this.handleFormSubmit}>
        <Form.Group widths='equal'>
          <Form.Input fluid label='Project Name' placeholder='Project Name' name="projectName" onChange={this.handleInputChange} />
          <Form.Input fluid label='Building' placeholder='Building' name="building" onChange={this.handleInputChange} />
          <Form.Dropdown fluid label='Type' name="projectType" options={[{text: "type 1", value: "type 1"}, {text: "type 2", value: "type 2"}]} placeholder='Type' search selection onChange={this.handleInputChange} />
        </Form.Group>
        <Form.Button>Submit</Form.Button>
      </Form>
            </Segment>
        );
    }
}

const mapStateToProps = ({ data }) => {
  return {
    data
  };
};

export default connect(mapStateToProps, actions)(UserDetail);