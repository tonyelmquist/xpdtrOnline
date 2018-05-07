import React from "react";
import ReactDOM from "react-dom";
import { connect } from "react-redux";
import {
  Button,
  Segment,
  Container,
  Grid,
  Sidebar,
  Menu,
  Icon,
  Image,
  Header
} from "semantic-ui-react";
import PropTypes from "prop-types";
import axios from "axios";

import ToDoList from "./ToDoList";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      visible: false
    };
  }

  toggleVisibility = () => this.setState({ visible: !this.state.visible });
  render() {
    const { visible } = this.state;
    return (
      <Sidebar.Pushable as={Segment}>
        <Sidebar
          as={Menu}
          animation="push"
          width="thin"
          visible={visible}
          icon="labeled"
          vertical
          inverted
        >
          <Menu.Item name="home">
            <Icon name="home" />
            Home
          </Menu.Item>
          <Menu.Item name="projects">
            <Icon name="folder open" />
            Projects
          </Menu.Item>
          <Menu.Item name="tasks">
            <Icon name="tasks" />
            Tasks
          </Menu.Item>
          <Menu.Item name="buildings">
            <Icon name="building outline" />
            Buildings
          </Menu.Item>
          <Menu.Item name="contacts">
            <Icon name="address book outline" />
            Contacts
          </Menu.Item>

          <Menu.Item name="settings">
            <Icon name="cogs" />
            Settings
          </Menu.Item>
        </Sidebar>
        <Sidebar.Pusher>
          <Segment basic>
            <Button onClick={this.toggleVisibility}>Toggle Visibility</Button>
            <Header as="h3">Application Content</Header>
            <Image src="/assets/images/wireframe/paragraph.png" />
          </Segment>
        </Sidebar.Pusher>
      </Sidebar.Pushable>
    );
  }
}

export default App;
