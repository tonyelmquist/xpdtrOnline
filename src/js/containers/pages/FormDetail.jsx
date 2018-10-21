/*import React, { Component } from "react";
import PSPDFKitWeb from "pspdfkit";

export default class PSPDFKit extends Component {
  constructor(props, context) {
    super(props, context);
    this._instance = null;
    this._container = null;

    this.onRef = this.onRef.bind(this);
    this.load = this.load.bind(this);
    this.unload = this.unload.bind(this);
  }

  onRef(container) {
    this._container = container;
  }

  async load(props) {
    console.log(`Loading ${props.pdfUrl}`);

    this._instance = await PSPDFKitWeb.load({
      pdf: props.pdfUrl,
      container: this._container,
      licenseKey: props.licenseKey,
      baseUrl: props.baseUrl
    });
    console.log("Successfully mounted PSPDFKit", this._instance);
  }

  unload() {
    PSPDFKitWeb.unload(this._instance || this._container);
    this._instance = null;
  }

  componentDidMount() {
    this.load(this.props);
  }

  componentDidUpdate(nextProps) {
    this.unload();
    this.load(nextProps);
  }

  componentWillUnmount() {
    this.unload();
  }

  render() {
    return <div ref={this.onRef} style={{ width: "100%", height: "100%", position: "absolute" }} />;
  }
}*/


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
      licenseKey: "JEWtVj4khW1LJSVKmWg2763WtluuBtvGzYmzD-2yGiAlBn_VyfiKtGjkSAHqakcZHSCSKbFUtx5uY8ffQ87lAvMLtmd4Z5ZVKOYd_UC-5liMcp0CFKUMcLa0y7I-jYQ7YeWDxSJa_2Y-IBOz5f_njPOSVtwqjr88hG3xsC2uXQ0YMWKEudyvN4Hgk26XWFiS-43D61SJUEzrtRphYfrgMRIkrg9c9eCGInPtIeT6C7ZkWjotjJVvfzAizA8Cat4laMLMDi7IOrdsWAY1kGC5E3B4VNJsKyS4KOqeaEf5i_CAFn3iA2HgDLHsU5RcBbCZd3b04VlwUFo6N8doDiIRFfjOckDHIykQUXnlp7uHK-I-iRn7fX2z0GAzTH_5qZKy7hxE724Qz4-mJK8WB5FC1idjWtjZVLaf-oX6JaHiE_098kQMeMCwgkJkN9ct1AtK"
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
