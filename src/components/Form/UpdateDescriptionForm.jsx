import { useState } from "react";
import { useParams } from "react-router";
import { URL } from "../departments/Departments";

export function UpdateDescriptionForm() {
    const { slug } = useParams;
    const [state, setState] = useState('empty');
    const [errors, setErrors] = useState([]);
    const [description, setDescription] = useState('');

    async function updatedescription(description, ) {
        setState('loading')
        try {
            const body = {
                description: description
            }
            const response = await fetch(`${URL}${slug}`}, {
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

        updatedescription(description);
    }

    const onInputChange = (e) => {
        setDescription(e.target.value);
    }

    return (
        <>
            <h1>Lýsing á deild</h1>
            <form onSubmit={onSubmitHandler}>
                <div>
                    <label for="description">Lýsing</label>
                    <input id="description" type="text" value={description} onChange={onInputChange}/>
                </div>
                <button>Uppfærða lýsingu á deild?</button>
            </form>
            {state === "empty" && <p>Viltu uppfæra lýsingu á Deild?</p>}
            {state === "error" && <><p>villa við að uppfæra lýsingu á deild</p>
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
            {state === "Success" && <p>Uppfærði nlýsingu á deild</p>}
        </>
    )
}

export default UpdateDescriptionForm;