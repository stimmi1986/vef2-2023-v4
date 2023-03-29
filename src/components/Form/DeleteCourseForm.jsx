import { useState } from "react";
import { useParams } from "react-router";
import { URL } from "../../pages/Departments";

export function DeleteCourseForm() {
    const [state, setState] = useState('empty');
    const [errors, setErrors] = useState([]);
    const [deleteCourse, setDeleteCourse] = useState('');

    const {slug, courseId } = useParams();

    async function deleteCourseId( ) {
        setState('loading')
        try {
            const response = await fetch(`${URL}${slug}/courses/${courseId}`, {
                method: 'DELETE',
                });
            if (!response.ok) {
                if (response.status >= 400 && response.status < 500) {
                    setErrors('error')
                }
            } else {
                setState('Success')
            }

        } catch (e) {
            setState('error')
        }
    }

    const onClickHandler = (e) => {
        e.preventDefault();

        deleteCourseId(deleteCourse);
    }

    const onClickChange = (e) => {
        setDeleteCourse(e.target.value);
    }

    return (
        <>
            <h1>Eyða áfanga</h1>
            <form onSubmit={onClickHandler}>
                <button id="deleteCourse" value={deleteCourse} onChange={onClickChange}>Eyða áfanga?</button>
            </form>
            {state === "empty" && <p>Viltu eyða áfanga?</p>}
            {state === "error" && <><p>villa við að eyða áfanga</p>
            <p>Villur:</p>
            <ul>
                {errors.map((error, i) => {
                    return (
                        <li key={i}>{error.msg}</li>
                    )
                })}
            </ul>
            </>}
            {state === "loading" && <p>Loading...</p>}
            {state === "Success" && <p>Búið að eyða áfanga</p>}
        </>
    )
}

export default DeleteCourseForm;