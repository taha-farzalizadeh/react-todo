import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSquarePlus } from '@fortawesome/free-solid-svg-icons'
import {useState} from "react";
import TextInput from "../inputs/TextInput";

const Form = ({inputText , setInputText, todosList , setTodosList}) => {
    const [errMsg , setErrMsg] = useState("")
    const textInputHandler=(e)=>{
        setErrMsg("")
        setInputText(e.target.value)
    }
    const submitHandler=(e)=>{
        e.preventDefault()
        if(inputText!==''){
            setTodosList([...todosList , {text:inputText , completed:false , doing:false , id: String(Math.round(Math.random()*1000))}])
            setInputText("")
        }else{
            setErrMsg("input is empty!")
        }
    }
    return (
        <div className="form-container">
            <form className="add-task-form">
                <label className={errMsg!==''?'error' : ''} htmlFor="task-input">
                    <TextInput id="task-input" placeHolderText="add your task" textInputHandler={textInputHandler} value={inputText} />
                    <button onClick={submitHandler}>
                        <FontAwesomeIcon icon={faSquarePlus}/>
                    </button>
                </label>
                {errMsg!=='' && <p className="err-msg">{errMsg}</p>}
            </form>
        </div>
    );
};

export default Form;
