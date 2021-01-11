import { TodoList } from '../model/todoList.model';

export type FetchTodoListOutput = Promise<TodoList>;
export type FetchTodoListInput = () => Promise<TodoList>;

export const fetchTodoList = (func: FetchTodoListInput): FetchTodoListOutput => func();
