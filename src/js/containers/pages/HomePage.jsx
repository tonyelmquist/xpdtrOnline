import React, { Component } from "react";
import PropTypes from "prop-types";
import { Provider, connect, mapStateToProps } from "react-redux";
import {
  Container,
  Segment,
  Table,
  Header,
  Form,
  Checkbox,
  Button
} from "semantic-ui-react";

class HomePage extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    extendedUser: {
      userID: this.props.user.uid
    }
  };

  handleInputChange = (e, { name, value }) => {
    console.log(e);
    this.setState(prevState => ({
      extendedUser: {
        ...prevState.extendedUser,
        [name]: value
      }
    }));
  };

 handleFormSubmit = event => {

  };


  render() {
    return (
      <Container>
        {this.props.isNewUser ? (
          <Segment className="app-content">
            <Header>Great! Thanks for signing in! To get started with XPDTR, please complete your User Profile:</Header>
            <Form onSubmit={this.handleFormSubmit}>
              <Form.Field>
                <Form.Input label="Company" required placeholder="Company" name="company" onChange={this.handleInputChange} />
              </Form.Field>
              <Form.Field>
                <Form.Input  label="Telephone"  required placeholder="Telephone" name="telephone" onChange={this.handleInputChange} />
              </Form.Field>
              <Form.Field>
                <Form.Input  required label="Address" placeholder="Address" name="address" onChange={this.handleInputChange} />
              </Form.Field>
              {!this.props.user.email ? (
                <Form.Field>

                  <Form.Input
                    placeholder="Email"
                    type="email"
                    required
                    name="email"
                    label="Email"
                  />
                </Form.Field>
              ) : null}
              <Form.Group widths="equal">
                <Form.Input
                  fluid
                  required
                  label="City"
                  placeholder="City"
                  name="city"
                  onChange={this.handleInputChange}
                />
                <Form.Input
                  fluid
                  required
                  label="State"
                  placeholder="State"
                  name="state"
                  onChange={this.handleInputChange}
                />
                <Form.Input
                  fluid
                  required
                  label="ZIP"
                  name="zip"
                  placeholder="ZIP"
                  onChange={this.handleInputChange}
                />
              </Form.Group>
              <Form.Group widths="equal">
                <Form.Dropdown
                  fluid
                  selection
                  search
                  label="Business Type"
                  placeholder="Business Type"
                  name="businessType"
                  onChange={this.handleInputChange}
                  options={[
                    { text: "Architect", value: "Architect" },
                    { text: "Engineer", value: "Engineer" }
                  ]}
                />
                <Form.Dropdown
                  fluid
                  selection
                  label="Number of Employees"
                  placeholder="# of employees"
                  name="numberOfEmployees"
                  options={[
                    { text: "Sole Proprietor", value: "1" },
                    { text: "2-5", value: "2-5" },
                    { text: "6-10", value: "6-10-5" },
                    { text: "over 10", value: "over 10" }
                  ]}
                  onChange={this.handleInputChange}
                />
              </Form.Group>
              <Form.Group widths="equal">
                <Form.Input
                  fluid
                  label="Filing Rep Registration Number"
                  placeholder="Filing Rep Registration Number"
                  name="frepRegistrationNumber"
                  onChange={this.handleInputChange}
                />
                <Form.Input
                  fluid
                  label="License Type"
                  placeholder="License Type"
                  name="licenseType"
                  onChange={this.handleInputChange}
                />
                <Form.Input
                  fluid
                  label="License Number"
                  name="licenseNumber"
                  placeholder="License Number"
                  onChange={this.handleInputChange}
                />
              </Form.Group>

              <Form.Field>
                <Checkbox label="I agree to the Terms and Conditions" required name="agreedToTerms" value="agreed" onChange={this.handleInputChange} />
              </Form.Field>
              <Button type="submit">Submit</Button>
            </Form>
          </Segment>
        ) : (
          <Header>Profile Complete</Header>
        )}
      </Container>
    );
  }
}

export default connect(mapStateToProps)(HomePage);
