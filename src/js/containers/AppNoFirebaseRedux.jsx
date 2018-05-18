import React from "react";
import ReactDOM from "react-dom";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import * as actions from "../actions";

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
import { Switch, Route, BrowserRouter, NavLink } from "react-router-dom";

import Login from "../containers/pages/Login";
import HomePage from "../containers/pages/HomePage";
import BuildingList from "../containers/pages/BuildingList";
import ContactList from "../containers/pages/ContactList";
import FilingList from "../containers/pages/FilingList";
import InspectionsList from "../containers/pages/InspectionsList";
import ProjectList from "../containers/pages/ProjectList";
import ProjectAdd from "../containers/pages/ProjectAdd";
import Settings from "../containers/pages/Settings";
import TaskList from "../containers/pages/TaskList";
import ViolationList from "../containers/pages/ViolationList";
import HamburgerButton from "../components/HamburgerButton";
import AppHeader from "../components/AppHeader";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      visible: true,
      location: "home",
      isSignedIn: false,
      user: {},
    };
  }

  // Listen to the Firebase Auth state and set the local state.
  componentDidMount() {
    this.unregisterAuthObserver = firebase
      .auth()
      .onAuthStateChanged(user => {
        this.setState({ isSignedIn: !!user, user });
        this.props.fetchUser(user.uid);
      });
  }

  // Make sure we un-register Firebase observers when the component unmounts.
  componentWillUnmount() {
    this.unregisterAuthObserver();
  }

  logout = () => {
    firebase.auth().signOut();
  }

  toggleVisibility = () => this.setState({ visible: !this.state.visible });
  render() {
    const uiConfig = {
  // Popup signin flow rather than redirect flow.
  signInFlow: "popup",
  // We will display Google and Facebook as auth providers.
  signInOptions: [
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
    firebase.auth.PhoneAuthProvider.PROVIDER_ID,
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    firebase.auth.TwitterAuthProvider.PROVIDER_ID
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
    const user = firebase.auth().currentUser;
    let extendedUser = this.props.extendedUser === null ?  {} : this.props.extendedUser
    extendedUser = Object.values(extendedUser)[0] ? Object.values(extendedUser)[0] : {};
    const { visible, location } = this.state;

    if (!this.state.isSignedIn) {
      return (
        <BrowserRouter>
          <div className="full-height">
            <AppHeader userName={null}/>
            <h1>XPDTR</h1>
            <p>Please sign-in:</p>
            <StyledFirebaseAuth
              uiConfig={uiConfig}
              firebaseAuth={firebase.auth()}
            />
          </div>
        </BrowserRouter>
      );
    }
    return (
      <BrowserRouter>
        <div className="full-height">
         <AppHeader userName={user.displayName} logout={this.logout}/>
          <Sidebar.Pushable as={Segment} className="sidebar-no-border">
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
                  <Icon name="add circle" />
                </NavLink>
              </Menu.Item>
              <Menu.Item name="buildings">
                <NavLink to="/Buildings">
                  <Icon name="building outline" />
                  Buildings
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
                <Route exact path="/" render={props => <HomePage user={this.state.user} extendedUser={extendedUser} {...props} />} />
                <Route exact path="/Home" render={props => <HomePage user={this.state.user} extendedUser={this.state.extendedUser} {...props} />} />
                <Route exact path="/Buildings" component={BuildingList} />
                <Route exact path="/Projects" render={props => <ProjectList user={this.state.user} {...props} />} />
                <Route exact path="/AddProject" render={props => <ProjectAdd user={this.state.user} {...props} />} />
                <Route exact path="/Contacts" component={ContactList} />
                <Route exact path="/Settings" component={Settings} />
                <Route exact path="/Filings" component={FilingList} />
                <Route exact path="/Tasks" component={TaskList} />
                <Route exact path="/Violations" component={ViolationList} />
              </Switch>
              <Button onClick={() => firebase.auth().signOut()} />
            </Sidebar.Pusher>

          </Sidebar.Pushable>
        </div>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = ({ extendedUser }) => {
  return {
    extendedUser
  };
};

export default connect(mapStateToProps, actions)(App);
