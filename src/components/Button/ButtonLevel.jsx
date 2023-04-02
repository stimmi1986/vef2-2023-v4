import { useState } from "react";
import './Button.css'

export function ButtonLevel({
    callback,
    method,
    fetchUrl,
    buttonName,
    errorName,
    nameOfClass,
    selectName,
    selectOptions,
}) {
    const [state, setState] = useState("empty");
    const [errors, setErrors] = useState([]);
    const [selectedOption, setSelectedOption] = useState("");

    async function onSubmit(option) {
        setState("loading");
        try {
            const body = {
                semester: option,
            };
            //console.log("Option:", option);
            const response = await fetch(fetchUrl, {
                method: method,
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(body),
            });
            callback();
            if (!response.ok) {
                if (response.status >= 400 && response.status < 500) {
                    setErrors(["error"]);
                }
            } else {
                setState("Success");
            }
        } catch (e) {
            setState("error");
        }
    }

    const onSubmitHandler = (e) => {
        e.preventDefault();
        onSubmit(selectedOption);
    };

    const onInputChange = (e) => {
        setSelectedOption(e.target.value);
    };

    return (
        <>
            <form onSubmit={onSubmitHandler}>
                <select id={selectName} onChange={onInputChange} value={selectedOption}>
                    {selectOptions.map((option, index) => (
                        <option key={index} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
                <button id={nameOfClass}>{buttonName}</button>
            </form>
            {state === "error" && (
                <>
                    <p>{errorName}</p>
                    <p>Villur:</p>
                    <ul>
                        {errors.map((error, i) => {
                            return <li key={i}>{error.msg}</li>;
                        })}
                    </ul>
                </>
            )}
            {state === "loading" && <p>Loading...</p>}
        </>
    );
}

export default ButtonLevel;
