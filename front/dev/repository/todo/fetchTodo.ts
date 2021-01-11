import { FetchTodoInput } from '~/usecase/todoUsecase';

export const fetchTodo: FetchTodoInput = async () => (await fetch('https://jsonplaceholder.typicode.com/todos')).json();
