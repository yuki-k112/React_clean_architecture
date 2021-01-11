import { TodoItem } from '../model/todoItem.model';

export type SaveTodoOutput = Promise<any>;
export type SaveTodoItemInput = {
    item: TodoItem;
    repository: (item: TodoItem) => Promise<any>;
};

export const saveTodoItem = (item: SaveTodoItemInput['item'], repository: SaveTodoItemInput['repository']) =>
    repository(item);
