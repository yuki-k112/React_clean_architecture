import { SaveTodoItemInput } from '../usecase/saveTodoItem.usecase';

export const addTodoRepository: SaveTodoItemInput['repository'] = (item) => {
    const url = 'https://jsonplaceholder.typicode.com/todos';
    const method = 'POST';
    const headers = {
        'Content-Type': 'application/json',
    };
    const body = JSON.stringify(item);

    return fetch(url, { method, headers, body });
};
