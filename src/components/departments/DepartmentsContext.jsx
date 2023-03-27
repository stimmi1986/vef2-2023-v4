import React, { createContext, useState, useEffect } from 'react';

export const DepartmentsContext = createContext();

//export const URL = 'https://db-spae.onrender.com/departments';
export const URL = 'http://localhost:4000/departments';

export const DepartmentsProvider = ({ children }) => {
  // type State = 'empty' | 'data' | 'error' | 'loading' GOLDEN RULE Læra
  const [state, setState] = useState("empty");
  const [departmentsInfo, setDepartmentsInfo] = useState({});

  async function fetchData() {
    setState("loading");
    
    try {
      const response = await fetch(URL);
      
      if (!response.ok) {
        throw new Error("not ok");
      }
      
      const json = await response.json();
      setDepartmentsInfo(json);
      setState("data");

    } catch (e) {
      setState("error");
      console.log(e);
    }
  }

  useEffect(() => {
  fetchData();
}, [setDepartmentsInfo]);

  return (
    <DepartmentsContext.Provider value={{ departmentsInfo, setDepartmentsInfo }}>
      {state === "empty" && <p>engar deildir</p>}
      {state === "error" && <p>villa við að sækja deildir</p>}
      {state === "loading" && <p>Loading...</p>}
      {state === "data" && departmentsInfo.map((department, i) => {
        return(
          <>
          
          </>
  
        );
      })}
      {children}
    </DepartmentsContext.Provider>
  );
};

