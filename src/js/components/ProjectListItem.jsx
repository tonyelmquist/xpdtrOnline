import React, { Component } from "react";
import { Table } from "semantic-ui-react";

class ProjectListItem extends Component {

  render() {
    const { projectId, project } = this.props;
    return (
      <Table.Row>
        <Table.Cell>{project["projectName"]}</Table.Cell>
        <Table.Cell>{project["building"]}</Table.Cell>
        <Table.Cell>{project["projectType"]}</Table.Cell>
      </Table.Row>
    );
  }
}

export default ProjectListItem;
