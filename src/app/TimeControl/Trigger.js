import React, { Component } from 'react';
import styled from 'styled-components';

const Container = styled.div`
   flex: 1;
  display: flex;
`;

const TriggerButton = styled.button`
  flex: 1;
  font-size: 4rem;
  background: linear-gradient${({ type }) => {
    if (type === 'start') return '(#429321, #B4EC51)';
    if (type === 'pause') return '(#215E94, #51A4ED)';
    if (type === 'end') return '(#9F041B, #F5515F)';
  }};
  color: white;
  font-weight: bold;
`;

export default class Trigger extends Component {
  render() {
    const hasStarted = this.props.startTime && !this.props.endTime;
    return (
      <Container>
        {hasStarted ? (
          <React.Fragment>
            <TriggerButton
              type="end"
              className={this.props.className}
              onClick={this.props.onClick}
            >STOP</TriggerButton>
            <TriggerButton
              type="pause"
              className={this.props.className}
              onClick={this.props.onClick}
            >PAUSE</TriggerButton>
          </React.Fragment>
        ) : (
          <TriggerButton
            type="start"
            className={this.props.className}
            onClick={this.props.onClick}
          >START</TriggerButton>
        )}
      </Container>
    );
  }
}
