import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSquareCheck ,faTrash,faArrowRotateLeft,faEllipsis , faSquarePen } from '@fortawesome/free-solid-svg-icons'
import {useState,useRef} from "react";
import TextInput from "../inputs/TextInput";
import { Draggable } from "react-beautiful-dnd";

const Task = ({customClass,todo , todosList , setTodosList, index}) => {
    const inputElement = useRef(null);
    const focusInput = () => {
        inputElement.current.focus()
    };
    const [editMode , setEditMode] = useState(false)
    const [taskEditInput , setTaskEditInput] = useState(todo.text)
    const handleEdit= ()=>{
        setEditMode(!editMode)
        setTimeout(()=>{
            focusInput()
        },500)
    }
    const editConfirm = ()=>{
        setTodosList(
            todosList.map((item)=>{
                if(item.id===todo.id){
                    return{
                        ...item ,text:taskEditInput
                    }
                }
                return item
            })
        )
        setEditMode(!editMode)
    }
    const goToDoing=()=>{
        setTodosList(
            todosList.map((item)=>{
                return (item.id===todo.id)?{...item ,doing : !item.doing}: item
            })
        )
    }
    const completeTask=()=>{
        setTodosList(
            todosList.map((item)=>{
                if(item.id===todo.id){
                    return{
                        ...item ,doing : false , completed : true
                    }
                }
                return item
            })
        )
    }
    const backToTodo=()=>{
        setTodosList(
            todosList.map((item)=>{
                if(item.id===todo.id){
                    return{
                        ...item ,doing : false , completed : false
                    }
                }
                return item
            })
        )
    }
    const deleteTask=()=>{
        setTodosList(todosList.filter((el)=>el.id !== todo.id))
    }
    const textInputHandler=(e)=>{
        setTaskEditInput(e.target.value)
    }
    return (
        <Draggable draggableId={todo.id} index={index} type="TASK">
            {provided => (
                <div className="todo-li-container"  {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                        {
                            editMode ?(
                                <li className="todo-item edit">
                                    <form className="edit-task-form">
                                        <TextInput inputRef={inputElement} textInputHandler={textInputHandler}  value={taskEditInput} />
                                        <button onClick={editConfirm} title="complete this task" className="complete-btn">
                                            <FontAwesomeIcon className="fa-icons" icon={faSquareCheck} />
                                        </button>
                                    </form>
                                </li>

                            ):(
                                <>
                                    <li className="todo-item">
                                        <p className="todo-text">
                                            {todo.text}
                                        </p>
                                    </li>

                                    <button onClick={handleEdit} title="go to doing" className="edit-btn">
                                        <FontAwesomeIcon className="fa-icons" icon={faSquarePen} />
                                    </button>
                                    {customClass==="todo" &&
                                        <button onClick={goToDoing} title="go to doing" className="ellipsis-btn">
                                            <FontAwesomeIcon className="fa-icons" icon={faEllipsis} />
                                        </button>
                                    }
                                    {customClass==="doing" &&
                                        <button onClick={completeTask} title="complete this task" className="complete-btn">
                                            <FontAwesomeIcon className="fa-icons" icon={faSquareCheck} />
                                        </button>
                                    }
                                    {customClass==="doing" &&
                                        <button onClick={backToTodo} title="back to todo" className="back-btn">
                                            <FontAwesomeIcon className="fa-icons" icon={faArrowRotateLeft} />
                                        </button>
                                    }
                                    <button onClick={deleteTask} title="delete task" className="trash-btn">
                                        <FontAwesomeIcon className="fa-icons" icon={faTrash} />
                                    </button>
                                </>
                            )

                        }

                </div>
            )}
        </Draggable>
    );
};

export default Task;
