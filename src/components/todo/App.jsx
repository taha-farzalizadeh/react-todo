import React from 'react';
import './todo.scss'
import Form from "./Form";
import TodoList from "./TodoList";
import {useState} from "react";
// import DragAndDropTest from "../dragTest/DragAndDropTest";

const App = () => {
    const [inputText , setInputText] = useState("")
    const [todosList , setTodosList] = useState([])
    return (
        <div>
            <h1 className="header-text">
                Taha's TodoList
            </h1>
            <div className="form-container">
                <Form inputText={inputText}
                      todosList={todosList}
                      setTodosList={setTodosList}
                      setInputText={setInputText}
                />
            </div>

            {/*<DragAndDropTest/>*/}
            <TodoList todosList={todosList} setTodosList={setTodosList} />
        </div>
    );
};

export default App;
