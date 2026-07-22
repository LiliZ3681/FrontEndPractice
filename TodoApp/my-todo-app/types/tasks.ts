export interface ITask {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  date: string;
}

export type NewTask = {
  // id: number;
  title: string;
  description: string;
  completed: boolean;
  date: string;
};

export type TaskFormValues = {
  // id: number;
  title: string;
  description: string;
  completed: boolean;
  date: string;
};
