import React, { Component } from 'react';
import Modal from 'react-modal';
import styled from 'styled-components';
import TimeCardManager from '../lib/timeCardManager';
import TimeCardPathModal from './TimeCardPathModal';
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
  constructor(props) {
    super(props);

    this.timeCardManager = new TimeCardManager(props.project.timeCardPath);

    this.state = {
      memo: '',
      sessionStatus: this.timeCardManager.getCurrentSessionStatus(),
      timeCardLogs: this.timeCardManager.getTimeCardLogs(),
      totalProjectTime: this.timeCardManager.getTotalTime(),
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.project.id !== this.props.project.id) {
      this.timeCardManager = new TimeCardManager(this.props.project.timeCardPath);
      this.setState({
        memo: '',
        sessionStatus: this.timeCardManager.getCurrentSessionStatus(),
        timeCardLogs: this.timeCardManager.getTimeCardLogs(),
        totalProjectTime: this.timeCardManager.getTotalTime(),
      })
    }
  }

  onSetTimeCardPath = (path) => {
    const { project } = this.props;
    updateProject({
      ...project,
      timeCardPath: path,
    });
    this.props.reloadProject(project);
  }

  onStartSession = () => {
    this.props.onStartTime();
    this.timeCardManager.startSession(this.state.memo);
    this.setState({
      sessionStatus: this.timeCardManager.getCurrentSessionStatus(),
    });
  }

  onPauseSession = () => {
    this.timeCardManager.pauseSession();
    this.setState({
      sessionStatus: this.timeCardManager.getCurrentSessionStatus(),
    });
  }

  onUnpauseSession = () => {
    this.timeCardManager.unpauseSession();
    this.setState({
      sessionStatus: this.timeCardManager.getCurrentSessionStatus(),
    });
  }

  onStopSession = () => {
    this.props.onEndTime();
    this.timeCardManager.stopSession();
    this.setState({ memo: '' });
    this.setState({
      sessionStatus: this.timeCardManager.getCurrentSessionStatus(),
      timeCardLogs: this.timeCardManager.getTimeCardLogs(),
      totalProjectTime: this.timeCardManager.getTotalTime(),
    });
  }

  removeSession = (session) => {
    this.timeCardManager.removeSession(session);
    this.setState({
      sessionStatus: this.timeCardManager.getCurrentSessionStatus(),
      timeCardLogs: this.timeCardManager.getTimeCardLogs(),
      totalProjectTime: this.timeCardManager.getTotalTime(),
    });
  }

  render() {
    const { project } = this.props;
    const { memo, sessionStatus, timeCardLogs, totalProjectTime } = this.state;
    return (
      <React.Fragment>
        <Container>
          <ProjectInformationWrapper
            getDelta={() => this.timeCardManager.getCurrentSessionDelta()}
            timeCardLogs={timeCardLogs}
            totalProjectTime={totalProjectTime}
            isPaused={sessionStatus === 'paused'}
            hasStarted={sessionStatus === 'started'}
            hasEnded={sessionStatus === 'ended'}
            memo={memo}
            setMemo={(memo => this.setState({ memo }))}
            removeSession={this.removeSession}
          />
          <TriggerWrapper
            sessionStatus={sessionStatus}
            onStart={this.onStartSession}
            onPause={this.onPauseSession}
            onUnpause={this.onUnpauseSession}
            onStop={this.onStopSession}
          />
        </Container>

        {/* Displays only if project.timeCardPath is not set */}
        <TimeCardPathModal
          project={project}
          onSetPath={this.onSetTimeCardPath}
        />
      </React.Fragment>
    );
  }
}
