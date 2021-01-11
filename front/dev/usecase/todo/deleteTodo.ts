import { Todo } from '../../domein/todo/todo';
import { deleteTodo, TodoList } from '../../domein/todo/todoList';

export type DeleteTodoOutput = TodoList;
export type DeleteTodoInput = {
    state: TodoList;
    id: Todo['id'];
};

export const deleteTodoInteractor = (item: DeleteTodoInput): DeleteTodoOutput => deleteTodo(item.state, item.id);
