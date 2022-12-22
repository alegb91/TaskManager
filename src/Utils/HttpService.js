import axios from "axios";
import { redirect } from 'react-router-dom';

    const BASE_URL = 'https://listapi-dtrd.onrender.com/api/v1';

    class Service {

      constructor() {

      }



      fetchData( token, setToken, setTasks ) {
        axios.get(`${BASE_URL}/tasks`, {
            headers: {
            'Authorization': `Bearer ${token}`
            }}
        )
        .then(res => setTasks(res.data.tasks))
        .catch(err => {
          console.log(err)
          localStorage.removeItem('token')
            setToken()
        })
        };



      handleSignOut(setToken) {
        setToken();
        localStorage.removeItem('token');
      };
      
      

      handleLogIn(values, setToken, setSuccess) {
        const { email, password } = values;
         axios.post(`${BASE_URL}/auth/login`, {  
            email,
            password
          })
          .then(res => {
            window.localStorage.setItem('token', res.data.token);
            setToken(res.data.token);
        })
          .catch(err => {
            console.log(err);
            setTimeout(() => setSuccess(true), 500);
            setTimeout(() => setSuccess(false), 3000);
        })
        }; 



        handleSignIn( values, setToken, token, setSuccess ) {
          const { name, email, password } = values;
          axios.post(`${BASE_URL}/auth/register`, {  
            name,
            email,
            password
          })
          .then(res => {
            setToken(res.data.user.token);
            window.localStorage.setItem('token', res.data.user.token);
            {token && redirect("/")};
          })
          .catch(err => {
            console.log(err);
            setTimeout(() => setSuccess(true), 500);
            setTimeout(() => setSuccess(false), 3000);
          })
        }
      


      handleCreateSubtask( e, inputSubTask, setInputSubTask, tasks, token, STInputRef, clickedTask ) {
        e.preventDefault();
        if(inputSubTask === '') return;
        STInputRef.current.value = '';
        setInputSubTask('');
        tasks.map((task) => {
          if(task._id === clickedTask) {
            
               axios.patch(`${BASE_URL}/tasks/${clickedTask}`, {
                'subTasks': [...task.subTasks, inputSubTask]
              }, {
                headers: {
                  'Authorization': `Bearer ${token}`
                }
              })
            .catch(err => console.log(err))
          }
        })
        ;
      };



      handleDeleteSubTask( tasks, clickedTask, clickedSubTask, token ) {
        tasks.map( task => {
          if(task._id === clickedTask) {
              task.subTasks.map( (subTask, i) => {
                if(clickedSubTask === i) {
                  task.subTasks.splice(i, 1)
                    return axios.patch(`${BASE_URL}/tasks/${clickedTask}`, {
                    'subTasks': task.subTasks
                      }, {
                      headers: {
                      'Authorization': `Bearer ${token}`
                      }
                      })
                }
            })
          }
        })     
      };



      handleChecked( tasks, clickedTask, token ) {
        tasks.map((task) => {
          if(task._id === clickedTask) {            
              return axios.patch(`${BASE_URL}/tasks/${clickedTask}`, {
                'checked': !task.checked
              }, {
                headers: {
                  'Authorization': `Bearer ${token}`
                }
              })
             .catch(err => console.log(err))
          }
        })
      }



      handleDelete( tasks, clickedTask, token ) {
        tasks.map((task) => {
          if(task._id === clickedTask) {
            const id = task._id;
            return axios.delete(`${BASE_URL}/tasks/${id}`, {
              headers: {
                'Authorization': `Bearer ${token}`
              }
            })
          }
        })
      };



      handleCreate( input, TInputRef, setInput, token ) {      
        if(input === '') return
        TInputRef.current.value = '';
        setInput('')
        return axios.post(`${BASE_URL}/tasks`, {
          'name': input
        }, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
        .catch(error => console.log(error)) 
      }

    };


    export default Service;





    