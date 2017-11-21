export interface IAction<T> {
  type: string;
  meta?: any;
  payload?: T;
  error?: Error;
}
