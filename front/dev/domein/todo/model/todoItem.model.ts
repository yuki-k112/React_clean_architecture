export type TodoItem = {
    id: number;
    title: string;
};

export const getTask = (todo: TodoItem): string => todo.title;
export const getId = (todo: TodoItem): number => todo.id;
