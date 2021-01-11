import React, { FC } from 'react';

export type TodoItemProps = {
    id: number;
    title: string;
};

export const TodoItem: FC<TodoItemProps> = ({ id, title }) => (
    <div>
        <p>{id}</p>
        <p>{title}</p>
    </div>
);
