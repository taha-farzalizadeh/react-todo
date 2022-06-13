import React from 'react';

const TextInput = ({id="" ,autofocus=false , placeHolderText , textInputHandler , value , inputRef=null}) => {
    return (
        <>
            <input id={id} ref={inputRef} type="text" placeholder={placeHolderText} onChange={textInputHandler} value={value}/>
        </>
    );
};

export default TextInput;
