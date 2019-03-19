import React from "react";
import ReactDOM from "react-dom";
import { connect } from "react-redux";
import { Button, Segment, Container, Grid } from "semantic-ui-react";
import PropTypes from "prop-types";
import axios from "axios";
import PSPDFKit from "pspdfkit";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true
    };
  }



  componentDidMount = () => {
    PSPDFKit.load({
      container: "#pdfTarget",
      pdf: "/static/pdf/l2.pdf",
      licenseKey: "rXG9hlOFZQGNFzHRawfA0PvMNuCJYhKtY5OGQ1XXJ3_7gXao4xgFNWsFVj5J9IN66v3BPCiMgvC2uofjkWQMUO5JhV8XXMRBYO9pirl1TBgHYt3VNQR2rkG9bRJzAZAM6FbxOxUNyFBPVG_8sZbNiXida2gCRQ5lJb5nkw7eqUr_GYvFUGlDLsSYkKeJznsAY_ltl19b7f6JRsfiBL6-cWU4oEH6en7M4W6rue4z0W9c8raSIreUKv5RFDOiBDa43U1gAjrvJzEqOjTY7mHa262FK1bRKbtNZEXrm_LuH8ZZGPLTOLgG6B-r5AvU0SeHXzKdHGdX6KTtuoUiVKmv-c7y1PEEv-kfSrlhkE_TRGBD9SO1kmCSEV7oA_UVUqz-v7LDs2Kmn7sPZaxz9on7bIudg5zNpg5dZ3h91E09ZLvE5rkdNX3NyV9OvbAyIox0"
   })
      .then(instance => {
        console.log("PSPDFKit loaded", instance);
        this.instance = instance;
      instance.getFormFields().then(function(formFields) {
      
  // Update the value of all text form fields
  var updatedFormFieldValues = {};
  formFields.forEach(function(formField) {
    console.log(formField.name);
    if (formField instanceof PSPDFKit.FormFields.TextFormField) {
      updatedFormFieldValues[formField.name] = "New Value";
    }
    updatedFormFieldValues['borough'] = "Brooklyn";
  });
  instance.setFormFieldValues(updatedFormFieldValues);
});

      })
      .catch(error => {
        console.error(error.message);
      });
  };

  saveForm = () => {
    console.log(PSPDFKit);
    console.log(this.instance.getFormFieldValues())
  };


  render() {
    return <Container>
<div id="pdfTarget" className="pdf-target" style={{width: '1000px', height: '1000px'}}/>
<Button onClick={this.saveForm}>Save form</Button>
              </Container>
  }
}

export default App;
