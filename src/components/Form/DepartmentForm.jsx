import { useState } from "react";
import { URL } from "../../pages/Departments";

export function DepartmentForm({callback}) {
    const [state, setState] = useState('empty');
    const [errors, setErrors] = useState([]);
    const [name, setName] = useState('');

    async function createDepartment(name, ) {
        setState('loading')
        try {
            const body = {
                title: name
            }
            const response = await fetch(URL, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(body),
            });
            const responseJson2 = await response.json();
            console.log(responseJson2)
            callback()
            if (!response.ok) {
                if (response.status >= 400 && response.status < 500) {
                    const responseJson = await response.json();
                    setState('error')
                    setErrors(responseJson.errors);
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

        createDepartment(name);
    }

    const onInputChange = (e) => {
        setName(e.target.value);
    }

    return (
        <>
            <h1>Ný deild</h1>
            <form onSubmit={onSubmitHandler}>
                <div>
                    <label htmlFor="name">Nafn</label>
                    <input id="name" type="text" value={name} onChange={onInputChange}/>
                </div>
                <button>Búa til nýja deild</button>
            </form>
            {state === "empty" && <p>engar deildir</p>}
            {state === "error" && <><p>villa við að búa til deild</p>
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
            {state === "Success" && <p>Bjó til deild</p>}
        </>
    )
}