import React from "react";
import ReactDOM from "react-dom";
import { connect } from "react-redux";
import { Button, Segment, Container, Grid } from "semantic-ui-react";
import PropTypes from "prop-types";
import axios from "axios";
  

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
      pdf: "http://localhost:8080/static/pdf/peo1.pdf",
      licenseKey:
        "xfG6eSjNQgaaSbCsa0zt6GzxfQm8k7AfZwxT2T44OS7QCjbdwdAbeX2GixYWwSpLHSXPKkWkkDqCV9mtrUTeSl-moal1tNFXgKUZljwxfj593MzUuiqNhFxM-W7BOXG4wQt4kv3UWquhFFvFL2ielwnjgnJO3lVZ69Gy5rsuInSi4O7w-wojk1P-9iWUi5QJVfRKwEC5KwRQBTtO9x6WlXpIMrjSIy3CuWu1T92JeU-x0Xk0sVphcBBXK3YWdTcqXXWLX5W-Tw6rSnpTdhhRMYh7S1y7JFoiYqjMGYdzN1_oojwokreKrrGAVKZAoEdg1Fe8egkFGsOQRbKCEMepWr50yZyWK9hEEiKRNMEW-LpKP9vDE4jemQNJYmaxdX47SwNtMU21TPcds88IP6wdVJncpVKEi6K__2BWmFtSKY92Nu5v0R_4Dhhz0yOA8r0k"
    })
      .then(instance => {
        console.log("PSPDFKit loaded", instance);
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

  render() {
    return <Container>
<div id="pdfTarget" className="pdf-target" style={{width: '1000px', height: '1000px'}}/>
              </Container>
  }
}

export default App;
