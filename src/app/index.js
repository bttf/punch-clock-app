import React, { Component } from 'react'
import Creatable from 'react-select/lib/Creatable';
import styled from 'styled-components';
import uuid from 'uuid/v4';
import Modal from 'react-modal';
import {
  loadProjects,
  createProject,
  updateProject,
} from './lib/localStorage';

const AppWrapper = styled.div`
  margin: 0 auto;
  max-width: 600px;
  color: #2c3e50;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
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
      projects,
      selectedProject: projects.length && projects[0],
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

  render() {
    const { selectedProject } = this.state;
    return (
      <AppWrapper>
        <Title>⏱ <I>Clock-In</I></Title>

        <ProjectSelect>
          <ProjectSelectPrompt>Select project</ProjectSelectPrompt>
          <Creatable
            isClearable
            onChange={this.selectProject}
            onCreateOption={this.createProject}
            options={this.state.projects.map(genOption)}
            value={selectedProject ? genOption(selectedProject) : null}
          />
        </ProjectSelect>

      </AppWrapper>
    );
  }
}
