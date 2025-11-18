import useLocalStorage from "use-local-storage";
import { TASKS_KEY, type Task } from "../models/task";
import { TaskState } from "../models/task";
import { delay } from "../helpers/utils";
import React from "react";

export default function useTasks() {
  const [TasksData] = useLocalStorage<Task[]>(TASKS_KEY, []);
  const [tasks, setTasks] = React.useState<Task[]>([]);
  const [isLoadingTasks, setIsLoadingTasks] = React.useState(true);

  async function fetchTasks() {
    if (isLoadingTasks) {
      console.time("Carregando tarefas...");
      await delay(2000);
      setIsLoadingTasks(false);
    }

    setTasks(TasksData);
    console.timeEnd("Carregando tarefas...");
  }

  React.useEffect(() => {
    fetchTasks();
  }, [TasksData]);

  return {
    tasks,
    createdTasksCount: tasks.filter((task) => task.state === TaskState.Created)
      .length,
    concludedTasksCount: tasks.filter((task) => task.concluded).length,
    isLoadingTasks
  };
}
