import React, { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TodoList as TodoListModel } from '~/domein/todo/model/todoList.model';
import { fetchTodoList } from '~/domein/todo/usecase/fetchTodoList.usecase';
import { fetchTodoRepository } from '~/domein/todo/repository/fetchTodo.repository';
import { todoSlice } from '~/store/todoReducer';
import { TodoList } from '../components/organisms/TodoList';
import { RootState } from '../store';

export const TodoListContainer: FC = () => {
    const todoList = Object.entries(useSelector((state: RootState) => state.todo)).map(([key, value]) => ({
        ...value,
    }));
    const dispatch = useDispatch();
    const { addTodo, deleteTodo } = todoSlice.actions;
    const handleDelete = (todo: RootState['todo'][string]) => () => dispatch(deleteTodo(todo));
    const handleAdd = (todo: RootState['todo'][string]) => () => dispatch(addTodo(todo));

    // fetch test
    const [todos, setTodos] = useState<TodoListModel>({});
    const fetchTodos = async () => {
        setTodos(await fetchTodoList(fetchTodoRepository));
    };
    useEffect(() => {
        fetchTodos();
    }, []);

    return <TodoList list={todoList} handleDelete={handleDelete} handleAdd={handleAdd} />;
};
