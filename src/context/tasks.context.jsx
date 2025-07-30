import { createContext, useState } from "react";

export const TasksContext = createContext({
  tasks: undefined,
  setTasks: () => {},
});

export const TasksContextProvider = (props) => {
  const [tasks, setTasks] = useState();

  return (
    <TasksContext.Provider value={{ tasks: tasks, setTasks: setTasks }}>
      {props.children}
    </TasksContext.Provider>
  );
};
