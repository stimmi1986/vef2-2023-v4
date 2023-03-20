import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import "./Departments.css";

const URL = 'http://localhost:4000/departments/';

export function Departments({ title }) {
  // type State = 'empty' | 'data' | 'error' | 'loading' GOLDEN RULE Læra
  const [state, setState] = useState("empty");
  const [departments, setDepartments] = useState([{}]);

  useEffect(() => {
    async function fetchData() {
      await fetchDepartment();
    }
    fetchData();
  }, []);

  async function fetchDepartment() {
    setState("loading");

    try {
      const response = await fetch(URL);
      console.log(URL)
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

  return (
    <section>
      <h2>{title}</h2>
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
                      pathname: `/${department.slug}/courses`,
                      departSlgu: { department: department.slug },
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
