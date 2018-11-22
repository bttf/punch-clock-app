import React, { Component } from 'react';
import styled from 'styled-components';

const TimeLogRowContainer = styled.div`
  flex: 1;
  font-size: .8rem;
  overflow: auto;
  box-shadow: inset 0 0 10px #ccc;
  white-space: nowrap;
  padding: 0.5rem;
`;

const LogItem = styled.div`
  position: relative;

  .delete-button {
    cursor: pointer;
    display: none;
    color: red;
    padding-left: .5rem;
  }

  .delete-button:hover {
    text-decoration: underline;
  }

  &:hover .delete-button {
    display: inline-block;
  }
`;

export default class TimeLogRow extends Component {
  render() {
    const { logs } = this.props;
    return (
      <TimeLogRowContainer>
        {logs.map((log, index) => (
          <LogItem key={index}>
            {log.displayTotal}
            <div className="delete-button" onClick={() => this.props.removeSession(log.session)}>
              delete
            </div>
          </LogItem>
        ))}
      </TimeLogRowContainer>
    );
  }
}
