import React, { createContext } from 'react';
import { useState } from 'react';

export const DataContext = createContext();

export const DataProvider = ({ children }) => {

    const [ token, setToken ] = useState();
    const [ tasks, setTasks ] = useState();
    const [ clickedTask, setClickedTask ] = useState();
    const [ clickedSubTask, setClickedSubTask ] = useState();
return (
    <DataContext.Provider value={{
        token,
        setToken,
        tasks, 
        setTasks,
        clickedTask, 
        setClickedTask,
        clickedSubTask, 
        setClickedSubTask
        }}>
        {children}
    </DataContext.Provider>
)

};