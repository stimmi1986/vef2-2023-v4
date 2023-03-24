import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import "./Departments.css";

export const URL = 'https://db-spae.onrender.com/departments';
//export const URL = 'http://localhost:4000/departments';

export function Departments({ titles, props }) { // Add pathname as a prop
  // type State = 'empty' | 'data' | 'error' | 'loading' GOLDEN RULE Læra
  const [state, setState] = useState("empty");
  const [departments, setDepartments] = useState([{}]);

  async function fetchDepartment() {
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

  useEffect(() => {
    fetchDepartment();
  }, []);

  return (
    <section>
      <h2>{titles}</h2>
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
                    pathname: `/departments/${department.slug}/courses`,
                    titles:{titles},
                  }}
                >
                  {department.title}
                </Link>
                </li>                
              </div>
            );
          })}
      </ul>
    </section>
  );
}

export default Departments;
