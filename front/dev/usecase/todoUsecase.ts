import { Todo } from '../domein/todo/todo';
import { addTodo, deleteTodo, TodoList } from '../domein/todo/todoList';

export type TodoListOutput = TodoList;
export type FetchTodoOutput = Promise<TodoList>;

export type DeleteTodoInput = {
    state: TodoList;
    id: Todo['id'];
};

export type AddTodoInput = {
    state: TodoList;
    todo: Todo;
};

export type FetchTodoInput = () => FetchTodoOutput;

export const deleteTodoInteractor = (item: DeleteTodoInput): TodoListOutput => deleteTodo(item.state, item.id);

export const addTodoInteractor = (item: AddTodoInput): TodoListOutput => addTodo(item.state, item.todo);

export const fetchTodoInteractor = (fetch: FetchTodoInput): FetchTodoOutput => fetch();
