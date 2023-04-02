import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { URL } from "./Departments"

import ButtonCourseId from "../components/Button/ButtonCourseId";
import ButtonOnSubmitTitle from "../components/Button/ButtonOnSubmitTitle";
import ButtonUnits from "../components/Button/BottonUnits";
import ButtonSemester from "../components/Button/ButtonSemester";
import ButtonLevel from "../components/Button/ButtonLevel"
import ButtonOnClick from "../components/Button/ButtonOnClick";

export function Course(deild) {
    const [state, setState] = useState("empty");
    const [courses, setCourses] = useState([]);
    const { slug, courseId } = useParams();
    const encodedCourseId = encodeURIComponent(courseId);

    async function fetchData() {
        setState("loading");

        try {
            const response = await fetch(
                `${URL}${slug}/courses/${encodedCourseId}`
            );

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

    useEffect(() => {
        fetchData();
    }, [slug, encodedCourseId]);

    function tester() {
        console.log('sækja gögn')
        fetchData();
    }

    return (
        <>
        <section>
            <h2><a href={`${courses.url}`}>{courses.title}</a></h2>
            {state === "error" && <p>Villa við að sækja áfanga.</p>}
            {state === "loading" && <p>Loading...</p>}
            {state === "data" && (
                <div>
                    <ul key={courses.index}>
                        <li><b>Númer: </b> {courses.courseId}
                        <ButtonCourseId 
                            callback={tester} 
                            method={'PATCH'} 
                            fetchUrl={`${URL}${slug}/courses/${encodedCourseId}`} 
                            buttonName={'breyta Númar'} 
                            nameOfClass={'small'} 
                            inputOfClass={'Inputsmall'} 
                            inputName={'Breyta Númeri'} 
                        />
                        </li>
                        <li><b>Heiti: </b> {courses.title}
                        <ButtonOnSubmitTitle 
                            callback={tester} 
                            method={'PATCH'} 
                            fetchUrl={`${URL}${slug}/courses/${encodedCourseId}`} 
                            buttonName={'breyta Heiti'} 
                            nameOfClass={'small'} 
                            inputOfClass={'Inputsmall'} 
                            inputName={'Breyta Heiti'} 
                        />
                        </li>
                        <li><b>Einingar: </b> {courses.units}
                        <ButtonUnits 
                            callback={tester} 
                            method={'PATCH'} 
                            fetchUrl={`${URL}${slug}/courses/${encodedCourseId}`} 
                            buttonName={'breyta einingum'} 
                            nameOfClass={'small'} 
                            inputOfClass={'Inputsmall'} 
                            inputName={'Engöngu Tölustafir'} 
                        />
                        </li>
                        <li><b>Kennslumisseri: </b> {courses.semester}
                        <ButtonSemester
                            callback={tester}
                            method={'PATCH'}
                            fetchUrl={`${URL}${slug}/courses/${encodedCourseId}`}
                            buttonName={'breyta Kennslumisseri'}
                            nameOfClass={'Inputsmall'}
                            selectName={'Inputsmall'}
                            selectOptions={[
                                'Vor', 
                                'Sumar', 
                                'Haust', 
                                'Heilsárs'
                            ]}
                        />
                        </li>
                        <li><b>Námsstig: </b> {courses.level}
                        <ButtonLevel 
                            callback={tester}
                            method={'PATCH'}
                            fetchUrl={`${URL}${slug}/courses/${encodedCourseId}`}
                            buttonName={'breyta Kennslumisseri'}
                            nameOfClass={'Inputsmall'}
                            selectName={'Inputsmall'}
                            selectOptions={[
                                'Grunnnám', 
                                'Grunnnám / Framhaldsnám', 
                                'Framhaldsnám'
                            ]}
                        />
                        </li>
                    </ul>
                </div>
            )}
            <ButtonOnClick callback={tester} method={'DELETE'} fetchUrl={`${URL}${slug}/courses/${encodedCourseId}`} buttonName={'viltu eyða Áfanga'} errorName={'Tókst ekki að eyða áfanga'} nameOfClass={'sec'} />
        </section>
        </>
    );
};

export default Course;
