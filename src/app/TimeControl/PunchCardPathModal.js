import React, { Component } from 'react'
import Modal from 'react-modal';
import styled from 'styled-components';
import { remote } from 'electron';
import slugify from 'slugify';

Modal.setAppElement('#app');

const ModalWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Header = styled.p`
  margin-top: 0;
  font-size: 2rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid #ccc;
`;

const Prompt = styled.p`
  margin-top: 0;
  font-size: 1.5rem;
`;

const SelectPathWrapper = styled.div`
  display: flex;
`;

const PathDisplay = styled.input.attrs({
  disabled: true,
  placeholder: 'Select a path'
})`
  display: block;
  flex: 1;
  font-size: 1.5rem;
  padding: .375rem .75rem;
  border: 1px solid #ccc;
  background-color: #efefef;
`;

const SelectButton = styled.button`
  cursor: pointer;
  font-size: 1rem;
  padding: .375rem .75rem;
  border: 0;
  color: white;
  background-color: #0072B0;
`;

const SaveButton = styled.button`
  cursor: pointer;
  margin-top: 1rem;
  font-size: 1.5rem;
  padding: .5rem 1rem;
  border: 0;
  color: white;
  background-color: #00B017;
`;

export default class PunchCardPathModal extends Component {
  state = { selectedPath: '' }

  displayFileDialog = () => {
    const { dialog } = remote;
    const { project } = this.props;
    dialog.showSaveDialog({
      defaultPath: `${slugify(project.name, '_')}.punchcard`,
    }, (filename) => {
      if (filename) {
        this.setState({ selectedPath: filename });
      }
    });
  }

  onSave = () => {
    this.props.onSetPath(this.state.selectedPath);
    this.setState({ selectedPath: '' });
  }

  render() {
    const { project } = this.props;
    const { selectedPath } = this.state;

    return (
      <Modal isOpen={!project.punchCardPath}>
        <ModalWrapper>
          <Header>{project.name} - Select punch card path</Header>
          <Prompt>Punch clock will save a <em>Punch Card</em> file storing your timestamp data for this project.</Prompt>
          <Prompt>Please select a location to store this file:</Prompt>

          <SelectPathWrapper>
            <PathDisplay value={selectedPath} />
            <SelectButton onClick={this.displayFileDialog}>Select</SelectButton>
          </SelectPathWrapper>

          {selectedPath && (
            <SaveButton onClick={this.onSave}>Done</SaveButton>
          )}
        </ModalWrapper>
      </Modal>
    )
  }
}
