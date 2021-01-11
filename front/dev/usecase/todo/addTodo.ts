import { Todo } from '../../domein/todo/todo';
import { TodoList } from '../../domein/todo/todoList';

export type AddTodoOutput = TodoList;
export type AddTodoInput = {
    state: TodoList;
    todo: Todo;
};

export const addTodo = (item: AddTodoInput): AddTodoOutput => [...item.state, item.todo];
