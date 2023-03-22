import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Courses from "../courses/Courses";

import "./Departments.css";

const URL = 'https://db-spae.onrender.com/departments';

export function Departments({ title, pathname }) { // Add pathname as a prop
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

  const location = useLocation();
  const slug = location.state?.slug;

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
                    pathname: `/departments/${department.slug}/courses/`,
                    state: { slug },
                  }}
                >
                  {department.title}
                </Link>
                </li>
              </div>
            );
          })}
      </ul>
      {state === "data" && <Courses title="Námskeið" slug={slug} />}
    </section>
  );
}

export default Departments;
