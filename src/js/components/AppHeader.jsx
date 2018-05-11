import React from "react";
import PropTypes from "prop-types";
import { withRouter } from 'react-router'
import {
  Segment,
  Header,
  Button,
  Icon,
  Menu,
  Container,
  Dropdown
} from "semantic-ui-react";

const AppHeader = props => (
  <Menu fixed="top" inverted className="app-header">
    <Container>
      <Menu.Item as="a" header className="logo-item">
        XPDTR
        <Icon name="send outline" className="logo-icon"/>
      </Menu.Item>
      <Menu.Item as="a">{props.location.pathname.replace('/','')}</Menu.Item>

      <Dropdown item simple text={props.userName} className="logout-menu">
        <Dropdown.Menu>
          <Dropdown.Item>List Item</Dropdown.Item>
          <Dropdown.Item>List Item</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Header>Header Item</Dropdown.Header>
          <Dropdown.Item>
            <i className="dropdown icon" />
            <span className="text">Submenu</span>
            <Dropdown.Menu>
              <Dropdown.Item>List Item</Dropdown.Item>
              <Dropdown.Item>List Item</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown.Item>
          <Dropdown.Item>List Item</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </Container>
  </Menu>
);

AppHeader.defaultProps = {};

AppHeader.propTypes = {
};

export default withRouter(AppHeader);
