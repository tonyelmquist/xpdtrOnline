import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import {Container, Segment, Table, Header} from 'semantic-ui-react';

class ViolationList extends Component {

  constructor(props) {
    super(props);
  }

    render() {
        return (
            <Container>
            <Header>Violations</Header>
            </Container>
        );
    }
}

export default ViolationList;