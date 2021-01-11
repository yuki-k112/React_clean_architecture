import { TodoItem } from '../model/todoItem.model';
import { deleteItem, TodoList } from '../model/todoList.model';

type deleteTodoItemOutput = TodoList;
type deleteTodoItemInput = {
    state: TodoList;
    item: TodoItem;
};

export const deleteTodoItem = (
    state: deleteTodoItemInput['state'],
    item: deleteTodoItemInput['item'],
): deleteTodoItemOutput => deleteItem(state, item.id);
