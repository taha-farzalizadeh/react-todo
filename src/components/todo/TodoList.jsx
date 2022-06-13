import React from 'react';
import TaskColumn from "./TasksColumn";
import { DragDropContext } from 'react-beautiful-dnd';
import {useState,useEffect} from "react";
const TodoList = ({todosList , setTodosList}) => {
    let initialState = [
        {
            groupName: "todo",
            tasks: []
        },
        {
            groupName: "doing",
            tasks: []
        },
        {
            groupName: "completed",
            tasks: []
        }
    ];
    const [taskList, setTasks] = useState(initialState);
    useEffect(()=>{
        const newTaskList = taskList.map(column => {
            if (column.groupName === "todo") {
                return {
                    groupName: column.groupName,
                    tasks: todosList.filter((todo)=> todo.completed===false && todo.doing===false)
                };
            }
            if (column.groupName === "doing") {
                return {
                    groupName: column.groupName,
                    tasks: todosList.filter((todo)=> todo.completed===false && todo.doing===true)
                };
            }
            if (column.groupName === "completed") {
                return {
                    groupName: column.groupName,
                    tasks: todosList.filter((todo)=> todo.completed===true && todo.doing===false)
                };
            }
            return column;
        });
        setTasks(newTaskList);
    },[todosList])

    function onDragEnd(val) {
        const { draggableId, source, destination } = val;
        const [sourceGroup] = taskList.filter(
            column => column.groupName === source.droppableId
        );
        const [destinationGroup] = destination
            ? taskList.filter(column => column.groupName === destination.droppableId)
            : { ...sourceGroup };
        let [movingTask] = sourceGroup.tasks.filter(t => t.id === draggableId);
        if(source.droppableId!==destination.droppableId){
            if (destination.droppableId==="doing"){
                setTodosList(
                    todosList.map((item)=>{
                        if(item.id===movingTask.id){
                            return{
                                ...item ,doing:true , completed:false
                            }
                        }
                        return item
                    })
                )
            }
            else if(destination.droppableId==="completed"){
                setTodosList(
                    todosList.map((item)=>{
                        if(item.id===movingTask.id){
                            return{
                                ...item ,doing:false , completed:true
                            }
                        }
                        return item
                    })
                )
            }
            else if(destination.droppableId==="todo"){
                setTodosList(
                    todosList.map((item)=>{
                        if(item.id===movingTask.id){
                            return{
                                ...item ,doing:false , completed:false
                            }
                        }
                        return item
                    })
                )
            }
        }

        const newSourceGroupTasks = sourceGroup.tasks.splice(source.index, 1);
        const newDestinationGroupTasks = destinationGroup.tasks.splice(
            destination.index,
            0,
            movingTask
        );
        const newTaskList = taskList.map(column => {
            if (column.groupName === source.groupName) {
                return {
                    groupName: column.groupName,
                    tasks: newSourceGroupTasks
                };
            }
            if (column.groupName === destination.groupName) {
                return {
                    groupName: column.groupName,
                    tasks: newDestinationGroupTasks
                };
            }
            return column;
        });
        setTasks(newTaskList);
    }
    return (
        <div className="todos-list">
            <DragDropContext onDragEnd={onDragEnd}>
                <TaskColumn droppableId="todo" filteredTodos={taskList[0].tasks} todosList={todosList} setTodosList={setTodosList} headerText="To do" customClass="todo" />
                <TaskColumn droppableId="doing" filteredTodos={taskList[1].tasks} todosList={todosList} setTodosList={setTodosList} headerText="Doing..." customClass="doing" />
                <TaskColumn droppableId="completed" filteredTodos={taskList[2].tasks} todosList={todosList} setTodosList={setTodosList} headerText="Completed!" customClass="completed" />
            </DragDropContext>
        </div>
    );
};

export default TodoList;
