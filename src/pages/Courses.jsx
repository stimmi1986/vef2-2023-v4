import React, { useEffect, useState } from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import { URL } from "./Departments"

import "./css/style.css";

const PAGE_SIZE = 10;

export function Courses({ titleName, callback }) {
  const [state, setState] = useState("empty");
  const [courses, setCourses] = useState([]);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [activePage, setActivePage] = useState(1);

  const { slug } = useParams();
  const { params } = useLocation();

  console.log('slug:', params)
  console.log('title:')
   
  async function fetchData() {
    setState("loading");
    
    try {
      const response = await fetch(
        `${URL}${slug}/courses/`
        );
        
        if (!response.ok) {
          throw new Error("not ok");
        }
        
        const json = await response.json();
        const numCourses = json.length;
        setTotalPages(Math.ceil(numCourses / PAGE_SIZE));
        setCourses(json.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE));
        setState("data");
      } catch (e) {
        setState("error");
        console.log(e);
      }
    }
    
    useEffect(() => {
    fetchData();
  }, [ page ]);
  

  function handlePageChange(newPage) {
    setPage(newPage);
    setActivePage(newPage);
  }

  return (
    <section>
      <h3>{titleName}</h3>
      <h3>{}</h3>
      <h3>{slug}</h3>
      {state === "empty" && <p>veldu deild hér að ofan</p>}
      {state === "error" && <p>Villa við að sækja námskeið.</p>}
      {state === "loading" && <p>Loading...</p>}
      {state === "data" && (
        <>
          <table>
            <thead>
              <tr>
                <th>Númer</th>
                <th>Heiti</th>
                <th>Einingar</th>
                <th>Kennslumisseri</th>
                <th>Námsstig</th>
              </tr>
            </thead>
            <tbody>
              {courses.map((course, index) => (
                <tr key={index}>
                  <td>{course.courseId}</td>
                  <td>
                  <Link to={{ pathname: `${course.courseId}`, }}>{course.title}</Link>
                  </td>
                  <td>{course.units}</td>
                  <td>{course.semester}</td>
                  <td>{course.level}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="pagination">
  <button
    className="page-link"
    onClick={() => handlePageChange(page - 1)}
    disabled={page === 1}
  >
    Previous
  </button>
  {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => {
    const maxPage = activePage + 3;
    const minPage = activePage - 3;
    if (p === 1 || p === totalPages || (p >= minPage && p <= maxPage)) {
      return (
        <button
          key={p}
          className={`page-link${p === activePage ? " active" : ""}`}
          onClick={() => {
            handlePageChange(p);
            setActivePage(p);
          }}
        >
          {p}
        </button>
      );
    } else if (p === minPage - 1 || p === maxPage + 1) {
      return <span key={p}>...</span>;
    }
    return null;
  })}
  <button
    className="page-link"
    onClick={() => handlePageChange(page + 1)}
    disabled={page === totalPages}
  >
    Next
  </button>
</div>

        </>
      )}
    </section>
  );
}

export default Courses;
