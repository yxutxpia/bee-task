import { createContext, useReducer, useContext, useEffect } from 'react';
import { useProject } from '../hooks/useProject';

const ProjectTaskContext = createContext();

const initialState = { id: '', isFinished: false };

function reducer(state, action) {
  switch (action.type) {
    case 'projectTask/toggle':
      return {
        ...state,
        isFinished: action.payload.isFinished,
        id: action.payload.id,
      };
    default:
      throw new Error('Unknow action type');
  }
}

function ProjectTaskProvider({ children }) {
  // const { project, isLoading } = useProject();
  const [{ isFinished, id }, dispatch] = useReducer(reducer, initialState);

  // useEffect(
  //   function () {
  //     if (isLoading) return;

  //     const tasks = project?.at(0)?.tasks;
  //     console.log('TASKS: ', tasks);
  //     const newTasks = {};
  //     console.log('TASKS: ', tasks);
  //   },
  //   [isLoading, project]
  // );

  // if (isLoading) return null;

  return (
    <ProjectTaskContext.Provider value={{ isFinished, dispatch }}>
      {children}
    </ProjectTaskContext.Provider>
  );
}

function useProjectTask() {
  const context = useContext(ProjectTaskContext);

  if (context === undefined)
    throw new Error(
      'ProjectTaskContext was used outside of ProjectTaskProvier'
    );

  return context;
}

export { ProjectTaskProvider, useProjectTask };
