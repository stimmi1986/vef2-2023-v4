import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { UpdateNameForm } from "../components/Form/UpdateNameForm";
import { UpdateDescriptionForm } from "../components/Form/UpdateDescriptionForm";
import { URL } from "../components/departments/Departments";

export function Department() {
  const { slug } = useParams();
  const [department, setDepartment] = useState({});
  const [state, setState] = useState("loading");

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`${URL}${slug}`);

        if (!response.ok) {
          throw new Error("not ok");
        }

        const json = await response.json();
        setDepartment(json);
        setState("data");
      } catch (e) {
        setState("error");
        console.log(e);
      }
    }

    fetchData();
  }, [slug]);

  if (state === "error") {
    return <p>Villa við að sækja deild.</p>;
  }

  if (state === "loading") {
    return <p>Loading...</p>;
  }

  return (
    <>
      <section>
        <h2>{department.title}</h2>
        <UpdateNameForm />
        <p>{department.description}</p>
        <UpdateDescriptionForm />
      </section>
    </>
  );
}

export default Department;
