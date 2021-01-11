import { TodoItem } from '../model/todoItem.model';
import { addItem, TodoList } from '../model/todoList.model';

export type AddTodoItemOutput = TodoList;
export type AddTodoItemInput = {
    state: TodoList;
    item: TodoItem;
};

export const addTodoItem = (state: AddTodoItemInput['state'], item: AddTodoItemInput['item']): AddTodoItemOutput => {
    return addItem(state, item);
};
