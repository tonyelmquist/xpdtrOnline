import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { withFirebase, firebaseConnect } from "react-redux-firebase";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
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
import { Switch, Route, BrowserRouter, NavLink } from "react-router-dom";

import Login from "../containers/pages/Login";
import HomePage from "../containers/pages/HomePage";
import BuildingList from "../containers/pages/BuildingList";
import BuildingAdd from "../containers/pages/BuildingAdd";
import ContactList from "../containers/pages/ContactList";
import FilingList from "../containers/pages/FilingList";
import InspectionsList from "../containers/pages/InspectionsList";
import ProjectList from "../containers/pages/ProjectList";
import ProjectAdd from "../containers/pages/ProjectAdd";
import ProjectDetail from "../containers/pages/ProjectDetail";
import FormDetail from "../containers/pages/FormDetail";
import Settings from "../containers/pages/Settings";
import TaskList from "../containers/pages/TaskList";
import ViolationList from "../containers/pages/ViolationList";
import HamburgerButton from "../components/HamburgerButton";
import AppHeader from "../components/AppHeader";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      visible: true,
      location: "home",
      isSignedIn: false,
      user: {}
    };
  }
  componentDidMount() {
    this.unregisterAuthObserver = this.props.firebase
      .auth()
      .onAuthStateChanged(user => {
        this.setState({ isSignedIn: !!user, user });
        // this.props.fetchUser(user.uid);
      });
  }

  // Make sure we un-register Firebase observers when the component unmounts.
  componentWillUnmount() {
    this.unregisterAuthObserver();
  }
  toggleVisibility = () => {
    this.setState({ visible: !this.state.visible });
  };

  logout = () => {
    this.props.firebase.auth().signOut();
  };

  handleProjectClick = projectId => {
    history.push("/ProjectDetail/:projectId");
    console.log(projectId);
  };

  render() {
    const uiConfig = {
      // Popup signin flow rather than redirect flow.
      signInFlow: "popup",
      // We will display Google and Facebook as auth providers.
      signInOptions: [
        this.props.firebase.auth.EmailAuthProvider.PROVIDER_ID,
        this.props.firebase.auth.PhoneAuthProvider.PROVIDER_ID,
        this.props.firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        this.props.firebase.auth.FacebookAuthProvider.PROVIDER_ID,
        this.props.firebase.auth.TwitterAuthProvider.PROVIDER_ID
      ],
      callbacks: {
        // Avoid redirects after sign-in.
        signInSuccessWithAuthResult: (authResult, redirectUrl) => {
          const isNewUser = authResult.additionalUserInfo.isNewUser;
          this.setState({ isNewUser });
          return false;
        }
      }
    };
    const user = this.props.firebase.auth().currentUser;
    if (!this.state.isSignedIn) {
      return (
        <BrowserRouter>
          <div className="full-height">
            <AppHeader userName={null} />
            <h1>XPDTR</h1>
            <p>Please sign-in:</p>
            <StyledFirebaseAuth
              uiConfig={uiConfig}
              firebaseAuth={this.props.firebase.auth()}
            />
          </div>
        </BrowserRouter>
      );
    }
    return (
      <BrowserRouter>
        <div className="full-height">
          <AppHeader userName={user.displayName} logout={this.logout} />
          <Sidebar.Pushable as={Segment} className="sidebar-no-border">
            <Sidebar
              as={Menu}
              animation="push"
              width="thin"
              visible={this.state.visible}
              icon="labeled"
              vertical
              inverted
            >
              <Menu.Item name="home">
                <NavLink to="/">
                  <Icon name="home" />
                  Home
                </NavLink>
              </Menu.Item>
              <Menu.Item name="projects">
                <NavLink to="/Projects">
                  <Icon name="folder open" />
                  Projects
                </NavLink>
                <NavLink to="/AddProject">
                  <Icon name="add circle" className="menu-icon" />
                </NavLink>
              </Menu.Item>
              <Menu.Item name="buildings">
                <NavLink to="/Buildings">
                  <Icon name="building outline" />
                  Buildings
                </NavLink>
                <NavLink to="/AddBuilding">
                  <Icon name="add circle" className="menu-icon" />
                </NavLink>
              </Menu.Item>
              <Menu.Item name="tasks">
                <NavLink to="/Tasks">
                  <Icon name="tasks" />
                  Tasks
                </NavLink>
              </Menu.Item>
              <Menu.Item name="filings">
                <NavLink to="/Filings">
                  <Icon name="cogs" />
                  Filings
                </NavLink>
              </Menu.Item>
              <Menu.Item name="inspections">
                <NavLink to="/Inspections">
                  <Icon name="search" />
                  Inspections
                </NavLink>
              </Menu.Item>
              <Menu.Item name="violations">
                <NavLink to="/Violations">
                  <Icon name="ban" />
                  Violations
                </NavLink>
              </Menu.Item>
              <Menu.Item name="contacts">
                <NavLink to="/Contacts">
                  <Icon name="address book outline" />
                  Contacts
                </NavLink>
              </Menu.Item>
              <Menu.Item name="settings">
                <NavLink to="/Settings">
                  <Icon name="cogs" />
                  Settings
                </NavLink>
              </Menu.Item>
            </Sidebar>
            <Sidebar.Pusher>
              <HamburgerButton
                active={this.state.visible}
                handleClick={this.toggleVisibility}
              />

              <Switch>
                <Route
                  exact
                  path="/"
                  render={props => (
                    <HomePage
                      user={this.state.user}
                      isNewUser={this.state.isNewUser}
                      {...props}
                    />
                  )}
                />
                <Route
                  exact
                  path="/Home"
                  render={props => (
                    <HomePage
                      user={this.state.user}
                      extendedUser={this.state.extendedUser}
                      {...props}
                    />
                  )}
                />
                <Route
                  exact
                  path="/Buildings"
                  render={props => (
                    <BuildingList user={this.state.user} {...props} />
                  )}
                />
                <Route
                  exact
                  path="/AddBuilding"
                  render={props => (
                    <BuildingAdd user={this.state.user} {...props} />
                  )}
                />
                <Route
                  exact
                  path="/Projects"
                  render={props => (
                    <ProjectList
                      handleProjectClick={this.handleProjectClick}
                      user={this.state.user}
                      projects={this.props.projects}
                      {...props}
                    />
                  )}
                />
                <Route
                  exact
                  path="/AddProject"
                  render={props => (
                    <ProjectAdd user={this.state.user} {...props} />
                  )}
                />
                <Route
                  path="/ProjectDetail/:projectId"
                  component={ProjectDetail}
                />
                <Route
                  path="/FormDetail/:formId"
                  component={FormDetail}
                />
                <Route exact path="/Contacts" component={ContactList} />
                <Route exact path="/Settings" component={Settings} />
                <Route
                  exact
                  path="/Filings"
                  render={props => (
                    <FilingList user={this.state.user} {...props} />
                  )}
                />
                <Route
                  exact
                  path="/Tasks"
                  render={props => (
                    <TaskList user={this.state.user} {...props} />
                  )}
                />
                <Route
                  exact
                  path="/Violations"
                  render={props => (
                    <ViolationList user={this.state.user} {...props} />
                  )}
                />
              </Switch>
              {/*<Button onClick={() => this.props.firebase.auth().signOut()} />*/}
            </Sidebar.Pusher>
          </Sidebar.Pushable>
        </div>
      </BrowserRouter>
    );
  }
}

export default compose(
  firebaseConnect(props => [
    { path: "projects" } // string equivalent 'todos'
  ]),
  connect((state, props) => ({
    projects: state.firebase.data.projects
  }))
)(App);
