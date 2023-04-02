import { useState } from "react";
import { useNavigate } from "react-router-dom";
import './Button.css'

export function ButtonOnClick({ callback, method, fetchUrl, buttonName, errorName, nameOfClass}) {
    const [state, setState] = useState('empty');
    const [errors, setErrors] = useState([]);
    const [deleteCourse, setDeleteCourse] = useState('');
    const navigate = useNavigate();

    async function deleteCourseId( ) {
        setState('loading')
        try {
            const response = await fetch(fetchUrl, {
                method: method, 
            });
            callback()
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
        navigate(-1); 
        deleteCourseId(deleteCourse);
    }
    
    const onClickChange = (e) => {
        setDeleteCourse(e.target.value);
    }

    return (
        <>
            <form onSubmit={onClickHandler}>
                
                <button id={nameOfClass} value={deleteCourse} onChange={onClickChange}>{buttonName}</button>
            </form>
            {state === "error" && <><p>villa við að eyða {errorName}</p>
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
            {state === "Success" && <p>Búið að eyða {errorName}</p>}
        </>
    )
}

export default ButtonOnClick;
