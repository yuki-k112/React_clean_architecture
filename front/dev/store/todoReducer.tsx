import { createSlice } from '@reduxjs/toolkit';
import { addTodoItem } from '~/domein/todo/usecase/addTodoItem.usecase';
import { TodoList } from '~/domein/todo/model/todoList.model';
import { deleteTodoItem } from '~/domein/todo/usecase/deleteTodoItem.usecase';

export type TodoSliceState = TodoList;

const initialState: TodoSliceState = {
    '1': {
        id: 1,
        title: 'title1',
    },
    '2': {
        id: 2,
        title: 'title2',
    },
};

export const todoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {
        addTodo(state, action) {
            return addTodoItem(state, action.payload);
        },
        deleteTodo(state, action) {
            return deleteTodoItem(state, action.payload);
        },
    },
});

export const { addTodo, deleteTodo } = todoSlice.actions;

// Todo 非同期処理の実装

export default todoSlice.reducer;
