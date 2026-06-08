export interface ITask {
  id: string;
  text: string;
  description: string;
}

export type NewTask = {
  text: string;
  description: string;
};
