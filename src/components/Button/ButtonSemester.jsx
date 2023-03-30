import { useState } from "react";
import './Button.css'

export function ButtonSemester({ callback, method, fetchUrl, buttonName, errorName, nameOfClass, inputName, inputOfClass }) {
    const [state, setState] = useState('empty');
    const [errors, setErrors] = useState([]);
    const [onSubmited, setOnSubmited] = useState('');

    async function onSubmit(title) {
        setState('loading')
        try {
            const body = {
                semester: title,
            }
            console.log('Title:')
            const response = await fetch(fetchUrl, {
                method: method,
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(body), 
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
    
    const onSubmitHandler = (e) => {
        e.preventDefault(); 
        onSubmit(onSubmited);
    }
    
    const onInputChange = (e) => {
        setOnSubmited(e.target.value);
    }

    return (
        <>
            <form onSubmit={onSubmitHandler}>
            <input id={inputOfClass} type="text"  onChange={onInputChange} placeholder={inputName} />
                <button id={nameOfClass} >{buttonName}</button>
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
        </>
    )
}

export default ButtonSemester;
