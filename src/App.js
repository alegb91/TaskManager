import LogIn from "../src/pages/logIn";
import Main from "./pages/main";
import SignIn from "./pages/singIn";
import { Routes, Route, Navigate } from 'react-router-dom';
import { useContext } from "react";
import { DataContext } from "./context/context";
import { useEffect } from "react";


function App() {

  const { token, setToken } = useContext(DataContext)

  useEffect(() => {
    setToken(window.localStorage.getItem('token'))
  })

  return (
    <Routes>
      <Route path="/" element={token ? <Main /> : <LogIn /> } />
      <Route path="/register" element={token ? <Navigate to='/'/> : <SignIn /> } />
    </Routes>
  );
}

export default App;
