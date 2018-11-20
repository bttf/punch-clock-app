import React, { Component } from 'react'
import Creatable from 'react-select/lib/Creatable';
import styled, { createGlobalStyle } from 'styled-components';
import uuid from 'uuid/v4';
import TimeControl from './TimeControl';
import {
  loadProjects,
  createProject,
  updateProject,
} from './lib/localStorage';

const GlobalStyle = createGlobalStyle`
  body {
    color: #2c3e50;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  }
`;

const AppWrapper = styled.div`
  margin: 0 auto;
  max-width: 600px;
  text-align: center;
`;

const I = styled.span`
  font-style: italic;
`;

const Title = styled.div`
  font-size: 48px;
  font-weight: 700;
  padding: 1rem 0;
`;

const ProjectSelectPrompt = styled.p`
  text-align: center;
`;

const ProjectSelect = styled.div`
  margin: 1rem 0;
  color: #aaa;
`;

const genOption = (project) => ({ label: project.name, value: project.id });

export default class App extends Component {
  constructor(props) {
    super(props);

    const projects = loadProjects().sort((a, b) => {
      return new Date(b.lastOpened) - new Date(a.lastOpened);
    });

    this.state = {
      isDisabled: false,
      projects,
      selectedProject: !!projects.length && projects[0],
    };
  }

  selectProject = (option) => {
    const project = option ?
      this.state.projects.find(p => p.id === option.value) : null;

    project.lastOpened = new Date().toJSON();

    updateProject(project);

    this.setState({ selectedProject: project });
  }

  createProject = (projectName) => {
    const newProject = {
      id: uuid(),
      name: projectName,
      lastOpened: new Date().toJSON(),
    };

    createProject(newProject);

    this.setState({
      projects: [...this.state.projects, newProject],
      selectedProject: newProject,
    });
  }

  reloadProject = (project) => {
    const reloadedProject = loadProjects().find(p => p.id === project.id);
    this.setState({
      selectedProject: reloadedProject,
    })
  }

  disableInputs = (isDisabled) => {
    this.setState({
      isDisabled,
    })
  }

  render() {
    const { selectedProject } = this.state;
    return (
      <React.Fragment>
        <GlobalStyle />
        <AppWrapper>
          <Title>⏱ <I>Punch clock</I> 🥊</Title>

          <ProjectSelect>
            <ProjectSelectPrompt>Select project</ProjectSelectPrompt>
            <Creatable
              isDisabled={this.state.isDisabled}
              isClearable
              placeholder="Select or type to create"
              onChange={this.selectProject}
              onCreateOption={this.createProject}
              options={this.state.projects.map(genOption)}
              value={selectedProject ? genOption(selectedProject) : null}
            />
          </ProjectSelect>

          {selectedProject && (
            <TimeControl
              project={selectedProject}
              reloadProject={this.reloadProject}
              onStartTime={() => this.disableInputs(true)}
              onEndTime={() => this.disableInputs(false)}
            />
          )}
        </AppWrapper>
      </React.Fragment>
    );
  }
}
