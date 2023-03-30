import { useState } from "react";
import { useParams } from "react-router";
import { URL } from "../../pages/Departments";

export function DeleteNameForm(callback) {
    const [state, setState] = useState('empty');
    const [errors, setErrors] = useState([]);
    const [deleteName, setDeleteName] = useState('');

    const {slug} = useParams();

    async function deleteNameDep(deleteName, ) {
        setState('loading')
        try {
            const response = await fetch(`${URL}${slug}`, {
                method: 'DELETE',
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

    const onClickHandler = (e) => {
        e.preventDefault();

        deleteNameDep(deleteName);
    }

    const onClickChange = (e) => {
        setDeleteName(e.target.value);
    }

    return (
        <>
            <h1>Eyða Deild?</h1>
            <form onClick={onClickHandler}>
                <div>
                    <label htmlFor="deleteName">Eyða Deild </label>
                    <button id="deleteName" type="text" value={deleteName} onClick={onClickChange}>Eyða</button>                    
                </div>
            </form>
            {state === "empty" && <p>Viltu eyða Deild?</p>}
            {state === "error" && <><p>villa við að eyða deild</p>
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
            {state === "Success" && <p>Búið að eyða deild</p>}
        </>
    )
}

export default DeleteNameForm;