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
  outline: 0;
  cursor: pointer;
`;

export default class Trigger extends Component {
  render() {
    const sessionStatus = this.props.sessionStatus;
    return (
      <Container>
        {sessionStatus !== 'ended' ? (
          <React.Fragment>
            <TriggerButton
              type="pause"
              className={this.props.className}
              onClick={sessionStatus === 'paused' ? this.props.onUnpause: this.props.onPause}
            >
              {sessionStatus === 'paused' ? 'RESUME' : 'PAUSE'}
            </TriggerButton>
            <TriggerButton
              type="end"
              className={this.props.className}
              onClick={this.props.onStop}
            >STOP</TriggerButton>
          </React.Fragment>
        ) : (
          <TriggerButton
            type="start"
            className={this.props.className}
            onClick={this.props.onStart}
          >START</TriggerButton>
        )}
      </Container>
    );
  }
}
