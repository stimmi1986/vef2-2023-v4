import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { UpdateNameForm } from "../components/Form/UpdateNameForm";
import { UpdateDescriptionForm } from "../components/Form/UpdateDescriptionForm";
import { URL } from "./Departments";
import DeleteNameForm from "../components/Form/DeleteNameForm";

export function Department() {
  const [department, setDepartment] = useState({});
  const [state, setState] = useState("loading");
  
  const { slug } = useParams();
  
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
        <Link
          to={{
            pathname: `${slug}/courses`,
          }}
        >
          {department.title}
        </Link>
        <UpdateNameForm />
        <p>{department.description}</p>
        <UpdateDescriptionForm />
        <p>Viltu Eyða Deild?</p>
        <DeleteNameForm />
      </section>
    </>
  );
}

export default Department;
