import React, { Component } from "react";
import PropTypes from "prop-types";
import { Container, Segment, Table, Header, Form } from "semantic-ui-react";
import { firebaseConnect, withFirebase } from "react-redux-firebase";

import contactConfig from '../../config/contactConfig';

class ProjectAdd extends Component {
  state = {
    addFormVisible: false,
    project: {
      userID: this.props.user.uid
    }
  };

  handleInputChange = (e, { name, value }) => {
    this.setState(prevState => ({
      project: {
        ...prevState.project,
        [name]: value
      }
    }));
  };

  handleFormSubmit = event => {
    this.props.firebase.push("projects", this.state.project);
  };

  constructor(props) {
    super(props);
  }

renderForm = () => {
        let model = contactConfig;
        let defaultValues = this.props.defaultValues;
        
        let formUI = model.map((m) => {
            let key = m.key;
            let type = m.type || "text";
            let props = m.props || {};
            let name= m.name;
            let value = m.value;

            let target = key;  
            value = this.state[target];

            let input =  <input {...props}
                    className="form-input"
                    type={type}
                    key={key}
                    name={name}
                    value={value}
                    onChange={(e)=>{this.onChange(e, target)}}
                />;

            if (type == "radio") {
               input = m.options.map((o) => {
                   let checked = o.value == value;
                    return (
                        <React.Fragment key={'fr' + o.key}>
                            <input {...props}
                                    className="form-input"
                                    type={type}
                                    key={o.key}
                                    name={o.name}
                                    checked={checked}
                                    value={o.value}
                                    onChange={(e)=>{this.onChange(e, o.name)}}
                            />
                            <label key={"ll" +o.key }>{o.label}</label>
                        </React.Fragment>
                    );
               });
               input = <div className ="form-group-radio">{input}</div>;
            }

            if (type == "select") {
                input = m.options.map((o) => {
                    let checked = o.value == value;
                    console.log("select: ", o.value, value);
                     return (
                            <option {...props}
                                className="form-input"
                                key={o.key}
                                value={o.value}
                            >{o.value}</option>
                     );
                });

                console.log("Select default: ", value);
                input = <select value={value} onChange={(e)=>{this.onChange(e, m.key)}}>{input}</select>;
             }

             if (type == "checkbox") {
                input = m.options.map((o) => {
                    
                    //let checked = o.value == value;
                    let checked = false;
                    if (value && value.length > 0) {
                        checked = value.indexOf(o.value) > -1 ? true: false;
                    }
                    console.log("Checkbox: ",checked);
                     return (
                        <React.Fragment key={"cfr" + o.key}>
                            <input {...props}
                                className="form-input"
                                type={type}
                                key={o.key}
                                name={o.name}
                                checked={checked}
                                value={o.value}
                                onChange={(e)=>{this.onChange(e, m.key,"multiple")}}
                            />
                            <label key={"ll" +o.key }>{o.label}</label>
                        </React.Fragment>
                     );
                });

                input = <div className ="form-group-checkbox">{input}</div>;

             }
            
            return (
                <div key={'g' + key} className="form-group">
                    <label className="form-label"
                        key={"l" + key}
                        htmlFor={key}>
                        {m.label}
                    </label>
                    {input}
                </div>
            );
        });
        return formUI;
    

  render() {
    return (
      <Segment fluid className="app-content">
        <Form onSubmit={this.handleFormSubmit}>
          <Form.Group widths="equal">
            <Form.Input
              fluid
              label="Project Name"
              placeholder="Project Name"
              name="projectName"
              required
              onChange={this.handleInputChange}
            />
            <Form.Input
              fluid
              label="Building"
              placeholder="Building"
              name="building"
              onChange={this.handleInputChange}
            />
            <Form.Dropdown
              fluid
              label="Type"
              name="projectType"
              options={[
                { text: "type 1", value: "type 1" },
                { text: "type 2", value: "type 2" }
              ]}
              placeholder="Type"
              search
              selection
              onChange={this.handleInputChange}
            />
          </Form.Group>
           <Form.Group widths="equal">
            <Form.Input
              fluid
              label="Status"
              placeholder="Status"
              name="status"
              onChange={this.handleInputChange}
            />
            <Form.Input
              fluid
              label="Project Manager"
              placeholder="Project Manager"
              name="projectManager"
              onChange={this.handleInputChange}
            />
            <Form.Dropdown
              fluid
              label="Assigned To"
              name="assignedTo"
              options={[
                { text: "type 1", value: "type 1" },
                { text: "type 2", value: "type 2" }
              ]}
              placeholder="Assigned To"
              search
              selection
              onChange={this.handleInputChange}
            />
          </Form.Group>
          <Form.Button>Submit</Form.Button>
        </Form>
      </Segment>
    );
  }
}

ProjectAdd.propTypes = {
  firebase: PropTypes.shape({
    push: PropTypes.func.isRequired
  })
};

export default withFirebase(ProjectAdd);
