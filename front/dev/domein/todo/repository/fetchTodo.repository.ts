import { TodoItem } from '../model/todoItem.model';
import { TodoList } from '../model/todoList.model';
import { FetchTodoListInput } from '../usecase/fetchTodoList.usecase';

type TodoApi = (TodoItem & { [key: string]: any })[];

export const fetchTodoRepository: FetchTodoListInput = () => {
    const isTodoApi = (arg: unknown): arg is TodoApi => {
        const t = arg as TodoApi;
        return typeof t?.[0]?.id === 'number' && typeof t?.[0]?.title === 'string';
    };

    const mapTodoList = (data: TodoApi): TodoList => {
        const filteredData = data.map((item) => ({ id: item.id, title: item.title }));
        return Object.fromEntries(filteredData.map((item) => [item.id, item]));
    };

    const fetchTodos = async () => {
        try {
            const res = await fetch('https://jsonplaceholder.typicode.com/todos');
            const data = await res.json();
            if (isTodoApi(data)) {
                return data;
            } else {
                throw new Error('Invalid Response Format');
            }
        } catch (error) {
            throw new Error(error);
        }
    };

    return fetchTodos()
        .then((data) => mapTodoList(data))
        .catch((error) => {
            throw new Error(error);
        });
};
