import { configureStore } from '@reduxjs/toolkit';
import todoReducer from './todoReducer';

const store = configureStore({
    reducer: {
        todo: todoReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
