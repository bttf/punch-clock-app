import { LOCAL_STORAGE_KEY } from './constants';

export const loadMain = () => {
  let payload;
  try {
    payload = JSON.parse(
      window.localStorage.getItem(LOCAL_STORAGE_KEY)
    ) || {};
  } catch(e) {
    payload = {};
  }
  return payload;
};

export const loadProjects = () => {
  const main = loadMain();
  return main.projects || [];
}

export const saveProjects = (projects) => {
  const main = loadMain();

  window.localStorage.setItem(
    LOCAL_STORAGE_KEY,
    JSON.stringify({
      ...main,
      projects: projects || [],
    }),
  );
}

export const createProject = (project) => {
  const projects = loadProjects();

  projects.push(project);

  saveProjects(projects);
}

export const updateProject = (project) => {
  const projects = loadProjects();
  const projectId = project && project.id;

  saveProjects(projects.map(p => {
    return p.id !== projectId ? p : project;
  }));
}
