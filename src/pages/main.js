import styled from "styled-components";
import logoImg from "../images/logo.png";
import { useContext, useEffect } from "react";
import { DataContext } from "../context/context";
import SubTasksComponent from "../components/SubTasks";
import TasksComponent from "../components/Tasks";
import Service from '../Utils/HttpService'

const Container = styled.div`
    position: relative;
    display: flex; 
    justify-content: end;

    @media (max-width: 600px) {
      justify-content: center;
    }
`

const GeneralContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 70vw;
  padding-right: 100px;
  position: relative;

  @media (max-width: 1000px) {
    flex-direction: column;
    top: 25vh;
  }

  @media (max-width: 600px) {
    padding: 10px;
  }

  @media (max-width: 450px) {
    top: 20vh;
  }
`

const LogoImg = styled.img`
    position: absolute;
    left: 100px;
      top: 30px;

      @media (max-width: 1200px) {
        left: 50px;
      }

      @media (max-width: 800px) {
        top: 20px;
      }

      @media (max-width: 450px) {
        left: 10px;
        height: 80px;
        width: auto;
      }
`

const SignOutButton = styled.button`
    border: none;
    background-color: transparent;
    color: black;
    position: absolute; 
    top: 30px;
    right: 50px;
    font-size: 18px;
    cursor: pointer;

    @media (max-width: 450px) {
      right: 10px;
      top: 15px;
    }
`
    
    const Main = () => {

      const { tasks, setTasks, token, setToken } = useContext(DataContext);

      const service = new Service;
      

      useEffect(() => {
        service.fetchData( token, setToken, setTasks )
      }, []);
      

      return (
        <Container>
           {
          !tasks 
          ?
            <h1>Loading</h1>
          : 
          <>
             <LogoImg src={logoImg}/>
                <GeneralContainer>
                    <TasksComponent />  
                    <SubTasksComponent />
                </GeneralContainer>
                <SignOutButton onClick={() => service.handleSignOut(setToken)}>SignOut</SignOutButton>
             </>
              }
              </Container>
              )
    }
    
    export default Main;