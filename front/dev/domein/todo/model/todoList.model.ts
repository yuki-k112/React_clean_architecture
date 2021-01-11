import { TodoItem } from './todoItem.model';

export type TodoList = { [key: string]: TodoItem };

export const deleteItem = (state: TodoList, id: TodoItem['id']): TodoList => {
    return Object.fromEntries(Object.entries(state).filter(([key, value]) => key !== id.toString()));
};
export const addItem = (state: TodoList, todoItem: TodoItem): TodoList => ({ ...state, [todoItem.id]: todoItem });
