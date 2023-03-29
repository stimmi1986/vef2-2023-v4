import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DeleteCourseForm from "../components/Form/DeleteCourseForm";
import { URL } from "./Departments"

export function Course({ titleName }) {
    const [state, setState] = useState("empty");
    const [courses, setCourses] = useState([]);

    const { slug, courseId } = useParams();
    const encodedCourseId = encodeURIComponent(courseId);

    useEffect(() => {
        async function fetchData() {
            setState("loading");

            try {
                const response = await fetch(
                    `${URL}${slug}/courses/${encodedCourseId}`
                );
                console.log('Url:>> ', `${URL}${slug}/courses/${encodedCourseId}`)

                if (!response.ok) {
                    throw new Error("not ok");
                }
                const data = await response.json();
                setCourses(data);
                setState("data");
            } catch (e) {
                setState("error");
                console.log(e);
            }
        }

        fetchData();
    }, [ slug, encodedCourseId ]);

    return (
        <section>
            <h2>{slug}</h2><br />
            <h2>{titleName}</h2>
            <h3>{courses.title}</h3>
            <h3><a href={`${courses.url}`}>{courses.courseId}</a></h3>
            {state === "error" && <p>Villa við að sækja áfanga.</p>}
            {state === "loading" && <p>Loading...</p>}
            {state === "data" && (
                <div>
                    <ul key={courses.index}>
                        <li><b>Númer: </b> {courses.courseId}</li>
                        <li><b>Heiti: </b> {courses.title}</li>
                        <li><b>Einingar: </b> {courses.units}</li>
                        <li><b>Kennslumisseri: </b> {courses.semester}</li>
                        <li><b>Námsstig: </b> {courses.level}</li>
                    </ul>    
                </div>
            )}
            <DeleteCourseForm />
        </section>
    );
};

export default Course;
