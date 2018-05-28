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
  Dropdown,
  Checkbox
} from "semantic-ui-react";

const AppHeader = props => (
  <Menu fixed="top" inverted className="app-header">
    <Container>
      <Menu.Item as="a" header className="logo-item">
        XPDTR
        <Icon name="send outline" className="logo-icon"/>
      </Menu.Item>
       <Checkbox toggle className="data-toggle"/>
      <Menu.Item as="a">{props.location.pathname.replace('/','')}</Menu.Item>
      {props.userName ? 
      <Dropdown item simple text={props.userName} className="logout-menu">
        <Dropdown.Menu>
          <Dropdown.Item>Settings</Dropdown.Item>
          <Dropdown.Item onClick={props.logout}>Logout</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown> : null}
    </Container>
  </Menu>
);

AppHeader.defaultProps = {};

AppHeader.propTypes = {
};

export default withRouter(AppHeader);
