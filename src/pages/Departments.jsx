import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { DepartmentForm } from "../components/Form/DepartmentForm";

import "./Departments.css";

export const URL = process.env.REACT_APP_API_URL;

export function Departments({ titleName }) {

  // type State = 'empty' | 'data' | 'error' | 'loading' GOLDEN RULE Læra
  const [state, setState] = useState("empty");
  const [departments, setDepartments] = useState([{}]);
  
  useEffect(() => {
  
    async function fetchData() {
      setState("loading");

      try {
        const response = await fetch(URL);

        if (!response.ok) {
          throw new Error("not ok");
        }

        const json = await response.json();
        setDepartments(json);
        setState("data");
      } catch (e) {
        setState("error");
        console.log(e);
    }
  }
  fetchData();
  }, []);//setDepartments
 
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
                <li>
                <Link
                  to={{
                    pathname: `/departments/${department.slug}/`,
                  }}
                >
                  {department.title}
                </Link>
                </li>                
              </div>
            );
          })}
      </ul>
      <DepartmentForm />
    </section>
  );
};

export default Departments;