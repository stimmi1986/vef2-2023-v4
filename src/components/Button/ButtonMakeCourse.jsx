import { useState } from "react";
import './Button.css'

export function ButtonMakeCourse({ callback, method, fetchUrl, buttonName, errorName}) {
    const [state, setState] = useState('empty');
    const [errors, setErrors] = useState([]);
    const [onSubmited, setOnSubmited] = useState('');

    async function onSubmit(title, value) {
        setState('loading')
        try {
            const body = {
                courseId: title,
                title: title,
                units: title,
                semester: value,
                level: value,
            }
            console.log('Title:')
            const response = await fetch(fetchUrl, {
                method: method,
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(body), 
            });
            
            if (!response.ok) {
                if (response.status >= 400 && response.status < 500) {
                    setErrors('error')
                }
            } else {
                callback()
                setState('Success')
            }

        } catch (e) {
            setState('error')
        }
    }
    
    const onSubmitHandler = (e) => {
        e.preventDefault();
        const courseId = e.target[0].value;
        const title = e.target[1].value;
        const units = e.target[2].value;
        const semester = e.target[3].value;
        const level = e.target[4].value;
        onSubmit(courseId, { title, units, semester, level });
    };
    
    
    const onInputChange = (e) => {
        const { id, value } = e.target;
        setOnSubmited(prevState => ({
            ...prevState,
            [id]: value
        }));
    };
    

    return (
        <>
            <form onSubmit={onSubmitHandler}>
                <input id={'small'} type="text" onChange={onInputChange} value={onSubmited.courseId} placeholder={'Númer:'} /><br />
                <input id={'small'} type="text" onChange={onInputChange} value={onSubmited.title} placeholder={'Heiti:'} /><br />
                <input id={'small'} type="text" onChange={onInputChange} value={onSubmited.units} placeholder={'Einingar:'} /><br />
                <input id={'small'} type="text" onChange={onInputChange} value={onSubmited.semester} placeholder={'Kennslumisseri:'} /><br />
                <input id={'small'} type="text" onChange={onInputChange} value={onSubmited.level} placeholder={'Námsstig:'} /><br />

                <button id={'small'} >{buttonName}</button>
            </form>
            {state === "error" && <><p>{errorName}</p>
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
            {state === "Success" && <p>{errorName}</p>}
        </>
    )
}

export default ButtonMakeCourse;
