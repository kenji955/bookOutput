import React, { useState } from "react";
import {
    BrowserRouter as Router,
    Route,
    Redirect,
    Switch,
} from "react-router-dom";

import TodoList from "./components/TodoList";
import NewTodo from "./components/NewTodo";
import { Todo } from "./todo.model";
import MainNavigation from "./shared/Navigation/MainNavigation";

const App: React.FC = () => {
    const [todos, setTodos] = useState<Todo[]>([]);

    const todoAddHandler = (text: string) => {
        setTodos((prevTodos) => [
            ...prevTodos,
            { id: Math.random().toString(), text: text },
        ]);
    };

    const todoDeleteHandler = (todoId: string) => {
        setTodos((prevTodos) => {
            return prevTodos.filter((todo) => todo.id !== todoId);
        });
    };

    return (
        <React.Fragment>
            <div style={{ display: "inline-block" }}>
                <Router>
                    <MainNavigation />
                </Router>
            </div>
            <div className="App">
                <NewTodo onAddTodo={todoAddHandler} />
                <TodoList items={todos} onDeleteTodo={todoDeleteHandler} />
            </div>
        </React.Fragment>
    );
};

export default App;
