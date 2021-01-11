import React, { FC } from 'react';
import { TodoItem, TodoItemProps } from '../molecules/TodoItem';

export type TodoListProps = {
    list: TodoItemProps[];
    handleDelete: any;
    handleAdd: any;
};

export const TodoList: FC<TodoListProps> = ({ list, handleDelete }) => (
    <ul>
        {list.map((item) => (
            <li key={item.id}>
                <TodoItem id={item.id} title={item.title} />
                <button onClick={handleDelete(item)}>delete</button>
            </li>
        ))}
    </ul>
);
