import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import AddIcon from '@mui/icons-material/Add';
import { useContext } from "react";
import { DataContext } from "../context/context";
import axios from 'axios';
import { useState } from "react";
import { useRef } from 'react';
import styled from 'styled-components';
import Service from '../Utils/HttpService'


const TaskContainer = styled.div`
    position: relative;
    top: 15vh;
    padding: 20px;
    width: 35vw;
    width: 35vw;

    @media (max-width: 1000px) {
      width: 60vw;
      top: 0;
    }

    @media (max-width: 600px) {
      width: 80vw;
    }

    @media (max-width: 450px) {
      padding: 0;
    }

    @media (max-width: 350px) {
      width: 90vw;
    }
`

const TaskInputContainer = styled.form`
    display: flex;
    justify-content: start;
    align-items: center;
    width: 190px;
    padding: 10px 20px;
    border-radius: 5px;
    border: 0.5px solid gray;
`

const TaskInput = styled.input`
    display: flex;  
    border: none;

    &:focus {
      outline: none; 
    }
`

const TaskUl = styled.ul`
    padding: 0;
`

const TaskLi = styled.li`
    border-radius: 5px;
    border: 0.5px solid white;
    background-color: rgba(140,140,140);
    color: white;
    list-style: none;
    padding: 0 10px;
    margin: 5px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;

    &:hover {
      border-color: black;
    }
`

const IconContainer = styled.div`
    display: flex;
    
    padding: 0 0 0 10px;

    @media (max-width: 400px) {
      flex-direction: column;
    }
`


const TasksComponent = () => {

    const { tasks, clickedTask, setClickedTask, token, setToken, setTasks } = useContext(DataContext);

    const [ input, setInput ] = useState('');

    const TInputRef = useRef();

    const service = new Service;
      

  return (
    <TaskContainer>
                    <TaskInputContainer>
                      <TaskInput ref={TInputRef} placeholder="New Task" onChange={e => setInput(e.target.value)}/>
                      <AddIcon 
                        style={{ color: "gray", margin:"0 5px", cursor: "pointer" }} 
                        onClick={() => {
                          service.handleCreate( input, TInputRef, setInput, token );
                          service.fetchData( token, setToken, setTasks );
                        }}/>
                    </TaskInputContainer>
                      <TaskUl>
                          {
                            tasks.map(task => (
                              <TaskLi 
                                style={{ textDecoration: `${task.checked ? 'line-through' : 'none'}` }} 
                                key={task._id} 
                                onClick={() => setClickedTask(task._id)}>
                                <p style={{ maxWidth: '80%', wordWrap: 'break-word' }}>{task.name}</p>
                                {task._id === clickedTask &&
                                <IconContainer>
                                     <RadioButtonUncheckedIcon 
                                        onClick={() => {
                                          service.handleChecked( tasks, clickedTask, token );
                                          service.fetchData( token, setToken, setTasks );
                                      }} 
                                        style={{ display: `${!task.checked ? 'flex' : 'none'}` }} />
                                     <CheckCircleOutlineIcon 
                                        style={{ display: `${task.checked ? 'flex' : 'none'}` }} 
                                        onClick={() => {
                                          service.handleChecked( tasks, clickedTask, token );
                                          service.fetchData( token, setToken, setTasks );
                                      }} />
                                     <HighlightOffIcon 
                                        onClick={() => {
                                          service.handleDelete( tasks, clickedTask, token );
                                          service.fetchData( token, setToken, setTasks );
                                      }}/>
                                </IconContainer>
                           }
                              </TaskLi>
                            ))
                          }
                      </TaskUl>
                      
                </TaskContainer>
  )
}

export default TasksComponent;