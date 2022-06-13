import React from 'react';
import Task from "./Task";
import { Droppable,Draggable } from 'react-beautiful-dnd';



const TaskColumn = ({droppableId , filteredTodos , todosList , setTodosList , customClass , headerText}) => {

    return (
        <div className={`column ${customClass}`}>
            <div className="header">
                <h2>
                    {headerText}
                </h2>
            </div>
            <Droppable droppableId={droppableId}>
                {(provided, snapshot) => (
                    <div className="todo-container" ref={provided.innerRef}>
                        <ul className="todo-list">
                            {filteredTodos?.map((todo , index)=>(
                                <Task
                                      index={index}
                                      id={todo.id}
                                      key={todo.id}
                                      todosList={todosList}
                                      setTodosList={setTodosList}
                                      todo={todo}
                                      customClass={customClass}
                                />
                            ))}
                        </ul>
                        {provided.placeholder}
                    </div>
                    )}
            </Droppable>
        </div>


    );
};

export default TaskColumn;
