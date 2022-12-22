import styled from "styled-components";
import logoImg from "../images/logo.png";
import { useState } from "react";
import { Link, redirect } from 'react-router-dom';
import { useContext } from "react";
import { DataContext } from "../context/context";
import { Formik } from "formik";
import {
  emailValidation,
  passwordValidation,
  userNameValidation
} from '../Utils/Validations';
import Service from "../Utils/HttpService";

const Container = styled.form`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
`

const LogoImg = styled.img`
    position: absolute;
    left: 100px;
    top: 50px;
    height: 100px;
    width: auto;

      @media (max-width: 1200px) {
        left: 50px;
        top: 30px;
      }

      @media (max-width: 450px) {
        left: 0;
        right: 0;
        margin: auto;
        height: 80px;
        width: auto;
      }
`

const NameInput = styled.input`
  display: flex;  
  margin: 10px;
  padding: 10px 20px;
  border-radius: 5px;
  border: 0.5px solid gray;
`

const PasswordInput = styled.input`
  display: flex;
  margin: 10px;
  padding: 10px 20px;
  border-radius: 5px;
  border: 0.5px solid gray;
`

const SignInButton = styled.button`
  display: flex;
  margin: 10px;
  color: white;
  background-color: black;
  padding: 10px 20px;
  border-radius: 5px;
  border: 0.5px solid gray;
  cursor: pointer;
  transition: all 0.3s ease-in-out;

  &:hover {
    border-color: black;
  }
`

const ErrorMsg = styled.p`
  color: red;
  margin: 0;
  text-align: start;
  font-size: 13px;
`

const P = styled.p`
  font-size: 13px;
`


const SignIn = () => {

  const { token, setToken } = useContext(DataContext);

  const [ success, setSuccess ] = useState(false);

  const service = new Service;

  return (
    <Formik
  
        initialValues={{ 
          name: '',
          email: '', 
          password: ''
      }}

      onSubmit={ (values, {resetForm}) => {
        service.handleSignIn( values, setToken, token, setSuccess )
        resetForm({
              values: ''
          })
      }}

      validate={(values) => {
          let errors = {}
          const { name, email, password } = values
          if(!name) {
            errors.name = 'Must include name'
        }
        else if(!userNameValidation(name)) {
          errors.name= 'Incorrect Format'
        }
        if(!email) {
          errors.email = 'Must include email'
        }
        else if(!emailValidation(email)) {
          errors.email = 'Incorrect Format'
        }
        if(!password) {
            errors.password = 'Must Include Password'
        }
        else if(!passwordValidation(password)) {
          errors.password = 'Password must be between 4 and 8 digits long and include at least one numeric digit'
        }
            return errors;
      }}
    >

{({
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    isSubmitting
            }) => (

    <Container onSubmit={handleSubmit}>
      <LogoImg src={logoImg}/>
        <NameInput 
          placeholder="Name" 
          type='name' 
          name='name'
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.name}
          style={{ 
            borderColor: `${touched.name && errors.name ? 'red' : ''}`,
            backgroundColor: `${touched.name && errors.name ? 'rgba(200, 0, 0, 0.1)' : ''}` 
          }}
        />
        {touched.name && errors.name && <ErrorMsg>{errors.name}</ErrorMsg>}
        <NameInput 
          placeholder="Email" 
          type='email' 
          name='email'
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.email}
          style={{ 
            borderColor: `${touched.email && errors.email ? 'red' : ''}`,
            backgroundColor: `${touched.email && errors.email ? 'rgba(200, 0, 0, 0.1)' : ''}` 
          }}
        />
        {touched.email && errors.email && <ErrorMsg>{errors.email}</ErrorMsg>}
        <PasswordInput 
          placeholder="Password" 
          type='password' 
          name='password'
          onChange={handleChange}
            onBlur={handleBlur}
          value={values.password}
          style={{ 
            borderColor: `${touched.password && errors.password ? 'red' : ''}`,
            backgroundColor: `${touched.password && errors.password ? 'rgba(200, 0, 0, 0.1)' : ''}`
         }}
        />
        {touched.password && errors.password && <ErrorMsg>{errors.password}</ErrorMsg>}
       {success && <ErrorMsg>Something went wrong</ErrorMsg>}
        <SignInButton type='submit'>Sign In</SignInButton>
          <Link to='/'>
            <P>Already registered? click here to LogIn</P>
          </Link>
    </Container>
            )}
    </Formik>
  )
}

export default SignIn;