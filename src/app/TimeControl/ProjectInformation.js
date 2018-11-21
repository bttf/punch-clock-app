import React, { Component } from 'react';
import styled from 'styled-components';
import ClockDisplay from './ClockDisplay';

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
  font-size: 1.2rem;
  overflow: auto;
  box-shadow: inset 0 0 10px #ccc;
  white-space: nowrap;
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

export default class ProjectInformation extends Component {
  getTotalLoggedTime = () => {
    const totalTime = this.props.getTotalTime() / 1000;
    const totalTimeSeconds = (totalTime % 60) | 0;
    const totalTimeMinutes = ((totalTime / 60) % 60) | 0;
    const totalTimeHours = ((totalTime / (60 * 60)) % 24) | 0;
    const totalTimeDays = (totalTime / (60 * 60 * 24)) | 0;
    return `${totalTimeDays ? `${totalTimeDays}d ` : ''}${totalTimeHours}h ${totalTimeMinutes}m ${totalTimeSeconds}s`;
  }
  render() {
    const {
      getDelta,
      hasStarted,
      hasEnded,
      isPaused
    } = this.props;

    return (
      <ProjectInfoContainer {...this.props}>
        <TimeTable>
          <TotalTime>Total logged time: {this.getTotalLoggedTime()}</TotalTime>
          <TimeRows>
            {/* iterate and print each time entry from punchcard */}
          </TimeRows>
        </TimeTable>

        <ClockAndMemo>
          <ClockDisplayWrapper
            hasStarted={hasStarted}
            hasEnded={hasEnded}
            getDelta={getDelta}
          />
          <Memo
            disabled={hasStarted || isPaused}
            onChange={e => this.props.setMemo(e.currentTarget.value)}
          />
        </ClockAndMemo>
      </ProjectInfoContainer>
    );
  }
}
