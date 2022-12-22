import React from 'react'
import styled from 'styled-components'
import AddIcon from '@mui/icons-material/Add';
import { useContext } from "react";
import { DataContext } from "../context/context";
import { useState } from "react";
import { useRef } from "react";
import Service from '../Utils/HttpService';

const SubTaskContainer = styled.div`
    position: relative;
    top: 25vh;
    padding: 20px;
    border: 1px solid gray;
    border-radius: 20px;
    width: 30vw;


    @media (max-width: 1000px) {
      width: 50vw;
      padding: 10px;
      top: 0;
    }

    @media (max-width: 600px) {
     width: 70vw;
    }

    @media (max-width: 350px) {
      width: 85vw;
      padding: 5px;
    }
`

const SubTaskInputContainer = styled.form`
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 0.5px solid gray;
    align-self: start;
    margin: 0 30px;
    width: 70%;

    @media(max-width: 500px) {
      margin: 0 15px;
    }

    @media(max-width: 350px) {
      padding: 0;
    }
`

const SubTaskInput = styled.input`
    display: flex;
    padding: 10px 20px;
    border: none;

    &:focus {
      outline: none;
    }

    @media(max-width: 500px) {
      padding: 10px 0 10px 10px;
    }
`

const SubTaskUl = styled.ul`
    margin: 5px 0;
    padding: 0;
`

const SubTaskLi = styled.li`
    list-style: none;
    padding: 10px 5px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;
`

const SubTaskDeleteButton = styled.button`
    border: none;
    background-color: transparent;
    color: black;
    margin-right: 20px; 
    cursor: pointer;

    @media (max-width: 600px) {
      margin: 0;
    }
`


const SubTasksComponent = () => {

    const { tasks, clickedTask, clickedSubTask, setClickedSubTask, token, setToken, setTasks } = useContext(DataContext);

    const [ inputSubTask, setInputSubTask ] = useState('');

    const STInputRef = useRef();

    const service = new Service;

  return (
    tasks.map(task => (
                    task._id === clickedTask && 
                      <SubTaskContainer key={task._id}>
                        <SubTaskUl >
                          {task.subTasks.map((subTask, i) => (
                                    <SubTaskLi key={i} onClick={() => setClickedSubTask(i)}>
                                      <p style={{ margin: '0', maxWidth: '80%', wordWrap: 'break-word' }}>{subTask}</p>
                                      {clickedSubTask === i && <SubTaskDeleteButton onClick={() => {
                                        service.handleDeleteSubTask( tasks, clickedTask, clickedSubTask, token )
                                        service.fetchData( token, setToken, setTasks )
                                        }}>X</SubTaskDeleteButton>}
                                    </SubTaskLi>
                                  )
                                  )}
                        </SubTaskUl>
                      <SubTaskInputContainer>
                          <SubTaskInput ref={STInputRef} onSubmit={e => e.target.value = ''} placeholder="New SubTask" onChange={e => setInputSubTask(e.target.value)}/>
                          <AddIcon onClick={(e) => {
                            service.handleCreateSubtask( e, inputSubTask, setInputSubTask, tasks, token, STInputRef, clickedTask )
                            service.fetchData( token, setToken, setTasks )
                            }} style={{ color: "gray", cursor: "pointer" }}/>
                      </SubTaskInputContainer>
                  </SubTaskContainer>
                  ))
  )
}

export default SubTasksComponent;