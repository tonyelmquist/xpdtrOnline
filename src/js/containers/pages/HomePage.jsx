import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import {Container, Segment, Table, Header} from 'semantic-ui-react';

class HomePage extends Component {

  constructor(props) {
    super(props);
  }

    render() {
        return (
            <Container>
            <Header>Home</Header>
            </Container>
        );
    }
}

export default HomePage;