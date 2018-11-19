import React, { Component } from 'react'
import Modal from 'react-modal';
import styled from 'styled-components';
import PunchCardPathModal from './PunchCardPathModal';
import {
  updateProject,
} from '../lib/localStorage';

export default class ProjectPanel extends Component {
  onSetPunchCardPath = (path) => {
    const { project } = this.props;
    updateProject({
      ...project,
      punchCardPath: path,
    });
    this.props.reloadProject(project);
  }

  render() {
    const { project } = this.props;
    return (
      <div>
        <PunchCardPathModal
          project={project}
          onSetPath={this.onSetPunchCardPath}
        />
      </div>
    );
  }
}
