import { remote } from 'electron';
import React, { Component } from 'react';
import styled from 'styled-components';
import ClockDisplay from './ClockDisplay';
import TimeLogDisplay from './TimeLogDisplay';
import parseMilliseconds from '../../lib/parseMilliseconds';

const ProjectInfoContainer = styled.div`
  text-align: left;
  display: flex;
`;

const TimeTable = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 0 .5rem 1rem 0;
  overflow: hidden;
`;

const TotalTime = styled.div`
  flex: 0;
  font-size: 1.2rem;
  margin-bottom: .5rem;
`;

const TimeRows = styled.div`
  flex: 1;
  font-size: .8rem;
  overflow: auto;
  box-shadow: inset 0 0 10px #ccc;
  white-space: nowrap;
  padding: 0.5rem;
`;

const ClockAndMemo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding-bottom: 1rem;
`;

const ClockDisplayWrapper = styled(ClockDisplay)`
  flex: 1;
`;

const Memo = styled.input.attrs({
  placeholder: '(optional) enter a memo about this task'
})`
  flex: 0;
  font-size: .8rem;
  padding: .5rem;
  ${props => props.disabled ? 'background-color: hsl(0,0%,95%)' : ''}
`;

const Byline = styled.div`
  font-size: 12px;
  color: #aaa;
  padding-bottom: 12px;
  text-align: right;

  a {
    color: #aaa;
    cursor: pointer;
  }
`;

export default class ProjectInformation extends Component {
  getTotalLoggedTime = () => {
    const { seconds, minutes, hours } =
      parseMilliseconds(this.props.totalProjectTime);
    const totalTimeHours = (hours % 24) | 0;
    const totalTimeDays = (hours / 24) | 0;
    return `${totalTimeDays ? `${totalTimeDays}d ` : ''}${totalTimeHours}h ${minutes}m ${seconds}s`;
  }

  removeSession = (session) => {
    this.props.removeSession(session);
  }

  render() {
    const {
      getDelta,
      timeCardLogs,
      hasStarted,
      hasEnded,
      isPaused
    } = this.props;

    return (
      <ProjectInfoContainer {...this.props}>
        <TimeTable>
          <TotalTime>Total logged time: {this.getTotalLoggedTime()}</TotalTime>
          <TimeLogDisplay
            logs={timeCardLogs}
            removeSession={this.removeSession}
          />
        </TimeTable>

        <ClockAndMemo>
          <ClockDisplayWrapper
            hasStarted={hasStarted}
            hasEnded={hasEnded}
            getDelta={getDelta}
          />
          <Byline>LCD clock by <a onClick={() => remote.shell.openExternal('https://codepen.io/christianhanvey/pen/imKIb')}>@christianhanvey</a></Byline>
          <Memo
            disabled={hasStarted || isPaused}
            value={this.props.memo}
            onChange={e => this.props.setMemo(e.currentTarget.value)}
          />
        </ClockAndMemo>
      </ProjectInfoContainer>
    );
  }
}
