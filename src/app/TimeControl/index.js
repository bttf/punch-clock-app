import React, { Component } from 'react';
import Modal from 'react-modal';
import styled from 'styled-components';
import PunchCardPathModal from './PunchCardPathModal';
import ProjectInformation from './ProjectInformation';
import Trigger from './Trigger'
import {
  updateProject,
} from '../lib/localStorage';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 400px;
`;

const ProjectInformationWrapper = styled(ProjectInformation)`
  flex: 1;
`;

const TriggerWrapper = styled(Trigger)`
  flex: 1;
`;

export default class TimeControl extends Component {
  state = {
    startTime: null,
    endTime: null,
  }

  onSetPunchCardPath = (path) => {
    const { project } = this.props;
    updateProject({
      ...project,
      punchCardPath: path,
    });
    this.props.reloadProject(project);
  }

  setTime = () => {
    const isStartingTime = !this.state.startTime && !this.state.endTime;
    const isEndingTime = this.state.startTime && !this.state.endTime;

    if (isStartingTime) {
      this.props.onStartTime();
      this.setState({ startTime: new Date() });
    } else if (isEndingTime) {
      this.props.onEndTime();
      this.setState({ endTime: new Date() });
    } else {
      this.props.onStartTime();
      this.setState({ startTime: new Date(), endTime: null });
    }
  }

  render() {
    const { project } = this.props;
    return (
      <React.Fragment>
        <Container>
          <ProjectInformationWrapper startTime={this.state.startTime} endTime={this.state.endTime} />
          <TriggerWrapper onClick={this.setTime} startTime={this.state.startTime} endTime={this.state.endTime} />
        </Container>


        {/* Displays only if project.punchCardPath is not set */}
        <PunchCardPathModal
          project={project}
          onSetPath={this.onSetPunchCardPath}
        />
      </React.Fragment>
    );
  }
}
