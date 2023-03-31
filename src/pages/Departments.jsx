import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ButtonOnSubmitTitle } from '../components/Button/ButtonOnSubmitTitle';


import "./css/style.css";

export const URL = process.env.REACT_APP_API_URL;

export function Departments({ titleName, setDeild, deildir, setDeildir}) {

  // type State = 'empty' | 'data' | 'error' | 'loading' GOLDEN RULE Læra
  const [state, setState] = useState("empty");
  //const [departments, setDepartments] = useState([{}]);
  
  const departments = deildir
  
  async function fetchData() {
    setState("loading");
    
    try {
      const response = await fetch(URL);
      
      if (!response.ok) {
        throw new Error("not ok");
      }
      
      const json = await response.json();
      setDeildir(json);
      setState("data");
    } catch (e) {
      setState("error");
      console.log(e);
    }
  }
    useEffect(() => {
      fetchData();
},[] );//setDepartments

function tester(){
  console.log('sækja gögn')
  fetchData();
}

  return (
    <section>
      <h2>{titleName}</h2>
      {state === "empty" && <p>engar deildir</p>}
      {state === "error" && <p>villa við að sækja deildir</p>}
      {state === "loading" && <p>Loading...</p>}
      <ul>
        {state === "data" &&
          departments.map((department, i) => {
            return (
              <div key={i}>
                <li onClick={ () => setDeild(department)}>
                <Link 
                  to={{
                    pathname: `/departments/${department.slug}/`,
                    params: { some: "value" },
                  }}
                  >
                  {department.title}
                  {/*console.log(departments)*/}
                </Link>
                </li>                
              </div>
            );
          })}
      </ul>
      <button>styrmir</button>
      <ButtonOnSubmitTitle 
        callback={tester} 
        method={'POST'} 
        fetchUrl={`${URL}`}  
        buttonName={'búa til deild'} 
        inputName={'Búðu til Deild'} 
        nameOfClass={'prim'}
      />
    </section>
  );
};

export default Departments;