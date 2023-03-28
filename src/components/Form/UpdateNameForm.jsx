import { useState } from "react";
import { useParams } from "react-router";
import { URL } from "../departments/Departments";

export function UpdateNameForm() {
    const [state, setState] = useState('empty');
    const [errors, setErrors] = useState([]);
    const [name, setName] = useState('');

    const {slug} = useParams();

    async function updateName(name, ) {
        setState('loading')
        try {
            const body = {
                title: name
            }
            const response = await fetch(`${URL}${slug}`, {
                method: 'PATCH',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(body),
            });
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

        updateName(name);
    }

    const onInputChange = (e) => {
        setName(e.target.value);
    }

    return (
        <>
            <h1>Nýtt Heiti</h1>
            <form onSubmit={onSubmitHandler}>
                <div>
                    <label for="name">Heiti </label>
                    <input id="name" type="text" value={name} onChange={onInputChange}/>
                </div>
                <button>Uppfærða nafn á deild?</button>
            </form>
            {state === "empty" && <p>Viltu uppfæra nafnið á Deild?</p>}
            {state === "error" && <><p>villa við að uppfæra nafn á deild</p>
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
            {state === "Success" && <p>Uppfærði nafn á deild</p>}
        </>
    )
}

export default UpdateNameForm;