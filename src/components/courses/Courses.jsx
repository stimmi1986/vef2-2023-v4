import { useEffect, useState } from "react";

import './Courses.css';

const PAGE_SIZE = 10;

export function Courses({ title }) {
    const [state, setState] = useState('empty');
    const [courses, setCourses] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [activePage, setActivePage] = useState(1);

    useEffect(() => {
        async function fetchData() {
            setState('loading');

            try {
                const response = await fetch(`http://localhost:4000/departments/hagfraedideild/courses`);

                if (!response.ok) {
                    throw new Error('not ok');
                }

                const json = await response.json();
                const numCourses = json.length;
                setTotalPages(Math.ceil(numCourses / PAGE_SIZE));
                setCourses(json.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE));
                setState('data');
            } catch (e) {
                setState('error');
                console.log(e);
            }
        }

        fetchData();
    }, [page]);

    function handlePageChange(newPage) {
      setPage(newPage);
      setActivePage(newPage);
    }
    

    return (
        <section>
            <h2>{title}</h2>
            {state === 'empty' && (<p>veldu deild hér að ofan</p>)}
            {state === 'error' && (<p>Error loading courses.</p>)}
            {state === 'loading' && (<p>Loading...</p>)}
            {state === 'data' && (
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
                            {courses.map(course => (
                                <tr key={course.id}>
                                    <td>{course.courseId}</td>
                                    <td><a href={course.url}>{course.title}</a></td>
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
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                            <button
                                key={p}
                                className={`page-link${p === activePage ? ' active' : ''}`}
                                onClick={() => {
                                  handlePageChange(p);
                                  setActivePage(p);
                                }}
                            >
                                {p}
                            </button>
                        ))}
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
